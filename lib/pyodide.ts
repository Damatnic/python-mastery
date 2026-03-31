"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { STARTER_DATA_CODE } from "./types";

declare global {
  interface Window {
    loadPyodide: (config: { indexURL: string }) => Promise<PyodideInterface>;
  }
}

interface PyodideInterface {
  runPythonAsync: (code: string) => Promise<unknown>;
  globals: {
    get: (name: string) => unknown;
    toJs: () => Map<string, unknown>;
  };
  loadPackage: (packages: string | string[]) => Promise<void>;
  setStdout: (options: { batched: (text: string) => void }) => void;
  setStderr: (options: { batched: (text: string) => void }) => void;
}

interface PyodideResult {
  output: string;
  error: string | null;
  locals: Record<string, unknown>;
  executionTime: number;
}

interface UsePyodideReturn {
  isLoading: boolean;
  isReady: boolean;
  error: string | null;
  runCode: (code: string) => Promise<PyodideResult>;
}

const PYODIDE_CDN = "https://cdn.jsdelivr.net/pyodide/v0.27.0/full/";

export function usePyodide(): UsePyodideReturn {
  const [isLoading, setIsLoading] = useState(true);
  const [isReady, setIsReady] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const pyodideRef = useRef<PyodideInterface | null>(null);
  const initPromiseRef = useRef<Promise<void> | null>(null);

  useEffect(() => {
    if (initPromiseRef.current) return;

    initPromiseRef.current = (async () => {
      try {
        // Load Pyodide script if not already loaded
        if (!window.loadPyodide) {
          await new Promise<void>((resolve, reject) => {
            const script = document.createElement("script");
            script.src = `${PYODIDE_CDN}pyodide.js`;
            script.onload = () => resolve();
            script.onerror = () => reject(new Error("Failed to load Pyodide"));
            document.head.appendChild(script);
          });
        }

        // Initialize Pyodide
        const pyodide = await window.loadPyodide({
          indexURL: PYODIDE_CDN,
        });

        // Load pandas and numpy
        await pyodide.loadPackage(["pandas", "numpy"]);

        // Run starter data setup
        await pyodide.runPythonAsync(STARTER_DATA_CODE);

        pyodideRef.current = pyodide;
        setIsReady(true);
        setIsLoading(false);
      } catch (err) {
        const message = err instanceof Error ? err.message : "Unknown error";
        setError(message);
        setIsLoading(false);
      }
    })();
  }, []);

  const runCode = useCallback(async (code: string): Promise<PyodideResult> => {
    if (!pyodideRef.current) {
      return {
        output: "",
        error: "Python is not ready yet",
        locals: {},
        executionTime: 0,
      };
    }

    const pyodide = pyodideRef.current;
    let output = "";
    let errorOutput: string | null = null;
    const startTime = performance.now();

    // Capture stdout
    pyodide.setStdout({
      batched: (text: string) => {
        output += text + "\n";
      },
    });

    // Capture stderr
    pyodide.setStderr({
      batched: (text: string) => {
        output += text + "\n";
      },
    });

    try {
      // Reset starter data before each run
      await pyodide.runPythonAsync(STARTER_DATA_CODE);

      // Install custom display function for DataFrames
      await pyodide.runPythonAsync(`
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

# Override display behavior for DataFrames
_original_repr = pd.DataFrame.__repr__
def _df_repr(self):
    html = self.to_html(classes='df-table', border=0, max_rows=20, max_cols=15)
    return f"<!--DATAFRAME_HTML-->{html}<!--/DATAFRAME_HTML-->"
`);

      // Run user code
      const result = await pyodide.runPythonAsync(code);

      // If the result is a DataFrame or Series, add its HTML representation
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

      // Get locals for validation
      const localsCode = `
import json
_locals_dict = {}
for name, val in list(locals().items()):
    if not name.startswith('_'):
        try:
            if hasattr(val, 'to_dict'):
                _locals_dict[name] = val.to_dict()
            elif isinstance(val, (int, float, str, bool, list, dict, type(None))):
                _locals_dict[name] = val
        except:
            pass
json.dumps(_locals_dict)
`;
      const localsJson = await pyodide.runPythonAsync(localsCode);
      const locals =
        typeof localsJson === "string" ? JSON.parse(localsJson) : {};

      const executionTime = performance.now() - startTime;

      return {
        output: output.trim(),
        error: null,
        locals,
        executionTime,
      };
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);
      // Clean up Python traceback for readability
      const cleanError = message
        .split("\n")
        .filter(
          (line) =>
            !line.includes("File \"<exec>\"") &&
            !line.includes("pyodide.asm.js")
        )
        .join("\n")
        .trim();

      errorOutput = cleanError || message;

      const executionTime = performance.now() - startTime;

      return {
        output: output.trim(),
        error: errorOutput,
        locals: {},
        executionTime,
      };
    }
  }, []);

  return { isLoading, isReady, error, runCode };
}
