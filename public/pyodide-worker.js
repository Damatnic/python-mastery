/* eslint-disable */
// Pyodide Web Worker.
// Runs all Python execution in an isolated thread so the main UI never blocks
// on infinite loops or runaway code. On timeout, the main thread terminates
// this worker and spawns a fresh one.

const PYODIDE_CDN = "https://cdn.jsdelivr.net/pyodide/v0.27.0/full/";

importScripts(`${PYODIDE_CDN}pyodide.js`);

let pyodide = null;
let ready = false;

const STARTER_DATA_CODE = `import pandas as pd
import json
import io

students_csv = """name,grade,score,subject,age
Alice,A,95,Math,20
Bob,B,82,Science,21
Carol,A,91,Math,19
Dave,C,74,English,22
Eve,B,88,Science,20
Frank,A,96,Math,21
Grace,C,71,English,19
Hank,B,85,Science,22"""

students = pd.read_csv(io.StringIO(students_csv))

sales_csv = """product,category,price,quantity,date
Widget A,Electronics,29.99,150,2024-01-15
Widget B,Electronics,49.99,80,2024-01-16
Gadget X,Tools,12.50,200,2024-01-15
Gadget Y,Tools,19.99,120,2024-01-17
Item Alpha,Electronics,99.99,45,2024-01-18
Item Beta,Tools,7.50,300,2024-01-19"""

sales = pd.read_csv(io.StringIO(sales_csv))
`;

const DATAFRAME_REPR_SETUP = `
import pandas as pd
import numpy as np

def _custom_print(*args, **kwargs):
    from io import StringIO
    import sys
    for arg in args:
        if isinstance(arg, (pd.DataFrame, pd.Series)):
            html = arg.to_html(classes='df-table', border=0, max_rows=20, max_cols=15)
            print(f"<!--DATAFRAME_HTML-->{html}<!--/DATAFRAME_HTML-->")
        else:
            print(arg, **kwargs)

_original_repr = pd.DataFrame.__repr__
def _df_repr(self):
    html = self.to_html(classes='df-table', border=0, max_rows=20, max_cols=15)
    return f"<!--DATAFRAME_HTML-->{html}<!--/DATAFRAME_HTML-->"
`;

const LOCALS_EXTRACT_CODE = `
import json, math, re

def _clean_nan(obj):
    if isinstance(obj, float) and (math.isnan(obj) or math.isinf(obj)):
        return None
    if isinstance(obj, dict):
        return {k: _clean_nan(v) for k, v in obj.items()}
    if isinstance(obj, list):
        return [_clean_nan(v) for v in obj]
    return obj

_locals_dict = {}
for name, val in list(locals().items()):
    if not name.startswith('_'):
        try:
            if hasattr(val, 'to_dict'):
                import pandas as pd
                cleaned = val.where(pd.notnull(val), other=None) if hasattr(val, 'where') else val
                _locals_dict[name] = _clean_nan(cleaned.to_dict())
            elif isinstance(val, (int, float, str, bool, list, dict, type(None))):
                _locals_dict[name] = _clean_nan(val)
        except:
            pass
json_str = json.dumps(_locals_dict, default=str)
import re as _re
json_str = _re.sub(r'\\bNaN\\b', 'null', json_str)
json_str = _re.sub(r'\\b-?Infinity\\b', 'null', json_str)
json_str
`;

async function bootstrap() {
  try {
    pyodide = await loadPyodide({ indexURL: PYODIDE_CDN });
    await pyodide.loadPackage(["pandas", "numpy", "beautifulsoup4"]);
    await pyodide.runPythonAsync(STARTER_DATA_CODE);
    ready = true;
    self.postMessage({ type: "ready" });
  } catch (err) {
    self.postMessage({
      type: "init-error",
      error: err instanceof Error ? err.message : String(err),
    });
  }
}

bootstrap();

self.onmessage = async (event) => {
  const { type, id, code } = event.data || {};

  if (type !== "run") return;

  if (!ready || !pyodide) {
    self.postMessage({
      type: "result",
      id,
      output: "",
      error: "python runtime is not ready yet. wait for init to finish.",
      locals: {},
      executionTime: 0,
    });
    return;
  }

  let output = "";
  const startTime = performance.now();

  pyodide.setStdout({
    batched: (text) => {
      output += text + "\n";
    },
  });
  pyodide.setStderr({
    batched: (text) => {
      output += text + "\n";
    },
  });

  try {
    // Reset starter data and dataframe repr setup before each run
    await pyodide.runPythonAsync(STARTER_DATA_CODE);
    await pyodide.runPythonAsync(DATAFRAME_REPR_SETUP);

    // User code
    const result = await pyodide.runPythonAsync(code);

    if (result !== undefined && result !== null) {
      const checkResult = await pyodide.runPythonAsync(`
import pandas as pd
_last_result = _
if isinstance(_last_result, (pd.DataFrame, pd.Series)):
    _last_result.to_html(classes='df-table', border=0, max_rows=20, max_cols=15)
else:
    None
`);
      if (checkResult && typeof checkResult === "string") {
        output += `<!--DATAFRAME_HTML-->${checkResult}<!--/DATAFRAME_HTML-->\n`;
      }
    }

    const localsJson = await pyodide.runPythonAsync(LOCALS_EXTRACT_CODE);
    let locals = {};
    if (typeof localsJson === "string") {
      try {
        locals = JSON.parse(localsJson);
      } catch {
        locals = {};
      }
    }

    self.postMessage({
      type: "result",
      id,
      output: output.trim(),
      error: null,
      locals,
      executionTime: performance.now() - startTime,
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    const cleanError = message
      .split("\n")
      .filter(
        (line) =>
          !line.includes('File "<exec>"') && !line.includes("pyodide.asm.js"),
      )
      .join("\n")
      .trim();
    self.postMessage({
      type: "result",
      id,
      output: output.trim(),
      error: cleanError || message,
      locals: {},
      executionTime: performance.now() - startTime,
    });
  }
};
