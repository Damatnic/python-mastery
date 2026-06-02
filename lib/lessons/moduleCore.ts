import type { Lesson } from "../types";

export const lessonsModuleCore: Lesson[] = [
  {
    module: "Core Python Deep Dive",
    moduleSlug: "core-python",
    lessonNumber: 1,
    slug: "comprehensions-generators",
    title: "Comprehensions & Generators",
    badge: "concept",
    theory: `
You already saw list comprehensions. They also come in dict and set form, and
they all read the same way: what you want, then where it comes from, then the
filter.

\`\`\`python
squares = [n * n for n in range(5)]           # list  -> [0, 1, 4, 9, 16]
lengths = {w: len(w) for w in ["hi", "yes"]}  # dict  -> {"hi": 2, "yes": 3}
firsts  = {w[0] for w in ["apple", "ant"]}    # set   -> {"a"}
\`\`\`

A generator looks almost the same but uses parentheses, and it does not build
the whole list. It hands you one item at a time, only when you ask.

\`\`\`python
gen = (n * n for n in range(1_000_000))
print(next(gen))  # 0
print(next(gen))  # 1
\`\`\`

That list comprehension would build a million numbers in memory. The generator
holds one. For a sum or a loop where you never need them all at once, that is
the difference between a program that runs and one that eats your RAM.

💡 Key: \`yield\` turns a function into a generator. Each \`yield\` pauses the
function and returns a value; the next call picks up right where it left off.

\`\`\`python
def countdown(n):
    while n > 0:
        yield n
        n -= 1

print(list(countdown(3)))  # [3, 2, 1]
\`\`\`

✨ Tip: reach for a generator when the data is large, streamed, or infinite, and
a list when you need to index, re-read, or know the length up front.
`,
    starterCode: `# A generator function yields values one at a time
def countdown(n):
    while n > 0:
        yield n
        n -= 1


print(list(countdown(3)))
`,
    examples: [
      {
        title: "the three comprehension shapes",
        explanation: "Same idea, different container: list, set, dict",
        code: `nums = [1, 2, 2, 3, 3, 3]

doubled = [n * 2 for n in nums]
unique = {n for n in nums}
counts = {n: nums.count(n) for n in set(nums)}

print(doubled)
print(sorted(unique))
print(counts)`,
      },
      {
        title: "a generator stays lazy",
        explanation: "Nothing runs until you pull values out of it",
        code: `def first_n_squares(n):
    for i in range(n):
        print(f"computing {i}")
        yield i * i


gen = first_n_squares(3)
print("generator made, nothing computed yet")
print(list(gen))`,
      },
    ],
    challenges: [
      {
        id: "core1c1",
        prompt:
          "Use a single list comprehension to build the squares of the even numbers from 0 to 9 (inclusive of the filter on evens). Print the list. It should be [0, 4, 16, 36, 64].",
        hint: "[n*n for n in range(10) if n % 2 == 0]",
        validateFn: `return output.includes("[0, 4, 16, 36, 64]")`,
        solution: `squares = [n * n for n in range(10) if n % 2 == 0]
print(squares)`,
      },
      {
        id: "core1c2",
        prompt:
          "Write a generator function take_while_positive(nums) that yields numbers from the list until it hits a non-positive number, then stops. Print list(take_while_positive([3, 1, 2, -5, 9])). It should be [3, 1, 2].",
        hint: "loop the list, if n <= 0 return (or break), else yield n",
        validateFn: `return output.includes("[3, 1, 2]")`,
        solution: `def take_while_positive(nums):
    for n in nums:
        if n <= 0:
            return
        yield n


print(list(take_while_positive([3, 1, 2, -5, 9])))`,
      },
    ],
  },
  {
    module: "Core Python Deep Dive",
    moduleSlug: "core-python",
    lessonNumber: 2,
    slug: "iterators-itertools",
    title: "Iterators & itertools",
    badge: "concept",
    theory: `
Every \`for\` loop in Python runs on the same protocol. \`iter(obj)\` asks an
object for an iterator, and \`next(iterator)\` pulls the next value until it
raises \`StopIteration\`. A list, a string, a file, a dict are all iterable.

\`\`\`python
it = iter([10, 20])
print(next(it))  # 10
print(next(it))  # 20
# next(it) here would raise StopIteration
\`\`\`

You can make your own iterable by defining \`__iter__\`. The cleanest way is to
\`yield\` from it, which reuses the generator machinery you just learned.

\`\`\`python
class Squares:
    def __init__(self, n):
        self.n = n

    def __iter__(self):
        for i in range(1, self.n + 1):
            yield i * i

print(list(Squares(3)))  # [1, 4, 9]
\`\`\`

📝 Note: the standard library \`itertools\` has the tools you keep reaching for.
\`chain\` glues iterables together, \`islice\` takes a slice without building a
list, \`count\` is an endless counter, and \`groupby\` groups adjacent items.

\`\`\`python
import itertools

print(list(itertools.chain([1, 2], [3, 4])))        # [1, 2, 3, 4]
print(list(itertools.islice(itertools.count(10, 5), 3)))  # [10, 15, 20]
\`\`\`
`,
    starterCode: `import itertools

# chain glues iterables end to end
combined = itertools.chain([1, 2], [3, 4])
print(list(combined))
`,
    examples: [
      {
        title: "an iterable class built with yield",
        explanation: "__iter__ that yields makes the object usable in a for loop",
        code: `class Countdown:
    def __init__(self, start):
        self.start = start

    def __iter__(self):
        n = self.start
        while n > 0:
            yield n
            n -= 1


for x in Countdown(4):
    print(x)`,
      },
      {
        title: "islice takes from an endless counter",
        explanation: "count never ends, islice stops it after 3 values",
        code: `import itertools

evens = itertools.count(0, 2)
print(list(itertools.islice(evens, 3)))`,
      },
    ],
    challenges: [
      {
        id: "core2c1",
        prompt:
          "Use itertools.chain to join [1, 2, 3] and [4, 5] into one sequence, then print the result as a list. It should be [1, 2, 3, 4, 5].",
        hint: "list(itertools.chain(a, b))",
        validateFn: `return output.includes("[1, 2, 3, 4, 5]")`,
        solution: `import itertools

print(list(itertools.chain([1, 2, 3], [4, 5])))`,
      },
      {
        id: "core2c2",
        prompt:
          "Define a class Squares with __init__(self, n) and an __iter__ that yields the squares 1, 4, 9, ... up to n terms. Print list(Squares(4)). It should be [1, 4, 9, 16].",
        hint: "in __iter__, loop i from 1 to n and yield i*i",
        validateFn: `return output.includes("[1, 4, 9, 16]")`,
        solution: `class Squares:
    def __init__(self, n):
        self.n = n

    def __iter__(self):
        for i in range(1, self.n + 1):
            yield i * i


print(list(Squares(4)))`,
      },
    ],
  },
  {
    module: "Core Python Deep Dive",
    moduleSlug: "core-python",
    lessonNumber: 3,
    slug: "decorators",
    title: "Decorators",
    badge: "concept",
    theory: `
Functions are objects. You can pass them around, return them, and store them in
variables. A decorator uses that: it takes a function, wraps it in another
function, and gives you the wrapper back.

\`\`\`python
def shout(func):
    def wrapper(*args, **kwargs):
        result = func(*args, **kwargs)
        return result.upper()
    return wrapper

@shout
def greet(name):
    return f"hi {name}"

print(greet("sam"))  # HI SAM
\`\`\`

The \`@shout\` line is shorthand for \`greet = shout(greet)\`. The wrapper runs
your function, then does something extra around it. \`*args, **kwargs\` lets the
wrapper accept any arguments and forward them along.

⚠️ Warning: a plain wrapper hides the original function's name and docstring.
\`functools.wraps\` copies them over so debugging and \`help()\` still work.

\`\`\`python
import functools

def logged(func):
    @functools.wraps(func)
    def wrapper(*args, **kwargs):
        print(f"calling {func.__name__}")
        return func(*args, **kwargs)
    return wrapper
\`\`\`

This is exactly how \`@app.route\`, \`@property\`, and \`@pytest.fixture\` work.
Once you can read a decorator, a lot of framework code stops being magic.
`,
    starterCode: `def shout(func):
    def wrapper(*args, **kwargs):
        return func(*args, **kwargs).upper()
    return wrapper


@shout
def greet(name):
    return f"hi {name}"


print(greet("sam"))
`,
    examples: [
      {
        title: "a decorator that times the call",
        explanation: "Wrap the function, measure around it, return the value",
        code: `import time


def timed(func):
    def wrapper(*args, **kwargs):
        start = time.perf_counter()
        result = func(*args, **kwargs)
        elapsed = time.perf_counter() - start
        print(f"{func.__name__} ran in {elapsed:.6f}s")
        return result
    return wrapper


@timed
def add(a, b):
    return a + b


print(add(2, 3))`,
      },
      {
        title: "wraps keeps the function's identity",
        explanation: "Without @functools.wraps, __name__ would say 'wrapper'",
        code: `import functools


def logged(func):
    @functools.wraps(func)
    def wrapper(*args, **kwargs):
        return func(*args, **kwargs)
    return wrapper


@logged
def square(n):
    return n * n


print(square.__name__)`,
      },
    ],
    challenges: [
      {
        id: "core3c1",
        prompt:
          "Write a decorator double_result that returns twice whatever the wrapped function returns. Decorate a function add(a, b) that returns a + b. Print double_result-wrapped add(2, 3). It should print 10.",
        hint: "wrapper returns func(*args, **kwargs) * 2",
        validateFn: `return output.trim().split(/\\s+/).includes("10")`,
        solution: `def double_result(func):
    def wrapper(*args, **kwargs):
        return func(*args, **kwargs) * 2
    return wrapper


@double_result
def add(a, b):
    return a + b


print(add(2, 3))`,
      },
      {
        id: "core3c2",
        prompt:
          "Write a decorator announce that prints 'calling <name>' (using the function's __name__) before running it. Decorate a function ping() that returns 'pong'. Call ping() and print its return value. Output should contain 'calling ping' and 'pong'.",
        hint: "print(f\"calling {func.__name__}\") inside the wrapper, before calling func",
        validateFn: `return output.includes("calling ping") && output.includes("pong")`,
        solution: `import functools


def announce(func):
    @functools.wraps(func)
    def wrapper(*args, **kwargs):
        print(f"calling {func.__name__}")
        return func(*args, **kwargs)
    return wrapper


@announce
def ping():
    return "pong"


print(ping())`,
      },
    ],
  },
  {
    module: "Core Python Deep Dive",
    moduleSlug: "core-python",
    lessonNumber: 4,
    slug: "context-managers",
    title: "Context Managers & with",
    badge: "concept",
    theory: `
\`with open(...) as f\` closes the file for you, even if the code inside blows
up. That guarantee is what a context manager gives you: setup on the way in,
cleanup on the way out, no matter what happens between.

You can write your own with \`__enter__\` and \`__exit__\`.

\`\`\`python
class Tag:
    def __init__(self, name):
        self.name = name

    def __enter__(self):
        print(f"<{self.name}>")
        return self

    def __exit__(self, exc_type, exc, tb):
        print(f"</{self.name}>")


with Tag("p"):
    print("hello")
\`\`\`

\`__exit__\` runs whether the block finished cleanly or raised. The three
arguments describe any exception that occurred; return \`False\` (or nothing) to
let it propagate.

💡 Key: for the common case, \`contextlib.contextmanager\` lets you write one
with a generator. Everything before \`yield\` is setup, everything after is
cleanup.

\`\`\`python
from contextlib import contextmanager

@contextmanager
def managed():
    print("open")
    try:
        yield "resource"
    finally:
        print("close")

with managed() as r:
    print(f"using {r}")
\`\`\`

The \`finally\` is what makes cleanup reliable. Even if the body raises, "close"
still prints.
`,
    starterCode: `class Tag:
    def __init__(self, name):
        self.name = name

    def __enter__(self):
        print(f"<{self.name}>")
        return self

    def __exit__(self, exc_type, exc, tb):
        print(f"</{self.name}>")


with Tag("p"):
    print("hello")
`,
    examples: [
      {
        title: "cleanup runs even when the body raises",
        explanation: "The exception still propagates, but close() always runs",
        code: `from contextlib import contextmanager


@contextmanager
def session():
    print("open")
    try:
        yield
    finally:
        print("close")


try:
    with session():
        print("working")
        raise ValueError("boom")
except ValueError:
    print("caught outside")`,
      },
      {
        title: "a class-based context manager",
        explanation: "__enter__ returns the value bound by 'as', __exit__ cleans up",
        code: `class Timer:
    def __enter__(self):
        print("start")
        return self

    def __exit__(self, exc_type, exc, tb):
        print("stop")


with Timer():
    print("doing work")`,
      },
    ],
    challenges: [
      {
        id: "core4c1",
        prompt:
          "Write a class context manager Brackets that prints '[' on enter and ']' on exit. Use it in a with block whose body prints 'inside'. Output across the three lines should contain '[', 'inside', and ']' in that order.",
        hint: "print('[') in __enter__, print(']') in __exit__; __exit__ takes (self, exc_type, exc, tb)",
        validateFn: `const o = output.indexOf("["), m = output.indexOf("inside"), c = output.indexOf("]"); return o !== -1 && m > o && c > m`,
        solution: `class Brackets:
    def __enter__(self):
        print("[")
        return self

    def __exit__(self, exc_type, exc, tb):
        print("]")


with Brackets():
    print("inside")`,
      },
      {
        id: "core4c2",
        prompt:
          "Use contextlib.contextmanager to write a context manager named step that prints 'begin' before yielding and 'end' in a finally after. Use it in a with block that prints 'work'. Output should contain begin, work, and end.",
        hint: "@contextmanager over a generator: print('begin'); try: yield; finally: print('end')",
        validateFn: `return output.includes("begin") && output.includes("work") && output.includes("end")`,
        solution: `from contextlib import contextmanager


@contextmanager
def step():
    print("begin")
    try:
        yield
    finally:
        print("end")


with step():
    print("work")`,
      },
    ],
  },
  {
    module: "Core Python Deep Dive",
    moduleSlug: "core-python",
    lessonNumber: 5,
    slug: "error-handling-deep",
    title: "Exceptions In Depth",
    badge: "concept",
    theory: `
A bare \`try/except\` is the start. The full shape has four parts, and each one
has a job.

\`\`\`python
try:
    value = int("42")
except ValueError:
    print("not a number")
else:
    print(f"parsed {value}")   # runs only if no exception
finally:
    print("done")              # runs no matter what
\`\`\`

\`else\` holds the code that should run when nothing failed, which keeps the
\`try\` block small and honest. \`finally\` is for cleanup that must happen
either way.

Exceptions form a hierarchy. \`ValueError\` and \`KeyError\` are both
\`Exception\`; catching \`Exception\` catches almost everything, which is usually
too broad. Catch the specific thing you can actually handle.

⚠️ Warning: \`except Exception:\` that just passes will swallow real bugs and
leave you debugging blind. Catch narrow, or re-raise.

You can define your own exceptions by subclassing \`Exception\`, which makes
errors in your code self-describing.

\`\`\`python
class InsufficientFunds(Exception):
    pass

def withdraw(balance, amount):
    if amount > balance:
        raise InsufficientFunds(f"need {amount}, have {balance}")
    return balance - amount
\`\`\`

📝 Note: \`raise NewError(...) from original\` keeps the original cause attached,
so the traceback shows the full story instead of hiding where it really broke.
`,
    starterCode: `try:
    value = int("42")
except ValueError:
    print("not a number")
else:
    print(f"parsed {value}")
finally:
    print("done")
`,
    examples: [
      {
        title: "a custom exception makes intent clear",
        explanation: "The error name says what went wrong without reading the message",
        code: `class InsufficientFunds(Exception):
    pass


def withdraw(balance, amount):
    if amount > balance:
        raise InsufficientFunds(f"need {amount}, have {balance}")
    return balance - amount


try:
    withdraw(50, 80)
except InsufficientFunds as e:
    print(f"declined: {e}")`,
      },
      {
        title: "chaining keeps the original cause",
        explanation: "raise ... from shows what really triggered the failure",
        code: `def load(raw):
    try:
        return int(raw)
    except ValueError as e:
        raise RuntimeError("bad config value") from e


try:
    load("not-a-number")
except RuntimeError as e:
    print(e)
    print(f"caused by: {type(e.__cause__).__name__}")`,
      },
    ],
    challenges: [
      {
        id: "core5c1",
        prompt:
          "Define a custom exception class InsufficientFunds. Write withdraw(balance, amount) that raises it when amount > balance, otherwise returns the new balance. Call withdraw(50, 80) inside a try, catch InsufficientFunds, and print 'declined'.",
        hint: "class InsufficientFunds(Exception): pass; raise it when amount > balance",
        validateFn: `return output.includes("declined")`,
        solution: `class InsufficientFunds(Exception):
    pass


def withdraw(balance, amount):
    if amount > balance:
        raise InsufficientFunds("over the limit")
    return balance - amount


try:
    withdraw(50, 80)
except InsufficientFunds:
    print("declined")`,
      },
      {
        id: "core5c2",
        prompt:
          "Write a try/except/else/finally that runs int('oops'). The except catches ValueError and prints 'bad input', the else prints 'ok', and the finally prints 'cleanup'. Output should contain 'bad input' and 'cleanup' but not 'ok'.",
        hint: "the else only runs if the try succeeds; here int('oops') raises, so else is skipped",
        validateFn: `return output.includes("bad input") && output.includes("cleanup") && !output.includes("ok")`,
        solution: `try:
    value = int("oops")
except ValueError:
    print("bad input")
else:
    print("ok")
finally:
    print("cleanup")`,
      },
    ],
  },
  {
    module: "Core Python Deep Dive",
    moduleSlug: "core-python",
    lessonNumber: 6,
    slug: "sets-collections",
    title: "Sets & the collections Module",
    badge: "concept",
    theory: `
A set holds unique items and answers membership instantly. The real payoff is
set algebra: union, intersection, difference, done with operators.

\`\`\`python
a = {1, 2, 3}
b = {2, 3, 4}
print(a & b)   # {2, 3}   intersection
print(a | b)   # {1, 2, 3, 4}  union
print(a - b)   # {1}      difference
\`\`\`

\`frozenset\` is the immutable version, so you can use it as a dict key or put it
inside another set.

The \`collections\` module has specialized containers that save you from
reinventing them:

\`\`\`python
from collections import Counter

votes = ["red", "blue", "red", "red", "blue"]
print(Counter(votes).most_common(1))   # [('red', 3)]
\`\`\`

💡 Key: \`Counter\` tallies things and ranks them with \`most_common\`.
\`defaultdict\` gives missing keys a default instead of raising \`KeyError\`.
\`deque\` is a list that is fast to push and pop on both ends.

\`\`\`python
from collections import defaultdict

groups = defaultdict(list)
for name, team in [("al", "red"), ("bo", "red"), ("cy", "blue")]:
    groups[team].append(name)   # no "if key in dict" dance needed

print(dict(groups))
\`\`\`

These are the difference between a tidy ten-line solution and a clumsy thirty.
`,
    starterCode: `from collections import Counter

words = ["red", "blue", "red", "green", "red", "blue"]
counts = Counter(words)
print(counts.most_common(1))
`,
    examples: [
      {
        title: "set algebra finds overlaps and gaps",
        explanation: "Intersection is shared, difference is what only one side has",
        code: `monday = {"al", "bo", "cy"}
tuesday = {"bo", "cy", "di"}

print("both days:", sorted(monday & tuesday))
print("monday only:", sorted(monday - tuesday))`,
      },
      {
        title: "defaultdict skips the key-exists check",
        explanation: "Missing keys start as an empty list automatically",
        code: `from collections import defaultdict

by_first = defaultdict(list)
for word in ["apple", "ant", "bird", "bee"]:
    by_first[word[0]].append(word)

print(dict(by_first))`,
      },
    ],
    challenges: [
      {
        id: "core6c1",
        prompt:
          "Given a = {1, 2, 3, 4} and b = {3, 4, 5, 6}, print the sorted list of values that are in both sets. It should be [3, 4].",
        hint: "use a & b for the intersection, then sorted(...)",
        validateFn: `return output.includes("[3, 4]")`,
        solution: `a = {1, 2, 3, 4}
b = {3, 4, 5, 6}
print(sorted(a & b))`,
      },
      {
        id: "core6c2",
        prompt:
          "Use collections.Counter on the list ['a','b','a','c','a','b'] and print the single most common item with its count using most_common(1). It should print [('a', 3)].",
        hint: "Counter(items).most_common(1)",
        validateFn: `return output.includes("('a', 3)")`,
        solution: `from collections import Counter

items = ["a", "b", "a", "c", "a", "b"]
print(Counter(items).most_common(1))`,
      },
    ],
  },
  {
    module: "Core Python Deep Dive",
    moduleSlug: "core-python",
    lessonNumber: 7,
    slug: "async-basics",
    title: "Async & await",
    badge: "concept",
    theory: `
Most code is synchronous: one line finishes before the next starts. When the
slow part is waiting (a network call, a disk read), that is wasted time. Async
lets one task wait while another runs.

You mark a function \`async def\`, and inside it you \`await\` other async calls.
An awaited call can pause and hand control back so other work proceeds.

\`\`\`python
import asyncio

async def fetch(name):
    await asyncio.sleep(0.01)   # pretend this is a slow network call
    return f"{name} done"

async def main():
    results = await asyncio.gather(fetch("a"), fetch("b"))
    print(results)
\`\`\`

\`asyncio.gather\` runs several coroutines concurrently and waits for all of
them. If each "call" waits 100ms, three of them finish in about 100ms together
instead of 300ms one after another.

⚠️ Warning: in a normal \`.py\` file you start the program with
\`asyncio.run(main())\`. This in-browser editor is already running inside an
event loop, so here you \`await\` directly at the top level instead of calling
\`asyncio.run\`. The coroutine code itself is identical.

📝 Note: async helps when you are I/O bound (waiting on the outside world). It
does not speed up heavy number crunching; that is CPU bound and wants different
tools.
`,
    starterCode: `import asyncio


async def greet(name):
    await asyncio.sleep(0)
    return f"hello {name}"


# This runtime already has an event loop, so await directly:
message = await greet("world")
print(message)
`,
    examples: [
      {
        title: "await a single coroutine",
        explanation: "async def makes a coroutine; await runs it and gets the value",
        code: `import asyncio


async def slow_double(n):
    await asyncio.sleep(0)
    return n * 2


result = await slow_double(21)
print(result)`,
      },
      {
        title: "gather runs coroutines concurrently",
        explanation: "Both run together; gather collects the results in order",
        code: `import asyncio


async def work(n):
    await asyncio.sleep(0)
    return n * n


values = await asyncio.gather(work(2), work(3), work(4))
print(values)
print(sum(values))`,
      },
    ],
    challenges: [
      {
        id: "core7c1",
        prompt:
          "Write an async function ping() that awaits asyncio.sleep(0) and returns 'pong'. Await it at the top level and print the result. (Remember: this runtime already has an event loop, so use await, not asyncio.run.)",
        hint: "result = await ping(); print(result)",
        validateFn: `return output.includes("pong")`,
        solution: `import asyncio


async def ping():
    await asyncio.sleep(0)
    return "pong"


result = await ping()
print(result)`,
      },
      {
        id: "core7c2",
        prompt:
          "Write an async function num(x) that returns x after awaiting asyncio.sleep(0). Use asyncio.gather to run num(10), num(20), and num(30) concurrently, await it, and print the sum. It should print 60.",
        hint: "vals = await asyncio.gather(num(10), num(20), num(30)); print(sum(vals))",
        validateFn: `return output.trim().split(/\\s+/).includes("60")`,
        solution: `import asyncio


async def num(x):
    await asyncio.sleep(0)
    return x


vals = await asyncio.gather(num(10), num(20), num(30))
print(sum(vals))`,
      },
    ],
  },
];
