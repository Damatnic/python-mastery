import type { Lesson } from "../types";

export const lessonsModuleOop: Lesson[] = [
  {
    module: "Object-Oriented Python",
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
    module: "Object-Oriented Python",
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
    module: "Object-Oriented Python",
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
    module: "Object-Oriented Python",
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
  {
    module: "Object-Oriented Python",
    moduleSlug: "oop-tooling",
    lessonNumber: 5,
    slug: "inheritance-polymorphism",
    title: "Inheritance & Polymorphism",
    badge: "concept",
    theory: `
Inheritance lets one class build on another. The child gets everything the
parent has and can add to it or change it.

\`\`\`python
class Animal:
    def __init__(self, name):
        self.name = name

    def speak(self):
        return "..."


class Dog(Animal):
    def speak(self):
        return "woof"
\`\`\`

\`Dog\` inherits \`__init__\` from \`Animal\`, so \`Dog("rex").name\` works for free.
It overrides \`speak\` with its own version. That override is polymorphism: the
same call, \`animal.speak()\`, does the right thing for whatever object you have.

💡 Key: \`super()\` calls the parent's version. Use it when you want to extend
the parent's behavior instead of replacing it, especially in \`__init__\`.

\`\`\`python
class Cat(Animal):
    def __init__(self, name, indoor):
        super().__init__(name)   # run Animal's setup first
        self.indoor = indoor
\`\`\`

⚠️ Warning: deep inheritance trees get hard to follow fast. Most of the time one
level is plenty. If you find yourself four classes deep, composition (one object
holding another) is usually the cleaner answer.
`,
    starterCode: `class Animal:
    def __init__(self, name):
        self.name = name

    def speak(self):
        return "..."


class Dog(Animal):
    def speak(self):
        return "woof"


d = Dog("rex")
print(f"{d.name} says {d.speak()}")
`,
    examples: [
      {
        title: "polymorphism: one loop, different behavior",
        explanation: "Each object answers speak() its own way",
        code: `class Animal:
    def speak(self):
        return "..."


class Dog(Animal):
    def speak(self):
        return "woof"


class Cat(Animal):
    def speak(self):
        return "meow"


for animal in [Dog(), Cat(), Animal()]:
    print(animal.speak())`,
      },
      {
        title: "super() extends the parent",
        explanation: "Run the parent __init__, then add the child's own fields",
        code: `class Vehicle:
    def __init__(self, wheels):
        self.wheels = wheels


class Car(Vehicle):
    def __init__(self, brand):
        super().__init__(4)
        self.brand = brand


c = Car("toyota")
print(c.brand, c.wheels)`,
      },
    ],
    challenges: [
      {
        id: "oop5c1",
        prompt:
          "Define a base class Shape with a method area() that returns 0. Define Square(side) that stores side and overrides area() to return side*side. Print Square(4).area(). It should print 16.",
        hint: "Square.__init__ stores self.side; override area to return self.side * self.side",
        validateFn: `return output.trim().split(/\\s+/).includes("16")`,
        solution: `class Shape:
    def area(self):
        return 0


class Square(Shape):
    def __init__(self, side):
        self.side = side

    def area(self):
        return self.side * self.side


print(Square(4).area())`,
      },
      {
        id: "oop5c2",
        prompt:
          "Define Animal with __init__(self, name) and a speak() returning '...'. Define Dog(Animal) that overrides speak() to return 'woof'. Build Dog('rex') and print '<name>: <sound>'. Output should contain 'rex' and 'woof'.",
        hint: "Dog inherits __init__ from Animal, so you only override speak",
        validateFn: `return output.includes("rex") && output.includes("woof")`,
        solution: `class Animal:
    def __init__(self, name):
        self.name = name

    def speak(self):
        return "..."


class Dog(Animal):
    def speak(self):
        return "woof"


d = Dog("rex")
print(f"{d.name}: {d.speak()}")`,
      },
    ],
  },
  {
    module: "Object-Oriented Python",
    moduleSlug: "oop-tooling",
    lessonNumber: 6,
    slug: "properties-encapsulation",
    title: "Properties & Encapsulation",
    badge: "concept",
    theory: `
Sometimes an attribute should be computed, validated, or read-only. \`@property\`
lets a method act like an attribute, so callers write \`obj.area\` with no
parentheses, and you keep control of what happens.

\`\`\`python
class Circle:
    def __init__(self, radius):
        self.radius = radius

    @property
    def area(self):
        return round(3.14159 * self.radius ** 2, 2)


c = Circle(2)
print(c.area)   # 12.57, computed on access
\`\`\`

A property can also have a setter that validates before storing.

\`\`\`python
class Account:
    def __init__(self):
        self._balance = 0

    @property
    def balance(self):
        return self._balance

    @balance.setter
    def balance(self, value):
        if value < 0:
            raise ValueError("balance cannot be negative")
        self._balance = value
\`\`\`

📝 Note: the leading underscore on \`_balance\` is a convention, not a lock.
Python does not have truly private fields. The underscore says "internal, leave
this alone," and the property is the public, safe way in.
`,
    starterCode: `class Circle:
    def __init__(self, radius):
        self.radius = radius

    @property
    def area(self):
        return round(3.14159 * self.radius ** 2, 2)


print(Circle(2).area)
`,
    examples: [
      {
        title: "a computed, read-only property",
        explanation: "full_name is derived on access, not stored",
        code: `class Person:
    def __init__(self, first, last):
        self.first = first
        self.last = last

    @property
    def full_name(self):
        return f"{self.first} {self.last}"


p = Person("ada", "lovelace")
print(p.full_name)`,
      },
      {
        title: "a setter that validates",
        explanation: "The setter rejects bad values before they're stored",
        code: `class Account:
    def __init__(self):
        self._balance = 0

    @property
    def balance(self):
        return self._balance

    @balance.setter
    def balance(self, value):
        if value < 0:
            raise ValueError("negative")
        self._balance = value


a = Account()
a.balance = 100
print(a.balance)
try:
    a.balance = -5
except ValueError:
    print("rejected")`,
      },
    ],
    challenges: [
      {
        id: "oop6c1",
        prompt:
          "Define a class Circle with __init__(self, radius). Add an area property (using @property) that returns round(3.14159 * radius squared, 2). Print Circle(2).area. It should print 12.57.",
        hint: "@property above def area(self); return round(3.14159 * self.radius ** 2, 2)",
        validateFn: `return output.includes("12.57")`,
        solution: `class Circle:
    def __init__(self, radius):
        self.radius = radius

    @property
    def area(self):
        return round(3.14159 * self.radius ** 2, 2)


print(Circle(2).area)`,
      },
      {
        id: "oop6c2",
        prompt:
          "Define a class Account that starts with self._balance = 0. Add a balance @property returning _balance, and a deposit(amount) method that adds to it. Deposit 100 then 50, and print the balance. It should print 150.",
        hint: "deposit does self._balance += amount; the property just returns self._balance",
        validateFn: `return output.trim().split(/\\s+/).includes("150")`,
        solution: `class Account:
    def __init__(self):
        self._balance = 0

    @property
    def balance(self):
        return self._balance

    def deposit(self, amount):
        self._balance += amount


a = Account()
a.deposit(100)
a.deposit(50)
print(a.balance)`,
      },
    ],
  },
  {
    module: "Object-Oriented Python",
    moduleSlug: "oop-tooling",
    lessonNumber: 7,
    slug: "dunder-methods",
    title: "Dunder Methods",
    badge: "concept",
    theory: `
Dunder methods (double underscore, like \`__add__\`) let your objects work with
Python's built-in syntax. You already met \`__init__\` and \`__str__\`. There are
many more, and they are how \`+\`, \`==\`, \`len()\`, and \`print\` know what to do.

\`\`\`python
class Vector:
    def __init__(self, x, y):
        self.x = x
        self.y = y

    def __add__(self, other):
        return Vector(self.x + other.x, self.y + other.y)

    def __repr__(self):
        return f"Vector({self.x}, {self.y})"


print(Vector(1, 2) + Vector(3, 4))   # Vector(4, 6)
\`\`\`

\`__add__\` makes \`+\` work. \`__repr__\` is the unambiguous developer-facing
string, the one you see in the REPL and in lists; \`__str__\` is the friendly one
for users. Define \`__repr__\` at minimum.

💡 Key: \`__eq__\` controls \`==\`, \`__len__\` controls \`len()\`, \`__lt__\`
controls \`<\` (and lets \`sorted\` order your objects).

\`\`\`python
class Team:
    def __init__(self, members):
        self.members = members

    def __len__(self):
        return len(self.members)


print(len(Team(["a", "b", "c"])))   # 3
\`\`\`
`,
    starterCode: `class Vector:
    def __init__(self, x, y):
        self.x = x
        self.y = y

    def __add__(self, other):
        return Vector(self.x + other.x, self.y + other.y)

    def __repr__(self):
        return f"Vector({self.x}, {self.y})"


print(Vector(1, 2) + Vector(3, 4))
`,
    examples: [
      {
        title: "__eq__ makes value comparison work",
        explanation: "Two points with the same coordinates compare equal",
        code: `class Point:
    def __init__(self, x, y):
        self.x = x
        self.y = y

    def __eq__(self, other):
        return self.x == other.x and self.y == other.y


print(Point(1, 2) == Point(1, 2))
print(Point(1, 2) == Point(9, 9))`,
      },
      {
        title: "__lt__ lets sorted() order your objects",
        explanation: "Define less-than and sorting falls out for free",
        code: `class Player:
    def __init__(self, name, score):
        self.name = name
        self.score = score

    def __lt__(self, other):
        return self.score < other.score

    def __repr__(self):
        return self.name


players = [Player("al", 30), Player("bo", 10), Player("cy", 20)]
print(sorted(players))`,
      },
    ],
    challenges: [
      {
        id: "oop7c1",
        prompt:
          "Define a class Vector with __init__(self, x, y), an __add__ that returns a new Vector with summed components, and a __repr__ that returns 'Vector(x, y)'. Print Vector(1, 2) + Vector(3, 4). It should print Vector(4, 6).",
        hint: "__add__ returns Vector(self.x + other.x, self.y + other.y)",
        validateFn: `return output.includes("Vector(4, 6)")`,
        solution: `class Vector:
    def __init__(self, x, y):
        self.x = x
        self.y = y

    def __add__(self, other):
        return Vector(self.x + other.x, self.y + other.y)

    def __repr__(self):
        return f"Vector({self.x}, {self.y})"


print(Vector(1, 2) + Vector(3, 4))`,
      },
      {
        id: "oop7c2",
        prompt:
          "Define a class Playlist that stores a list of songs passed to __init__. Add a __len__ that returns the number of songs. Build Playlist(['a', 'b', 'c', 'd']) and print its len(). It should print 4.",
        hint: "store self.songs = songs; __len__ returns len(self.songs)",
        validateFn: `return output.trim().split(/\\s+/).includes("4")`,
        solution: `class Playlist:
    def __init__(self, songs):
        self.songs = songs

    def __len__(self):
        return len(self.songs)


print(len(Playlist(["a", "b", "c", "d"])))`,
      },
    ],
  },
  {
    module: "Object-Oriented Python",
    moduleSlug: "oop-tooling",
    lessonNumber: 8,
    slug: "abstract-base-classes",
    title: "Abstract Base Classes & Protocols",
    badge: "concept",
    theory: `
Sometimes you want to say "any subclass must provide this method." An abstract
base class enforces that. Subclass it, and Python refuses to create an instance
until you implement every abstract method.

\`\`\`python
from abc import ABC, abstractmethod


class PaymentMethod(ABC):
    @abstractmethod
    def pay(self, amount):
        ...


class Cash(PaymentMethod):
    def pay(self, amount):
        return f"paid {amount} in cash"


print(Cash().pay(20))
# PaymentMethod() here would raise TypeError: it's abstract
\`\`\`

The ABC documents the contract and catches a missing method at construction
time instead of at the call that needed it.

💡 Key: Python also lets you skip the inheritance entirely. \`typing.Protocol\`
describes a shape ("has an \`area()\` method") and any class that fits counts,
no subclassing required. This is duck typing made explicit: if it walks like a
duck, it is a duck.

\`\`\`python
from typing import Protocol


class HasArea(Protocol):
    def area(self) -> float: ...


def describe(shape: HasArea) -> str:
    return f"area is {shape.area()}"
\`\`\`

Any object with an \`area()\` method satisfies \`HasArea\`, even if it never heard
of it. Type checkers verify the fit; at runtime it just works.
`,
    starterCode: `from abc import ABC, abstractmethod


class PaymentMethod(ABC):
    @abstractmethod
    def pay(self, amount):
        ...


class Cash(PaymentMethod):
    def pay(self, amount):
        return f"paid {amount} in cash"


print(Cash().pay(20))
`,
    examples: [
      {
        title: "an abstract class refuses to instantiate",
        explanation: "You cannot create the base directly; the subclass must implement",
        code: `from abc import ABC, abstractmethod


class Shape(ABC):
    @abstractmethod
    def area(self):
        ...


class Square(Shape):
    def __init__(self, side):
        self.side = side

    def area(self):
        return self.side * self.side


print(Square(5).area())
try:
    Shape()
except TypeError:
    print("cannot instantiate abstract Shape")`,
      },
      {
        title: "duck typing: no shared base needed",
        explanation: "describe works on anything that has area()",
        code: `def describe(shape):
    return f"area is {shape.area()}"


class Circle:
    def area(self):
        return 78.5


class Box:
    def area(self):
        return 40


print(describe(Circle()))
print(describe(Box()))`,
      },
    ],
    challenges: [
      {
        id: "oop8c1",
        prompt:
          "Using abc.ABC and @abstractmethod, define an abstract class Notifier with an abstract method send(message). Define Email(Notifier) implementing send to return 'email: <message>'. Print Email().send('hi'). Output should contain 'email: hi'.",
        hint: "from abc import ABC, abstractmethod; decorate send with @abstractmethod in the base",
        validateFn: `return output.includes("email: hi")`,
        solution: `from abc import ABC, abstractmethod


class Notifier(ABC):
    @abstractmethod
    def send(self, message):
        ...


class Email(Notifier):
    def send(self, message):
        return f"email: {message}"


print(Email().send("hi"))`,
      },
      {
        id: "oop8c2",
        prompt:
          "Write a function total_area(shapes) that sums shape.area() for every shape in the list (duck typing, no base class needed). Pass two small classes that each have an area() method returning 10 and 15. Print the total. It should print 25.",
        hint: "just call s.area() in a loop or sum(); the classes only need an area() method",
        validateFn: `return output.trim().split(/\\s+/).includes("25")`,
        solution: `def total_area(shapes):
    return sum(s.area() for s in shapes)


class A:
    def area(self):
        return 10


class B:
    def area(self):
        return 15


print(total_area([A(), B()]))`,
      },
    ],
  },
  {
    module: "Object-Oriented Python",
    moduleSlug: "oop-tooling",
    lessonNumber: 9,
    slug: "design-patterns-pythonic",
    title: "Patterns, the Pythonic Way",
    badge: "concept",
    theory: `
Design patterns are reusable solutions to common problems. In a lot of
languages they need heavy class machinery. Python's functions-are-objects rule
makes several of them almost disappear.

The strategy pattern, swapping out an algorithm at runtime, is just passing a
function.

\`\`\`python
def apply(a, b, op):
    return op(a, b)


print(apply(6, 2, lambda x, y: x + y))   # 8
print(apply(6, 2, lambda x, y: x - y))   # 4
\`\`\`

The factory pattern, creating the right object from a description, is a function
that returns instances.

\`\`\`python
class Square:
    def area(self): return 4


class Circle:
    def area(self): return 3


def make_shape(kind):
    return {"square": Square, "circle": Circle}[kind]()


print(make_shape("square").area())
\`\`\`

💡 Key: do not import a pattern just because you can. A dict of functions often
beats a class hierarchy. The goal is code that is easy to read and change, not
code that name-drops the Gang of Four.

⚠️ Warning: over-engineering is its own bug. Reach for a pattern when the
problem actually shows up twice, not on the guess that it might.
`,
    starterCode: `def apply(a, b, op):
    return op(a, b)


print(apply(6, 2, lambda x, y: x + y))
print(apply(6, 2, lambda x, y: x * y))
`,
    examples: [
      {
        title: "strategy: behavior passed as an argument",
        explanation: "The caller picks the algorithm by handing in a function",
        code: `def discounted(price, strategy):
    return strategy(price)


half_off = lambda p: p * 0.5
ten_off = lambda p: p - 10

print(discounted(100, half_off))
print(discounted(100, ten_off))`,
      },
      {
        title: "factory: a function that builds the right object",
        explanation: "Map a string to a class and construct it",
        code: `class Dog:
    def sound(self): return "woof"


class Cat:
    def sound(self): return "meow"


def make_animal(kind):
    registry = {"dog": Dog, "cat": Cat}
    return registry[kind]()


print(make_animal("dog").sound())
print(make_animal("cat").sound())`,
      },
    ],
    challenges: [
      {
        id: "oop9c1",
        prompt:
          "Write a function run(a, b, op) where op is a function. Call run(10, 3, ...) twice: once with a function that adds and once with one that subtracts, printing both results. Output should contain 13 and 7.",
        hint: "op(a, b) inside run; pass lambda x, y: x + y and lambda x, y: x - y",
        validateFn: `return output.includes("13") && output.includes("7")`,
        solution: `def run(a, b, op):
    return op(a, b)


print(run(10, 3, lambda x, y: x + y))
print(run(10, 3, lambda x, y: x - y))`,
      },
      {
        id: "oop9c2",
        prompt:
          "Write a factory function make_shape(kind) that returns a Square instance when kind is 'square' and a Circle instance when kind is 'circle'. Each class has an area() method (Square returns 9, Circle returns 12). Print make_shape('circle').area(). It should print 12.",
        hint: "map the string to the class, then call it: {'square': Square, 'circle': Circle}[kind]()",
        validateFn: `return output.trim().split(/\\s+/).includes("12")`,
        solution: `class Square:
    def area(self):
        return 9


class Circle:
    def area(self):
        return 12


def make_shape(kind):
    return {"square": Square, "circle": Circle}[kind]()


print(make_shape("circle").area())`,
      },
    ],
  },
];
