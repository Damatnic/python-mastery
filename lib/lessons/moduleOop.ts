import type { Lesson } from "../types";

export const lessonsModuleOop: Lesson[] = [
  {
    module: "OOP & Tooling",
    moduleSlug: "oop-tooling",
    lessonNumber: 1,
    slug: "classes-objects",
    title: "Classes & Objects",
    badge: "concept",
    theory: `
A class is a blueprint. An object is one thing built from it. \`__init__\` runs
when you create the object and sets up its data; \`self\` is the object itself.

\`\`\`python
class Counter:
    def __init__(self):
        self.count = 0

    def increment(self):
        self.count += 1
\`\`\`

Methods are functions that live on the class and take \`self\` first. You call
them on an instance: \`c = Counter(); c.increment()\`.

\`__str__\` controls what \`print(obj)\` shows. Without it you get the ugly
default \`<__main__.Counter object at 0x...>\`.

\`\`\`python
class Rectangle:
    def __init__(self, w, h):
        self.w = w
        self.h = h

    def area(self):
        return self.w * self.h

    def __str__(self):
        return f"Rectangle {self.w}x{self.h}"
\`\`\`

The mental model: data lives on \`self\`, behavior lives in methods, and each
object carries its own copy of the data.
`,
    starterCode: `# Build a class, make an instance, call a method
class Counter:
    def __init__(self):
        self.count = 0

    def increment(self):
        self.count += 1

    def value(self):
        return self.count


c = Counter()
c.increment()
print(f"count={c.value()}")
`,
    examples: [
      {
        title: "a class with state and behavior",
        explanation: "__init__ sets up data, methods change or read it",
        code: `class Counter:
    def __init__(self):
        self.count = 0

    def increment(self):
        self.count += 1

    def value(self):
        return self.count


c = Counter()
c.increment()
c.increment()
c.increment()
print(c.value())`,
      },
      {
        title: "__str__ makes print() readable",
        explanation: "Define __str__ so the object prints as something useful",
        code: `class Rectangle:
    def __init__(self, w, h):
        self.w = w
        self.h = h

    def area(self):
        return self.w * self.h

    def __str__(self):
        return f"Rectangle {self.w}x{self.h}"


r = Rectangle(3, 4)
print(r)
print(r.area())`,
      },
    ],
    challenges: [
      {
        id: "oop1c1",
        prompt:
          "Define a class Counter with __init__ setting self.count = 0, an increment() method that adds 1, and a value() method that returns the count. Create one, increment it twice, and print it as count=<value>.",
        hint: "print(f\"count={c.value()}\") after two increment() calls",
        validateFn: `return output.includes("count=2")`,
        solution: `class Counter:
    def __init__(self):
        self.count = 0

    def increment(self):
        self.count += 1

    def value(self):
        return self.count


c = Counter()
c.increment()
c.increment()
print(f"count={c.value()}")`,
      },
      {
        id: "oop1c2",
        prompt:
          "Define a class Rectangle with __init__(self, w, h), an area() method, and a __str__ that returns 'Rectangle WxH'. Build Rectangle(3, 4), print the object, then print its area.",
        hint: "__str__ must return f\"Rectangle {self.w}x{self.h}\"; area is w*h",
        validateFn: `return output.includes("Rectangle 3x4") && output.includes("12")`,
        solution: `class Rectangle:
    def __init__(self, w, h):
        self.w = w
        self.h = h

    def area(self):
        return self.w * self.h

    def __str__(self):
        return f"Rectangle {self.w}x{self.h}"


r = Rectangle(3, 4)
print(r)
print(r.area())`,
      },
    ],
  },
  {
    module: "OOP & Tooling",
    moduleSlug: "oop-tooling",
    lessonNumber: 2,
    slug: "type-hints-dataclasses",
    title: "Type Hints & Dataclasses",
    badge: "concept",
    theory: `
Type hints document what goes in and what comes out. Python does not enforce
them at runtime, but they make code readable and let editors catch mistakes.

\`\`\`python
def add(a: int, b: int) -> int:
    return a + b
\`\`\`

\`@dataclass\` writes the boilerplate for you. You declare the fields with
types and it generates \`__init__\`, \`__repr__\`, and \`__eq__\`.

\`\`\`python
from dataclasses import dataclass

@dataclass
class Point:
    x: int
    y: int
\`\`\`

\`Point(1, 2)\` now prints as \`Point(x=1, y=2)\` and two points with the same
values compare equal. No hand-written \`__init__\` needed.
`,
    starterCode: `from dataclasses import dataclass


@dataclass
class Point:
    x: int
    y: int


p = Point(1, 2)
print(p)
`,
    examples: [
      {
        title: "typed function",
        explanation: "Hints describe the inputs and the return value",
        code: `def total_price(qty: int, unit: float) -> float:
    return qty * unit


print(total_price(3, 9.99))`,
      },
      {
        title: "dataclass gives you __repr__ and __eq__ free",
        explanation: "Declare fields with types; the boilerplate is generated",
        code: `from dataclasses import dataclass


@dataclass
class Point:
    x: int
    y: int


a = Point(1, 2)
b = Point(1, 2)
print(a)
print(a == b)`,
      },
    ],
    challenges: [
      {
        id: "oop2c1",
        prompt:
          "Write a function add(a: int, b: int) -> int that returns the sum, then print the result of add(2, 3) in the form sum=<value>.",
        hint: "print(f\"sum={add(2, 3)}\")",
        validateFn: `return output.includes("sum=5")`,
        solution: `def add(a: int, b: int) -> int:
    return a + b


print(f"sum={add(2, 3)}")`,
      },
      {
        id: "oop2c2",
        prompt:
          "Use @dataclass to define a class Point with fields x: int and y: int. Create Point(1, 2) and print it. The dataclass repr should show Point(x=1, y=2).",
        hint: "from dataclasses import dataclass, then @dataclass above the class",
        validateFn: `return output.includes("Point(x=1, y=2)")`,
        solution: `from dataclasses import dataclass


@dataclass
class Point:
    x: int
    y: int


print(Point(1, 2))`,
      },
    ],
  },
  {
    module: "OOP & Tooling",
    moduleSlug: "oop-tooling",
    lessonNumber: 3,
    slug: "testing-your-code",
    title: "Testing Your Code",
    badge: "concept",
    theory: `
A test is just code that checks other code. The simplest test is \`assert\`:
if the condition is false it raises, if it's true nothing happens.

\`\`\`python
def double(n):
    return n * 2

assert double(4) == 8
assert double(0) == 0
print("tests passed")
\`\`\`

For anything real, the standard library has \`unittest\`. You write a class
that subclasses \`TestCase\` and use \`assertEqual\` and friends.

\`\`\`python
import unittest, io

class TestText(unittest.TestCase):
    def test_upper(self):
        self.assertEqual("abc".upper(), "ABC")

suite = unittest.TestLoader().loadTestsFromTestCase(TestText)
result = unittest.TextTestRunner(stream=io.StringIO()).run(suite)
print("passed" if result.wasSuccessful() else "failed")
\`\`\`

The point of tests: change code with confidence. If a test goes red you
broke something, and you find out now instead of in production.
`,
    starterCode: `def double(n):
    return n * 2


assert double(4) == 8
assert double(0) == 0
print("tests passed")
`,
    examples: [
      {
        title: "assert-based checks",
        explanation: "Cheap, immediate, good for quick sanity checks",
        code: `def clean(s):
    return s.strip().lower()


assert clean("  Hi ") == "hi"
assert clean("ABC") == "abc"
print("tests passed")`,
      },
      {
        title: "unittest with a captured runner",
        explanation: "Run the suite and report success without noisy output",
        code: `import unittest, io


class TestMath(unittest.TestCase):
    def test_add(self):
        self.assertEqual(2 + 2, 4)

    def test_type(self):
        self.assertIsInstance(3, int)


suite = unittest.TestLoader().loadTestsFromTestCase(TestMath)
result = unittest.TextTestRunner(stream=io.StringIO()).run(suite)
print("passed" if result.wasSuccessful() else "failed")`,
      },
    ],
    challenges: [
      {
        id: "oop3c1",
        prompt:
          "Write a function double(n) that returns n*2. Assert that double(4) == 8 and double(0) == 0, then print 'tests passed'.",
        hint: "assert raises on failure; if both pass, the print runs",
        validateFn: `return output.includes("tests passed")`,
        solution: `def double(n):
    return n * 2


assert double(4) == 8
assert double(0) == 0
print("tests passed")`,
      },
      {
        id: "oop3c2",
        prompt:
          "Write a unittest TestCase with one test asserting 'abc'.upper() == 'ABC'. Run it with a TextTestRunner whose stream is an io.StringIO(), then print 'passed' if the result was successful.",
        hint: "result = unittest.TextTestRunner(stream=io.StringIO()).run(suite); check result.wasSuccessful()",
        validateFn: `return output.includes("passed")`,
        solution: `import unittest, io


class TestText(unittest.TestCase):
    def test_upper(self):
        self.assertEqual("abc".upper(), "ABC")


suite = unittest.TestLoader().loadTestsFromTestCase(TestText)
result = unittest.TextTestRunner(stream=io.StringIO()).run(suite)
print("passed" if result.wasSuccessful() else "failed")`,
      },
    ],
  },
  {
    module: "OOP & Tooling",
    moduleSlug: "oop-tooling",
    lessonNumber: 4,
    slug: "logging-debugging",
    title: "Logging & Debugging",
    badge: "concept",
    theory: `
\`print\` debugging works until it doesn't. \`logging\` gives you levels
(DEBUG, INFO, WARNING, ERROR) and you can send the output anywhere.

\`\`\`python
import logging, io

buf = io.StringIO()
handler = logging.StreamHandler(buf)
logger = logging.getLogger("demo")
logger.setLevel(logging.INFO)
logger.addHandler(handler)

logger.info("app started")
print(buf.getvalue().strip())
\`\`\`

For debugging an exception, do not let it crash silently. Catch the specific
error and handle it:

\`\`\`python
try:
    x = 1 / 0
except ZeroDivisionError:
    print("caught: division by zero")
\`\`\`

Reading a traceback: start at the bottom. The last line is the error type
and message. The lines above it are the call stack, newest last.
`,
    starterCode: `import logging, io

buf = io.StringIO()
handler = logging.StreamHandler(buf)
logger = logging.getLogger("demo")
logger.setLevel(logging.INFO)
logger.addHandler(handler)

logger.info("app started")
print(buf.getvalue().strip())
`,
    examples: [
      {
        title: "logging to a buffer you can inspect",
        explanation: "Attach a StreamHandler over StringIO and read it back",
        code: `import logging, io

buf = io.StringIO()
logger = logging.getLogger("svc")
logger.setLevel(logging.WARNING)
logger.addHandler(logging.StreamHandler(buf))

logger.info("this is below WARNING, skipped")
logger.warning("disk almost full")
print(buf.getvalue().strip())`,
      },
      {
        title: "catch the specific exception",
        explanation: "Handle the error you expect, let the rest surface",
        code: `def safe_div(a, b):
    try:
        return a / b
    except ZeroDivisionError:
        return None


print(safe_div(10, 2))
print(safe_div(10, 0))`,
      },
    ],
    challenges: [
      {
        id: "oop4c1",
        prompt:
          "Create a logger named 'demo' at INFO level with a StreamHandler writing to an io.StringIO buffer. Log the info message 'app started', then print the buffer's contents stripped.",
        hint: "logger.addHandler(logging.StreamHandler(buf)); logger.info(...); print(buf.getvalue().strip())",
        validateFn: `return output.includes("app started")`,
        solution: `import logging, io

buf = io.StringIO()
logger = logging.getLogger("demo")
logger.setLevel(logging.INFO)
logger.addHandler(logging.StreamHandler(buf))

logger.info("app started")
print(buf.getvalue().strip())`,
      },
      {
        id: "oop4c2",
        prompt:
          "Wrap code that computes 1 / 0 in a try/except that catches ZeroDivisionError and prints exactly: caught: division by zero",
        hint: "except ZeroDivisionError: print(\"caught: division by zero\")",
        validateFn: `return output.includes("caught: division by zero")`,
        solution: `try:
    x = 1 / 0
except ZeroDivisionError:
    print("caught: division by zero")`,
      },
    ],
  },
];
