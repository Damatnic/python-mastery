import type { Project } from "../types";

// A deliberately pure-Python project: no pandas, no numpy. The learner works a
// raw log string with strings, dicts, comprehensions, functions, and Counter,
// which is the foundation everything else in the course sits on.
const SERVER_LOG = `2026-05-01 08:14:02 INFO request id=1001 path=/home status=200
2026-05-01 08:14:05 INFO request id=1002 path=/login status=200
2026-05-01 08:14:09 WARNING slow query id=1002 took=1.8s
2026-05-01 08:15:01 INFO request id=1003 path=/api/data status=200
2026-05-01 08:15:44 ERROR unhandled id=1004 path=/api/data status=500
2026-05-01 08:16:10 INFO request id=1005 path=/home status=200
2026-05-01 08:16:33 WARNING slow query id=1005 took=2.1s
2026-05-01 08:17:02 ERROR timeout id=1006 path=/api/export status=504
2026-05-01 08:17:40 INFO request id=1007 path=/login status=200
2026-05-01 08:18:12 ERROR unhandled id=1008 path=/api/data status=500
2026-05-01 08:18:55 INFO request id=1009 path=/home status=200
2026-05-01 08:19:20 WARNING deprecated endpoint id=1009 path=/v1/old
2026-05-01 08:19:48 INFO request id=1010 path=/api/data status=200
2026-05-01 08:20:31 ERROR db connection id=1011 path=/api/data status=500
2026-05-01 08:21:05 INFO request id=1012 path=/home status=200`;

export const logAnalyzerProject: Project = {
  slug: "log-analyzer",
  title: "Server Log Analyzer",
  description:
    "Turn a raw server log into a readable health report using nothing but core Python: string parsing, dictionaries, comprehensions, functions, and Counter. No pandas, no shortcuts, the fundamentals that hold the rest of your code up.",
  difficulty: "beginner-intermediate",
  estimatedTime: "25 min",
  dataset: SERVER_LOG,
  datasetName: "Web Server Log",
  datasetDescription:
    "15 lines from a web server log. Each line has a timestamp, a level (INFO, WARNING, ERROR), and a message with key=value fields.",
  steps: [
    {
      id: "log-step-1",
      title: "Split the Log Into Lines",
      description: `A log arrives as one big block of text. The first job is always to break it into individual records you can work with.

**Your goals:**
1. Split the log text into a list of lines
2. Print how many lines there are
3. Print the very first line so you can see the shape of a record`,
      starterCode: `log = """2026-05-01 08:14:02 INFO request id=1001 path=/home status=200
2026-05-01 08:14:05 INFO request id=1002 path=/login status=200
2026-05-01 08:14:09 WARNING slow query id=1002 took=1.8s
2026-05-01 08:15:44 ERROR unhandled id=1004 path=/api/data status=500"""

# splitlines() breaks the text on every newline into a list
lines = log.splitlines()

print(f"lines: {len(lines)}")
print(f"first: {lines[0]}")
`,
      hints: [
        "str.splitlines() returns a list, one item per line",
        "len(lines) counts them; lines[0] is the first",
      ],
      validateFn: `return output.includes("lines:") && output.includes("first:") && output.includes("INFO")`,
    },
    {
      id: "log-step-2",
      title: "Pull the Level Off Each Line",
      description: `Every line follows the same layout: a date, a time, then the level (INFO, WARNING, or ERROR), then the message. The level is the third whitespace-separated piece.

**Your goals:**
1. For each line, split on whitespace and grab the level (index 2)
2. Collect the levels into a list with a comprehension
3. Print the list of levels`,
      starterCode: `log = """2026-05-01 08:14:02 INFO request id=1001 path=/home status=200
2026-05-01 08:14:09 WARNING slow query id=1002 took=1.8s
2026-05-01 08:15:44 ERROR unhandled id=1004 path=/api/data status=500
2026-05-01 08:16:10 INFO request id=1005 path=/home status=200"""

lines = log.splitlines()

# line.split() splits on whitespace; index 2 is the level
levels = [line.split()[2] for line in lines]

print(levels)
`,
      hints: [
        "'2026-05-01 08:14:02 INFO ...'.split() -> ['2026-05-01', '08:14:02', 'INFO', ...]",
        "So line.split()[2] is the level",
      ],
      validateFn: `return output.includes("INFO") && output.includes("WARNING") && output.includes("ERROR")`,
    },
    {
      id: "log-step-3",
      title: "Count the Levels",
      description: `Now that you can extract levels, count how many of each there are. \`collections.Counter\` does the tallying in one line.

**Your goals:**
1. Build the list of levels (same as the last step)
2. Pass it to Counter
3. Print the counts as a normal dict`,
      starterCode: `from collections import Counter

log = """2026-05-01 08:14:02 INFO a
2026-05-01 08:14:09 WARNING b
2026-05-01 08:15:44 ERROR c
2026-05-01 08:16:10 INFO d
2026-05-01 08:16:33 WARNING e
2026-05-01 08:17:02 ERROR f
2026-05-01 08:18:55 INFO g"""

lines = log.splitlines()
levels = [line.split()[2] for line in lines]

counts = Counter(levels)
print(dict(counts))
`,
      hints: [
        "Counter(levels) tallies each distinct value",
        "dict(counts) prints it as a plain dictionary",
      ],
      validateFn: `return output.includes("INFO") && output.includes("WARNING") && output.includes("ERROR") && output.includes("3")`,
    },
    {
      id: "log-step-4",
      title: "Find Every Error",
      description: `When something goes wrong, you want the error lines and nothing else. Filter the log down to just the ERROR records.

**Your goals:**
1. Keep only lines whose level is 'ERROR'
2. Print how many errors there are
3. Print each error line`,
      starterCode: `log = """2026-05-01 08:14:02 INFO request id=1001 status=200
2026-05-01 08:15:44 ERROR unhandled id=1004 status=500
2026-05-01 08:17:02 ERROR timeout id=1006 status=504
2026-05-01 08:18:55 INFO request id=1009 status=200
2026-05-01 08:20:31 ERROR db connection id=1011 status=500"""

lines = log.splitlines()

# keep a line only when its level (index 2) is ERROR
errors = [line for line in lines if line.split()[2] == "ERROR"]

print(f"errors: {len(errors)}")
for line in errors:
    print(line)
`,
      hints: [
        "A list comprehension with an if filter: [line for line in lines if ...]",
        "The condition is line.split()[2] == 'ERROR'",
      ],
      validateFn: `return output.includes("errors: 3") && output.includes("timeout") && output.includes("db connection")`,
    },
    {
      id: "log-step-5",
      title: "Write the Health Report",
      description: `Pull it together into a function that takes the log and prints a summary: total requests, error count, error rate as a percentage, and the busiest level.

**Your goals:**
1. Write a function report(log) that does the analysis
2. Compute total lines, error count, and error rate (errors / total * 100)
3. Print the report, including the most common level`,
      starterCode: `from collections import Counter

log = """2026-05-01 08:14:02 INFO a
2026-05-01 08:14:09 WARNING b
2026-05-01 08:15:44 ERROR c
2026-05-01 08:16:10 INFO d
2026-05-01 08:17:02 ERROR e
2026-05-01 08:18:55 INFO f
2026-05-01 08:19:48 INFO g
2026-05-01 08:20:31 ERROR h"""


def report(text):
    lines = text.splitlines()
    levels = [line.split()[2] for line in lines]
    counts = Counter(levels)
    total = len(lines)
    errors = counts.get("ERROR", 0)
    rate = errors / total * 100
    busiest = counts.most_common(1)[0][0]
    print(f"total: {total}")
    print(f"errors: {errors}")
    print(f"error rate: {rate:.1f}%")
    print(f"busiest level: {busiest}")


report(log)
`,
      hints: [
        "counts.get('ERROR', 0) is safe even if there are no errors",
        "most_common(1) returns [(level, count)]; grab [0][0] for the level",
        "Format the rate with an f-string: f'{rate:.1f}%'",
      ],
      validateFn: `return output.includes("total: 8") && output.includes("errors: 3") && output.includes("error rate:") && output.includes("busiest level: INFO")`,
    },
  ],
};
