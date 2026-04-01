import type { Lesson } from "../types";

export const lessonsModule1: Lesson[] = [
  {
    module: "Python Basics",
    moduleSlug: "python-basics",
    lessonNumber: 1,
    slug: "variables-fstrings",
    title: "Variables & F-Strings",
    badge: "concept",
    theory: `
## Variables: Boxes That Hold Values

Think of variables like labeled boxes. You put a value in the box, slap a name on it, and now you can reference that value by its name.

\`\`\`python
name = "Alice"      # A string in a box labeled "name"
age = 25            # An integer in a box labeled "age"
price = 19.99       # A float in a box labeled "price"
is_active = True    # A boolean in a box labeled "is_active"
\`\`\`

Python figures out the type automatically. You don't declare types like in Java or C.

## F-Strings: The Modern Way to Format

F-strings (formatted string literals) let you embed expressions inside strings. Put an \`f\` before the quotes and use \`{}\` to insert values:

\`\`\`python
name = "Alice"
age = 25
print(f"Hello, {name}! You are {age} years old.")
# Output: Hello, Alice! You are 25 years old.
\`\`\`

You can do math inside the braces:

\`\`\`python
price = 19.99
quantity = 3
print(f"Total: \${price * quantity:.2f}")
# Output: Total: $59.97
\`\`\`

The \`:.2f\` is a format specifier — it means "show 2 decimal places."

## Common Format Specifiers

| Specifier | Meaning | Example |
|-----------|---------|---------|
| \`:.2f\` | 2 decimal places | \`3.14159\` → \`3.14\` |
| \`:,\` | Thousands separator | \`1000000\` → \`1,000,000\` |
| \`:.0%\` | Percentage | \`0.85\` → \`85%\` |
| \`:>10\` | Right-align, 10 chars | \`"hi"\` → \`"        hi"\` |

## Why This Matters

Variables and f-strings are the foundation. Every data analysis script starts with storing values and building output strings. Master these and everything else becomes easier.
`,
    starterCode: `# Try creating variables and printing with f-strings
name = "Your Name"
score = 95

# Print a greeting with the name
print(f"Hello, {name}!")

# Print the score as a percentage
print(f"Your score: {score}%")
`,
    examples: [
      {
        title: "Basic Variables",
        explanation: "Creating different types of variables and printing them",
        code: `# Different types of variables
city = "New York"
population = 8336817
area_sq_miles = 302.6
is_capital = False

print(f"{city} has {population:,} people")
print(f"Area: {area_sq_miles} square miles")
print(f"Is it the capital? {is_capital}")`,
      },
      {
        title: "Calculations in F-Strings",
        explanation: "You can do math right inside the curly braces",
        code: `base_price = 49.99
tax_rate = 0.08
quantity = 3

subtotal = base_price * quantity
tax = subtotal * tax_rate
total = subtotal + tax

print(f"Subtotal: \${subtotal:.2f}")
print(f"Tax ({tax_rate:.0%}): \${tax:.2f}")
print(f"Total: \${total:.2f}")`,
      },
      {
        title: "String Methods with Variables",
        explanation: "Variables can be modified with string methods",
        code: `first_name = "alice"
last_name = "SMITH"

# Fix the capitalization
formatted_name = f"{first_name.title()} {last_name.title()}"
print(formatted_name)

# String length
print(f"Name has {len(formatted_name)} characters")`,
      },
    ],
    challenges: [
      {
        id: "m1l1c1",
        prompt: "Create a variable called 'product' with value 'Laptop' and 'price' with value 999.99. Print them in an f-string like: 'The Laptop costs $999.99'",
        hint: "Use f-strings with :.2f for the price formatting",
        validateFn: `return output.includes("Laptop") && output.includes("999.99") && output.includes("$")`,
        solution: `product = "Laptop"
price = 999.99
print(f"The {product} costs \${price:.2f}")`,
      },
      {
        id: "m1l1c2",
        prompt: "Create variables for hours=40 and rate=25.50. Calculate and print the weekly pay formatted as currency with 2 decimal places.",
        hint: "Multiply hours by rate, then use :.2f in your f-string",
        validateFn: `return output.includes("1020.00") || output.includes("1,020.00")`,
        solution: `hours = 40
rate = 25.50
weekly_pay = hours * rate
print(f"Weekly pay: \${weekly_pay:.2f}")`,
      },
    ],
    projectChallenge: {
      threadId: "permits",
      threadTitle: "SF Permits Analysis",
      taskTitle: "Format Permit Summary",
      context: "You're building a permit lookup system. Given a permit number and its details, create a formatted summary line that displays the key information clearly.",
      starterCode: `import pandas as pd
import io

permits_csv = """Permit Number|Permit Type|Street Number|Street Name|Status|Filed Date|Issued Date|Neighborhood|Existing Use|Proposed Use
BP2023-0001|alterations|450|Market St|issued|2023-01-15|2023-02-10|Financial District|office|office
BP2023-0002|new construction|1200|Mission St|complete|2023-01-18|2023-02-28|SoMa|vacant lot|apartments
BP2023-0003|additions|2847|24th St|issued|2023-01-22|2023-03-05|Mission|1 family dwelling|1 family dwelling
BP2023-0004|alterations|555|California St|cancelled|2023-01-25||Nob Hill|office|office
BP2023-0005|demolition|890|Folsom St|complete|2023-02-01|2023-02-15|SoMa|warehouse|vacant lot
BP2023-0006|new construction|3200|16th St|issued|2023-02-05|2023-04-01|Mission|parking lot|retail
BP2023-0007|alterations|100|Van Ness Ave|withdrawn|2023-02-10||Civic Center|retail|restaurant
BP2023-0008|sign erection|1800|Haight St|complete|2023-02-12|2023-02-20|Haight-Ashbury|retail|retail
BP2023-0009|additions|4521|Judah St|issued|2023-02-15|2023-04-10|Sunset|1 family dwelling|2 family dwelling
BP2023-0010|alterations|601|Montgomery St|issued|2023-02-18|2023-03-25|Financial District|office|office
BP2023-0011|new construction|2100|Folsom St|expired|2023-02-20|2023-03-30|Mission|vacant lot|apartments
BP2023-0012|alterations|789|Brannan St|complete|2023-02-22|2023-04-05|SoMa|warehouse|office
BP2023-0013|demolition|1550|Howard St|complete|2023-02-25|2023-03-10|SoMa|industrial|vacant lot
BP2023-0014|additions|3845|Noriega St|issued|2023-03-01|2023-05-01|Sunset|1 family dwelling|1 family dwelling
BP2023-0015|new construction|425|Mission St|issued|2023-03-05|2023-06-15|Financial District|parking lot|office tower"""

permits = pd.read_csv(io.StringIO(permits_csv), sep='|')

# Get the first permit's data
first_permit = permits.iloc[0]
permit_number = first_permit["Permit Number"]
street_name = first_permit["Street Name"]
status = first_permit["Status"]

# TODO: Print a summary line like: "Permit BP2023-0001 on Market St has status: issued"
`,
      solution: `import pandas as pd
import io

permits_csv = """Permit Number|Permit Type|Street Number|Street Name|Status|Filed Date|Issued Date|Neighborhood|Existing Use|Proposed Use
BP2023-0001|alterations|450|Market St|issued|2023-01-15|2023-02-10|Financial District|office|office
BP2023-0002|new construction|1200|Mission St|complete|2023-01-18|2023-02-28|SoMa|vacant lot|apartments
BP2023-0003|additions|2847|24th St|issued|2023-01-22|2023-03-05|Mission|1 family dwelling|1 family dwelling
BP2023-0004|alterations|555|California St|cancelled|2023-01-25||Nob Hill|office|office
BP2023-0005|demolition|890|Folsom St|complete|2023-02-01|2023-02-15|SoMa|warehouse|vacant lot
BP2023-0006|new construction|3200|16th St|issued|2023-02-05|2023-04-01|Mission|parking lot|retail
BP2023-0007|alterations|100|Van Ness Ave|withdrawn|2023-02-10||Civic Center|retail|restaurant
BP2023-0008|sign erection|1800|Haight St|complete|2023-02-12|2023-02-20|Haight-Ashbury|retail|retail
BP2023-0009|additions|4521|Judah St|issued|2023-02-15|2023-04-10|Sunset|1 family dwelling|2 family dwelling
BP2023-0010|alterations|601|Montgomery St|issued|2023-02-18|2023-03-25|Financial District|office|office
BP2023-0011|new construction|2100|Folsom St|expired|2023-02-20|2023-03-30|Mission|vacant lot|apartments
BP2023-0012|alterations|789|Brannan St|complete|2023-02-22|2023-04-05|SoMa|warehouse|office
BP2023-0013|demolition|1550|Howard St|complete|2023-02-25|2023-03-10|SoMa|industrial|vacant lot
BP2023-0014|additions|3845|Noriega St|issued|2023-03-01|2023-05-01|Sunset|1 family dwelling|1 family dwelling
BP2023-0015|new construction|425|Mission St|issued|2023-03-05|2023-06-15|Financial District|parking lot|office tower"""

permits = pd.read_csv(io.StringIO(permits_csv), sep='|')

first_permit = permits.iloc[0]
permit_number = first_permit["Permit Number"]
street_name = first_permit["Street Name"]
status = first_permit["Status"]

print(f"Permit {permit_number} on {street_name} has status: {status}")`,
      validateFn: `return output.includes("Permit BP2023-0001") && output.includes("Market St") && output.includes("status") && output.includes("issued")`,
      hint: "Use an f-string with curly braces to embed the permit_number, street_name, and status variables.",
      xpReward: 50,
    },
  },
  {
    module: "Python Basics",
    moduleSlug: "python-basics",
    lessonNumber: 2,
    slug: "lists-tuples",
    title: "Lists & Tuples",
    badge: "concept",
    theory: `
## Lists: Ordered Collections You Can Change

A list is like a numbered container that holds items in order. Create one with square brackets:

\`\`\`python
fruits = ["apple", "banana", "cherry"]
numbers = [1, 2, 3, 4, 5]
mixed = ["hello", 42, True, 3.14]  # Can mix types
\`\`\`

## Accessing Items: Indexing

Python uses **zero-based indexing**. The first item is at index 0:

\`\`\`python
fruits = ["apple", "banana", "cherry"]
print(fruits[0])   # "apple"
print(fruits[1])   # "banana"
print(fruits[-1])  # "cherry" (last item)
print(fruits[-2])  # "banana" (second to last)
\`\`\`

## Slicing: Getting Multiple Items

Use \`[start:end]\` to get a range. The end index is *exclusive*:

\`\`\`python
numbers = [0, 1, 2, 3, 4, 5]
print(numbers[1:4])   # [1, 2, 3]
print(numbers[:3])    # [0, 1, 2] (from start)
print(numbers[3:])    # [3, 4, 5] (to end)
print(numbers[::2])   # [0, 2, 4] (every 2nd)
\`\`\`

## Modifying Lists

\`\`\`python
fruits = ["apple", "banana"]
fruits.append("cherry")       # Add to end
fruits.insert(1, "orange")    # Insert at position
fruits.remove("banana")       # Remove by value
popped = fruits.pop()         # Remove & return last
\`\`\`

## Tuples: Immutable Lists

Tuples are like lists but cannot be changed after creation. Use parentheses:

\`\`\`python
coordinates = (10, 20)
rgb = (255, 128, 0)
# coordinates[0] = 5  # ERROR! Can't modify tuples
\`\`\`

Use tuples for data that shouldn't change, like coordinates or database records.

## Useful List Functions

| Function | What It Does |
|----------|--------------|
| \`len(list)\` | Number of items |
| \`sum(list)\` | Sum of numbers |
| \`min(list)\` | Smallest value |
| \`max(list)\` | Largest value |
| \`sorted(list)\` | Returns sorted copy |
`,
    starterCode: `# Working with the students DataFrame
# Let's create some lists from it

names = ["Alice", "Bob", "Carol", "Dave", "Eve"]
scores = [95, 82, 91, 74, 88]

# Print the first name
print(f"First student: {names[0]}")

# Print the last score
print(f"Last score: {scores[-1]}")

# Print average score
print(f"Average: {sum(scores) / len(scores)}")
`,
    examples: [
      {
        title: "List Operations",
        explanation: "Common operations you'll use constantly",
        code: `grades = [85, 92, 78, 95, 88]

print(f"Count: {len(grades)}")
print(f"Sum: {sum(grades)}")
print(f"Average: {sum(grades)/len(grades):.1f}")
print(f"Highest: {max(grades)}")
print(f"Lowest: {min(grades)}")
print(f"Sorted: {sorted(grades)}")`,
      },
      {
        title: "Slicing Examples",
        explanation: "Different ways to slice a list",
        code: `data = [10, 20, 30, 40, 50, 60, 70, 80]

print(f"First 3: {data[:3]}")
print(f"Last 3: {data[-3:]}")
print(f"Middle: {data[2:6]}")
print(f"Every other: {data[::2]}")
print(f"Reversed: {data[::-1]}")`,
      },
      {
        title: "Building Lists",
        explanation: "Adding and modifying list contents",
        code: `# Start empty and build up
results = []
results.append(100)
results.append(95)
results.append(88)
print(f"Results: {results}")

# Insert at specific position
results.insert(1, 97)
print(f"After insert: {results}")

# Remove an item
results.remove(88)
print(f"After remove: {results}")`,
      },
    ],
    challenges: [
      {
        id: "m1l2c1",
        prompt: "Create a list called 'temps' with values [72, 75, 79, 81, 77]. Print the average temperature.",
        hint: "Use sum() divided by len()",
        validateFn: `return output.includes("76.8") || output.includes("76")`,
        solution: `temps = [72, 75, 79, 81, 77]
avg = sum(temps) / len(temps)
print(f"Average temperature: {avg}")`,
      },
      {
        id: "m1l2c2",
        prompt: "Given scores = [88, 92, 75, 95, 87], print the highest and lowest scores, and the range (difference between them).",
        hint: "Use max(), min(), and subtraction",
        validateFn: `return output.includes("95") && output.includes("75") && output.includes("20")`,
        solution: `scores = [88, 92, 75, 95, 87]
highest = max(scores)
lowest = min(scores)
range_val = highest - lowest
print(f"Highest: {highest}")
print(f"Lowest: {lowest}")
print(f"Range: {range_val}")`,
      },
    ],
    projectChallenge: {
      threadId: "permits",
      threadTitle: "SF Permits Analysis",
      taskTitle: "Extract Unique Neighborhoods",
      context: "Your city planning dashboard needs a dropdown of all neighborhoods with permits. Extract a list of unique neighborhood names from the permits data.",
      starterCode: `import pandas as pd
import io

permits_csv = """Permit Number|Permit Type|Street Number|Street Name|Status|Filed Date|Issued Date|Neighborhood|Existing Use|Proposed Use
BP2023-0001|alterations|450|Market St|issued|2023-01-15|2023-02-10|Financial District|office|office
BP2023-0002|new construction|1200|Mission St|complete|2023-01-18|2023-02-28|SoMa|vacant lot|apartments
BP2023-0003|additions|2847|24th St|issued|2023-01-22|2023-03-05|Mission|1 family dwelling|1 family dwelling
BP2023-0004|alterations|555|California St|cancelled|2023-01-25||Nob Hill|office|office
BP2023-0005|demolition|890|Folsom St|complete|2023-02-01|2023-02-15|SoMa|warehouse|vacant lot
BP2023-0006|new construction|3200|16th St|issued|2023-02-05|2023-04-01|Mission|parking lot|retail
BP2023-0007|alterations|100|Van Ness Ave|withdrawn|2023-02-10||Civic Center|retail|restaurant
BP2023-0008|sign erection|1800|Haight St|complete|2023-02-12|2023-02-20|Haight-Ashbury|retail|retail
BP2023-0009|additions|4521|Judah St|issued|2023-02-15|2023-04-10|Sunset|1 family dwelling|2 family dwelling
BP2023-0010|alterations|601|Montgomery St|issued|2023-02-18|2023-03-25|Financial District|office|office
BP2023-0011|new construction|2100|Folsom St|expired|2023-02-20|2023-03-30|Mission|vacant lot|apartments
BP2023-0012|alterations|789|Brannan St|complete|2023-02-22|2023-04-05|SoMa|warehouse|office
BP2023-0013|demolition|1550|Howard St|complete|2023-02-25|2023-03-10|SoMa|industrial|vacant lot
BP2023-0014|additions|3845|Noriega St|issued|2023-03-01|2023-05-01|Sunset|1 family dwelling|1 family dwelling
BP2023-0015|new construction|425|Mission St|issued|2023-03-05|2023-06-15|Financial District|parking lot|office tower"""

permits = pd.read_csv(io.StringIO(permits_csv), sep='|')

# TODO: Create a list of unique neighborhoods from the Neighborhood column
# Hint: Get the column as a list, then use set() to remove duplicates, then convert back to list
`,
      solution: `import pandas as pd
import io

permits_csv = """Permit Number|Permit Type|Street Number|Street Name|Status|Filed Date|Issued Date|Neighborhood|Existing Use|Proposed Use
BP2023-0001|alterations|450|Market St|issued|2023-01-15|2023-02-10|Financial District|office|office
BP2023-0002|new construction|1200|Mission St|complete|2023-01-18|2023-02-28|SoMa|vacant lot|apartments
BP2023-0003|additions|2847|24th St|issued|2023-01-22|2023-03-05|Mission|1 family dwelling|1 family dwelling
BP2023-0004|alterations|555|California St|cancelled|2023-01-25||Nob Hill|office|office
BP2023-0005|demolition|890|Folsom St|complete|2023-02-01|2023-02-15|SoMa|warehouse|vacant lot
BP2023-0006|new construction|3200|16th St|issued|2023-02-05|2023-04-01|Mission|parking lot|retail
BP2023-0007|alterations|100|Van Ness Ave|withdrawn|2023-02-10||Civic Center|retail|restaurant
BP2023-0008|sign erection|1800|Haight St|complete|2023-02-12|2023-02-20|Haight-Ashbury|retail|retail
BP2023-0009|additions|4521|Judah St|issued|2023-02-15|2023-04-10|Sunset|1 family dwelling|2 family dwelling
BP2023-0010|alterations|601|Montgomery St|issued|2023-02-18|2023-03-25|Financial District|office|office
BP2023-0011|new construction|2100|Folsom St|expired|2023-02-20|2023-03-30|Mission|vacant lot|apartments
BP2023-0012|alterations|789|Brannan St|complete|2023-02-22|2023-04-05|SoMa|warehouse|office
BP2023-0013|demolition|1550|Howard St|complete|2023-02-25|2023-03-10|SoMa|industrial|vacant lot
BP2023-0014|additions|3845|Noriega St|issued|2023-03-01|2023-05-01|Sunset|1 family dwelling|1 family dwelling
BP2023-0015|new construction|425|Mission St|issued|2023-03-05|2023-06-15|Financial District|parking lot|office tower"""

permits = pd.read_csv(io.StringIO(permits_csv), sep='|')

neighborhoods = list(set(permits["Neighborhood"].tolist()))
print(f"Unique neighborhoods: {neighborhoods}")
print(f"Total: {len(neighborhoods)}")`,
      validateFn: `return output.includes("Financial District") && output.includes("SoMa") && output.includes("Mission") && output.includes("Sunset")`,
      hint: "Use permits['Neighborhood'].tolist() to get all values, then set() to make them unique, then list() to convert back.",
      xpReward: 50,
    },
  },
  {
    module: "Python Basics",
    moduleSlug: "python-basics",
    lessonNumber: 3,
    slug: "dictionaries",
    title: "Dictionaries",
    badge: "concept",
    theory: `
## Dictionaries: Key-Value Storage

A dictionary stores data as key-value pairs. Think of it like a real dictionary: you look up a word (key) to find its definition (value).

\`\`\`python
person = {
    "name": "Alice",
    "age": 30,
    "city": "Boston"
}
\`\`\`

## Accessing Values

Use square brackets with the key, or \`.get()\` for safer access:

\`\`\`python
print(person["name"])       # "Alice"
print(person.get("age"))    # 30
print(person.get("job"))    # None (doesn't exist)
print(person.get("job", "Unknown"))  # "Unknown" (default)
\`\`\`

The difference: \`person["job"]\` raises an error if the key doesn't exist. \`.get()\` returns \`None\` or your default value.

## Adding & Modifying

\`\`\`python
person["job"] = "Engineer"    # Add new key
person["age"] = 31            # Modify existing
del person["city"]            # Delete a key
\`\`\`

## Useful Methods

\`\`\`python
person.keys()    # All keys: dict_keys(['name', 'age', 'job'])
person.values()  # All values: dict_values(['Alice', 31, 'Engineer'])
person.items()   # Key-value pairs as tuples
\`\`\`

## Nested Dictionaries

Dictionaries can contain other dictionaries:

\`\`\`python
employees = {
    "emp001": {"name": "Alice", "dept": "Engineering"},
    "emp002": {"name": "Bob", "dept": "Marketing"}
}

print(employees["emp001"]["name"])  # "Alice"
\`\`\`

## When to Use Dictionaries

- Storing related properties of a single entity
- Looking up values by a meaningful key (not just position)
- Counting occurrences of items
- Caching/memoization
`,
    starterCode: `# Create a student record as a dictionary
student = {
    "name": "Alice",
    "grade": "A",
    "score": 95,
    "subjects": ["Math", "Science"]
}

# Access values
print(f"Name: {student['name']}")
print(f"Score: {student['score']}")

# Safe access with .get()
print(f"Age: {student.get('age', 'Not specified')}")
`,
    examples: [
      {
        title: "Dictionary Basics",
        explanation: "Creating and accessing dictionary values",
        code: `product = {
    "name": "Laptop",
    "price": 999.99,
    "in_stock": True,
    "ratings": [4.5, 5.0, 4.8]
}

print(f"Product: {product['name']}")
print(f"Price: \${product['price']}")
print(f"Avg Rating: {sum(product['ratings'])/len(product['ratings']):.1f}")`,
      },
      {
        title: "Iterating Over Dictionaries",
        explanation: "Different ways to loop through dict contents",
        code: `scores = {"Alice": 95, "Bob": 87, "Carol": 92}

# Loop through keys
print("Students:")
for name in scores:
    print(f"  {name}")

# Loop through key-value pairs
print("\\nScores:")
for name, score in scores.items():
    print(f"  {name}: {score}")`,
      },
      {
        title: "Nested Dictionary Access",
        explanation: "Working with dictionaries inside dictionaries",
        code: `company = {
    "name": "TechCorp",
    "departments": {
        "engineering": {"head": "Alice", "size": 50},
        "marketing": {"head": "Bob", "size": 20}
    }
}

eng = company["departments"]["engineering"]
print(f"Engineering head: {eng['head']}")
print(f"Engineering size: {eng['size']}")`,
      },
    ],
    challenges: [
      {
        id: "m1l3c1",
        prompt: "Create a dictionary called 'book' with keys 'title', 'author', and 'year'. Set values to your favorite book. Print each value.",
        hint: "Use curly braces {} with key: value pairs",
        validateFn: `return output.split("\\n").length >= 3`,
        solution: `book = {
    "title": "The Pragmatic Programmer",
    "author": "David Thomas",
    "year": 2019
}
print(f"Title: {book['title']}")
print(f"Author: {book['author']}")
print(f"Year: {book['year']}")`,
      },
      {
        id: "m1l3c2",
        prompt: "Given grades = {'Alice': 95, 'Bob': 82, 'Carol': 91}, print the average of all grades.",
        hint: "Use .values() to get the numbers, then sum and divide",
        validateFn: `return output.includes("89.3") || output.includes("89")`,
        solution: `grades = {'Alice': 95, 'Bob': 82, 'Carol': 91}
values = list(grades.values())
average = sum(values) / len(values)
print(f"Average grade: {average:.1f}")`,
      },
    ],
    projectChallenge: {
      threadId: "permits",
      threadTitle: "SF Permits Analysis",
      taskTitle: "Build Permit Status Lookup",
      context: "Create a quick lookup dictionary that maps permit numbers to their current status. This will power the status check feature in the permit tracking app.",
      starterCode: `import pandas as pd
import io

permits_csv = """Permit Number|Permit Type|Street Number|Street Name|Status|Filed Date|Issued Date|Neighborhood|Existing Use|Proposed Use
BP2023-0001|alterations|450|Market St|issued|2023-01-15|2023-02-10|Financial District|office|office
BP2023-0002|new construction|1200|Mission St|complete|2023-01-18|2023-02-28|SoMa|vacant lot|apartments
BP2023-0003|additions|2847|24th St|issued|2023-01-22|2023-03-05|Mission|1 family dwelling|1 family dwelling
BP2023-0004|alterations|555|California St|cancelled|2023-01-25||Nob Hill|office|office
BP2023-0005|demolition|890|Folsom St|complete|2023-02-01|2023-02-15|SoMa|warehouse|vacant lot
BP2023-0006|new construction|3200|16th St|issued|2023-02-05|2023-04-01|Mission|parking lot|retail
BP2023-0007|alterations|100|Van Ness Ave|withdrawn|2023-02-10||Civic Center|retail|restaurant
BP2023-0008|sign erection|1800|Haight St|complete|2023-02-12|2023-02-20|Haight-Ashbury|retail|retail
BP2023-0009|additions|4521|Judah St|issued|2023-02-15|2023-04-10|Sunset|1 family dwelling|2 family dwelling
BP2023-0010|alterations|601|Montgomery St|issued|2023-02-18|2023-03-25|Financial District|office|office
BP2023-0011|new construction|2100|Folsom St|expired|2023-02-20|2023-03-30|Mission|vacant lot|apartments
BP2023-0012|alterations|789|Brannan St|complete|2023-02-22|2023-04-05|SoMa|warehouse|office
BP2023-0013|demolition|1550|Howard St|complete|2023-02-25|2023-03-10|SoMa|industrial|vacant lot
BP2023-0014|additions|3845|Noriega St|issued|2023-03-01|2023-05-01|Sunset|1 family dwelling|1 family dwelling
BP2023-0015|new construction|425|Mission St|issued|2023-03-05|2023-06-15|Financial District|parking lot|office tower"""

permits = pd.read_csv(io.StringIO(permits_csv), sep='|')

# TODO: Create a dictionary mapping permit numbers to their status
# Example output: {"BP2023-0001": "issued", "BP2023-0002": "complete", ...}
# Then print the status of permit BP2023-0004
`,
      solution: `import pandas as pd
import io

permits_csv = """Permit Number|Permit Type|Street Number|Street Name|Status|Filed Date|Issued Date|Neighborhood|Existing Use|Proposed Use
BP2023-0001|alterations|450|Market St|issued|2023-01-15|2023-02-10|Financial District|office|office
BP2023-0002|new construction|1200|Mission St|complete|2023-01-18|2023-02-28|SoMa|vacant lot|apartments
BP2023-0003|additions|2847|24th St|issued|2023-01-22|2023-03-05|Mission|1 family dwelling|1 family dwelling
BP2023-0004|alterations|555|California St|cancelled|2023-01-25||Nob Hill|office|office
BP2023-0005|demolition|890|Folsom St|complete|2023-02-01|2023-02-15|SoMa|warehouse|vacant lot
BP2023-0006|new construction|3200|16th St|issued|2023-02-05|2023-04-01|Mission|parking lot|retail
BP2023-0007|alterations|100|Van Ness Ave|withdrawn|2023-02-10||Civic Center|retail|restaurant
BP2023-0008|sign erection|1800|Haight St|complete|2023-02-12|2023-02-20|Haight-Ashbury|retail|retail
BP2023-0009|additions|4521|Judah St|issued|2023-02-15|2023-04-10|Sunset|1 family dwelling|2 family dwelling
BP2023-0010|alterations|601|Montgomery St|issued|2023-02-18|2023-03-25|Financial District|office|office
BP2023-0011|new construction|2100|Folsom St|expired|2023-02-20|2023-03-30|Mission|vacant lot|apartments
BP2023-0012|alterations|789|Brannan St|complete|2023-02-22|2023-04-05|SoMa|warehouse|office
BP2023-0013|demolition|1550|Howard St|complete|2023-02-25|2023-03-10|SoMa|industrial|vacant lot
BP2023-0014|additions|3845|Noriega St|issued|2023-03-01|2023-05-01|Sunset|1 family dwelling|1 family dwelling
BP2023-0015|new construction|425|Mission St|issued|2023-03-05|2023-06-15|Financial District|parking lot|office tower"""

permits = pd.read_csv(io.StringIO(permits_csv), sep='|')

status_lookup = {}
for i, row in permits.iterrows():
    status_lookup[row["Permit Number"]] = row["Status"]

print(f"Status of BP2023-0004: {status_lookup['BP2023-0004']}")`,
      validateFn: `return output.includes("BP2023-0004") && output.includes("cancelled")`,
      hint: "Loop through the DataFrame rows using iterrows() and add each permit number and status to a dictionary.",
      xpReward: 50,
    },
  },
  {
    module: "Python Basics",
    moduleSlug: "python-basics",
    lessonNumber: 4,
    slug: "loops-conditionals",
    title: "Loops & Conditionals",
    badge: "practice",
    theory: `
## If/Elif/Else: Making Decisions

The \`if\` statement runs code only when a condition is True:

\`\`\`python
score = 85

if score >= 90:
    grade = "A"
elif score >= 80:
    grade = "B"
elif score >= 70:
    grade = "C"
else:
    grade = "F"
\`\`\`

Python checks conditions from top to bottom. Once one is True, it skips the rest.

## Comparison Operators

| Operator | Meaning |
|----------|---------|
| \`==\` | Equal to |
| \`!=\` | Not equal to |
| \`<\`, \`>\` | Less than, Greater than |
| \`<=\`, \`>=\` | Less/greater than or equal |
| \`in\` | Membership test |

## For Loops: Iterating Over Collections

\`\`\`python
fruits = ["apple", "banana", "cherry"]
for fruit in fruits:
    print(fruit)
\`\`\`

## range(): Generating Number Sequences

\`\`\`python
for i in range(5):       # 0, 1, 2, 3, 4
    print(i)

for i in range(2, 6):    # 2, 3, 4, 5
    print(i)

for i in range(0, 10, 2): # 0, 2, 4, 6, 8
    print(i)
\`\`\`

## enumerate(): Index + Value

When you need both the position and the value:

\`\`\`python
fruits = ["apple", "banana", "cherry"]
for i, fruit in enumerate(fruits):
    print(f"{i}: {fruit}")
# 0: apple
# 1: banana
# 2: cherry
\`\`\`

## While Loops: Repeat Until Condition Changes

\`\`\`python
count = 0
while count < 5:
    print(count)
    count += 1
\`\`\`

Use \`for\` when you know how many iterations. Use \`while\` when you're waiting for a condition.
`,
    starterCode: `# Practice with loops and conditionals
scores = [95, 82, 91, 74, 88]

# Loop through and assign letter grades
for score in scores:
    if score >= 90:
        grade = "A"
    elif score >= 80:
        grade = "B"
    elif score >= 70:
        grade = "C"
    else:
        grade = "F"
    print(f"Score {score} = Grade {grade}")
`,
    examples: [
      {
        title: "Counting with Conditions",
        explanation: "Loop through and count items meeting criteria",
        code: `numbers = [12, 45, 7, 23, 56, 89, 34]

# Count how many are greater than 30
count = 0
for num in numbers:
    if num > 30:
        count += 1

print(f"Numbers > 30: {count}")`,
      },
      {
        title: "Using enumerate",
        explanation: "Track position and value together",
        code: `names = ["Alice", "Bob", "Carol", "Dave"]

print("Student roster:")
for position, name in enumerate(names, start=1):
    print(f"  {position}. {name}")`,
      },
      {
        title: "Building Results with Loops",
        explanation: "Create new lists based on conditions",
        code: `prices = [10.99, 25.50, 5.99, 42.00, 15.75]

# Find all prices under $20
affordable = []
for price in prices:
    if price < 20:
        affordable.append(price)

print(f"Affordable items: {affordable}")
print(f"Count: {len(affordable)}")`,
      },
    ],
    challenges: [
      {
        id: "m1l4c1",
        prompt: "Loop through numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] and print only the even numbers.",
        hint: "Use num % 2 == 0 to check if a number is even",
        validateFn: `return output.includes("2") && output.includes("4") && output.includes("6") && output.includes("8") && output.includes("10") && !output.includes("1\\n") && !output.includes("3\\n")`,
        solution: `numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
for num in numbers:
    if num % 2 == 0:
        print(num)`,
      },
      {
        id: "m1l4c2",
        prompt: "Use enumerate to print each name in names = ['Alice', 'Bob', 'Carol'] with their 1-based position like '1. Alice'",
        hint: "enumerate(names, start=1) gives you 1-based indexing",
        validateFn: `return output.includes("1.") && output.includes("Alice") && output.includes("2.") && output.includes("Bob") && output.includes("3.") && output.includes("Carol")`,
        solution: `names = ['Alice', 'Bob', 'Carol']
for i, name in enumerate(names, start=1):
    print(f"{i}. {name}")`,
      },
    ],
    projectChallenge: {
      threadId: "permits",
      threadTitle: "SF Permits Analysis",
      taskTitle: "Count Permit Statuses",
      context: "The planning department needs a quick count of active vs completed permits. Count how many permits are 'issued' versus 'complete' to generate a status report.",
      starterCode: `import pandas as pd
import io

permits_csv = """Permit Number|Permit Type|Street Number|Street Name|Status|Filed Date|Issued Date|Neighborhood|Existing Use|Proposed Use
BP2023-0001|alterations|450|Market St|issued|2023-01-15|2023-02-10|Financial District|office|office
BP2023-0002|new construction|1200|Mission St|complete|2023-01-18|2023-02-28|SoMa|vacant lot|apartments
BP2023-0003|additions|2847|24th St|issued|2023-01-22|2023-03-05|Mission|1 family dwelling|1 family dwelling
BP2023-0004|alterations|555|California St|cancelled|2023-01-25||Nob Hill|office|office
BP2023-0005|demolition|890|Folsom St|complete|2023-02-01|2023-02-15|SoMa|warehouse|vacant lot
BP2023-0006|new construction|3200|16th St|issued|2023-02-05|2023-04-01|Mission|parking lot|retail
BP2023-0007|alterations|100|Van Ness Ave|withdrawn|2023-02-10||Civic Center|retail|restaurant
BP2023-0008|sign erection|1800|Haight St|complete|2023-02-12|2023-02-20|Haight-Ashbury|retail|retail
BP2023-0009|additions|4521|Judah St|issued|2023-02-15|2023-04-10|Sunset|1 family dwelling|2 family dwelling
BP2023-0010|alterations|601|Montgomery St|issued|2023-02-18|2023-03-25|Financial District|office|office
BP2023-0011|new construction|2100|Folsom St|expired|2023-02-20|2023-03-30|Mission|vacant lot|apartments
BP2023-0012|alterations|789|Brannan St|complete|2023-02-22|2023-04-05|SoMa|warehouse|office
BP2023-0013|demolition|1550|Howard St|complete|2023-02-25|2023-03-10|SoMa|industrial|vacant lot
BP2023-0014|additions|3845|Noriega St|issued|2023-03-01|2023-05-01|Sunset|1 family dwelling|1 family dwelling
BP2023-0015|new construction|425|Mission St|issued|2023-03-05|2023-06-15|Financial District|parking lot|office tower"""

permits = pd.read_csv(io.StringIO(permits_csv), sep='|')

# TODO: Count how many permits have status "issued" vs "complete"
# Loop through the permits and count each status type
`,
      solution: `import pandas as pd
import io

permits_csv = """Permit Number|Permit Type|Street Number|Street Name|Status|Filed Date|Issued Date|Neighborhood|Existing Use|Proposed Use
BP2023-0001|alterations|450|Market St|issued|2023-01-15|2023-02-10|Financial District|office|office
BP2023-0002|new construction|1200|Mission St|complete|2023-01-18|2023-02-28|SoMa|vacant lot|apartments
BP2023-0003|additions|2847|24th St|issued|2023-01-22|2023-03-05|Mission|1 family dwelling|1 family dwelling
BP2023-0004|alterations|555|California St|cancelled|2023-01-25||Nob Hill|office|office
BP2023-0005|demolition|890|Folsom St|complete|2023-02-01|2023-02-15|SoMa|warehouse|vacant lot
BP2023-0006|new construction|3200|16th St|issued|2023-02-05|2023-04-01|Mission|parking lot|retail
BP2023-0007|alterations|100|Van Ness Ave|withdrawn|2023-02-10||Civic Center|retail|restaurant
BP2023-0008|sign erection|1800|Haight St|complete|2023-02-12|2023-02-20|Haight-Ashbury|retail|retail
BP2023-0009|additions|4521|Judah St|issued|2023-02-15|2023-04-10|Sunset|1 family dwelling|2 family dwelling
BP2023-0010|alterations|601|Montgomery St|issued|2023-02-18|2023-03-25|Financial District|office|office
BP2023-0011|new construction|2100|Folsom St|expired|2023-02-20|2023-03-30|Mission|vacant lot|apartments
BP2023-0012|alterations|789|Brannan St|complete|2023-02-22|2023-04-05|SoMa|warehouse|office
BP2023-0013|demolition|1550|Howard St|complete|2023-02-25|2023-03-10|SoMa|industrial|vacant lot
BP2023-0014|additions|3845|Noriega St|issued|2023-03-01|2023-05-01|Sunset|1 family dwelling|1 family dwelling
BP2023-0015|new construction|425|Mission St|issued|2023-03-05|2023-06-15|Financial District|parking lot|office tower"""

permits = pd.read_csv(io.StringIO(permits_csv), sep='|')

issued_count = 0
complete_count = 0

for i, row in permits.iterrows():
    if row["Status"] == "issued":
        issued_count += 1
    elif row["Status"] == "complete":
        complete_count += 1

print(f"Issued permits: {issued_count}")
print(f"Complete permits: {complete_count}")`,
      validateFn: `return output.includes("Issued") && output.includes("7") && output.includes("Complete") && output.includes("5")`,
      hint: "Initialize two counter variables, then loop through permits checking if each status equals 'issued' or 'complete'.",
      xpReward: 50,
    },
  },
  {
    module: "Python Basics",
    moduleSlug: "python-basics",
    lessonNumber: 5,
    slug: "functions-comprehensions",
    title: "Functions & Comprehensions",
    badge: "practice",
    theory: `
## Functions: Reusable Code Blocks

Functions let you write code once and use it many times:

\`\`\`python
def greet(name):
    return f"Hello, {name}!"

message = greet("Alice")
print(message)  # "Hello, Alice!"
\`\`\`

## Parameters & Return Values

\`\`\`python
def calculate_total(price, quantity, tax_rate=0.08):
    subtotal = price * quantity
    tax = subtotal * tax_rate
    return subtotal + tax

# Using default tax_rate
total1 = calculate_total(10, 5)

# Overriding tax_rate
total2 = calculate_total(10, 5, tax_rate=0.10)
\`\`\`

## List Comprehensions: One-Line List Building

Instead of:
\`\`\`python
squares = []
for x in range(5):
    squares.append(x ** 2)
\`\`\`

Write:
\`\`\`python
squares = [x ** 2 for x in range(5)]
\`\`\`

## Comprehension with Condition

\`\`\`python
# Only even numbers
evens = [x for x in range(10) if x % 2 == 0]
# [0, 2, 4, 6, 8]

# Transform and filter
scores = [95, 72, 88, 65, 91]
passing = [s for s in scores if s >= 70]
# [95, 72, 88, 91]
\`\`\`

## Dictionary Comprehensions

\`\`\`python
# Create dict from two lists
names = ["Alice", "Bob", "Carol"]
scores = [95, 82, 91]
grade_book = {name: score for name, score in zip(names, scores)}
# {"Alice": 95, "Bob": 82, "Carol": 91}

# Transform existing dict
prices = {"apple": 1.0, "banana": 0.5}
doubled = {k: v * 2 for k, v in prices.items()}
# {"apple": 2.0, "banana": 1.0}
\`\`\`

## When to Use What

- **Functions**: When you'll use the same logic multiple times, or when logic is complex enough to deserve a name
- **List comprehensions**: When transforming or filtering a collection into a new list
- **Dict comprehensions**: When building dictionaries from other data
`,
    starterCode: `# Define a function to calculate letter grade
def get_grade(score):
    if score >= 90:
        return "A"
    elif score >= 80:
        return "B"
    elif score >= 70:
        return "C"
    else:
        return "F"

# Test it
scores = [95, 82, 74, 88, 91]
for score in scores:
    print(f"{score} -> {get_grade(score)}")

# List comprehension to get all passing grades
passing = [s for s in scores if s >= 70]
print(f"Passing scores: {passing}")
`,
    examples: [
      {
        title: "Function with Default Parameter",
        explanation: "Parameters can have default values",
        code: `def format_price(amount, currency="$", decimals=2):
    return f"{currency}{amount:.{decimals}f}"

print(format_price(19.99))
print(format_price(19.99, currency="€"))
print(format_price(19.99, decimals=0))`,
      },
      {
        title: "List Comprehension Examples",
        explanation: "Various patterns for list comprehensions",
        code: `numbers = [1, 2, 3, 4, 5]

# Square each number
squares = [n ** 2 for n in numbers]
print(f"Squares: {squares}")

# Double only evens
doubled_evens = [n * 2 for n in numbers if n % 2 == 0]
print(f"Doubled evens: {doubled_evens}")

# Transform strings
names = ["alice", "bob", "carol"]
upper_names = [name.upper() for name in names]
print(f"Uppercase: {upper_names}")`,
      },
      {
        title: "Dictionary Comprehension",
        explanation: "Build dictionaries with comprehension syntax",
        code: `# Word lengths
words = ["apple", "banana", "cherry"]
lengths = {word: len(word) for word in words}
print(f"Lengths: {lengths}")

# Filter a dictionary
scores = {"Alice": 95, "Bob": 65, "Carol": 88}
passing = {k: v for k, v in scores.items() if v >= 70}
print(f"Passing: {passing}")`,
      },
    ],
    challenges: [
      {
        id: "m1l5c1",
        prompt: "Write a function called 'double' that takes a number and returns it multiplied by 2. Test it with print(double(5)).",
        hint: "def double(n): return n * 2",
        validateFn: `return output.includes("10")`,
        solution: `def double(n):
    return n * 2

print(double(5))`,
      },
      {
        id: "m1l5c2",
        prompt: "Use a list comprehension to create 'squares' containing the squares of [1, 2, 3, 4, 5]. Print the result.",
        hint: "[x ** 2 for x in list]",
        validateFn: `return output.includes("[1, 4, 9, 16, 25]")`,
        solution: `numbers = [1, 2, 3, 4, 5]
squares = [x ** 2 for x in numbers]
print(squares)`,
      },
    ],
    projectChallenge: {
      threadId: "permits",
      threadTitle: "SF Permits Analysis",
      taskTitle: "Filter Permits by Status",
      context: "Build a reusable function to filter permits by any status. The dashboard will call this function to show different views like 'active permits' or 'cancelled permits'.",
      starterCode: `import pandas as pd
import io

permits_csv = """Permit Number|Permit Type|Street Number|Street Name|Status|Filed Date|Issued Date|Neighborhood|Existing Use|Proposed Use
BP2023-0001|alterations|450|Market St|issued|2023-01-15|2023-02-10|Financial District|office|office
BP2023-0002|new construction|1200|Mission St|complete|2023-01-18|2023-02-28|SoMa|vacant lot|apartments
BP2023-0003|additions|2847|24th St|issued|2023-01-22|2023-03-05|Mission|1 family dwelling|1 family dwelling
BP2023-0004|alterations|555|California St|cancelled|2023-01-25||Nob Hill|office|office
BP2023-0005|demolition|890|Folsom St|complete|2023-02-01|2023-02-15|SoMa|warehouse|vacant lot
BP2023-0006|new construction|3200|16th St|issued|2023-02-05|2023-04-01|Mission|parking lot|retail
BP2023-0007|alterations|100|Van Ness Ave|withdrawn|2023-02-10||Civic Center|retail|restaurant
BP2023-0008|sign erection|1800|Haight St|complete|2023-02-12|2023-02-20|Haight-Ashbury|retail|retail
BP2023-0009|additions|4521|Judah St|issued|2023-02-15|2023-04-10|Sunset|1 family dwelling|2 family dwelling
BP2023-0010|alterations|601|Montgomery St|issued|2023-02-18|2023-03-25|Financial District|office|office
BP2023-0011|new construction|2100|Folsom St|expired|2023-02-20|2023-03-30|Mission|vacant lot|apartments
BP2023-0012|alterations|789|Brannan St|complete|2023-02-22|2023-04-05|SoMa|warehouse|office
BP2023-0013|demolition|1550|Howard St|complete|2023-02-25|2023-03-10|SoMa|industrial|vacant lot
BP2023-0014|additions|3845|Noriega St|issued|2023-03-01|2023-05-01|Sunset|1 family dwelling|1 family dwelling
BP2023-0015|new construction|425|Mission St|issued|2023-03-05|2023-06-15|Financial District|parking lot|office tower"""

permits = pd.read_csv(io.StringIO(permits_csv), sep='|')

# TODO: Write a function called filter_by_status that takes a status string
# and returns a list of permit numbers with that status
# Then test it by printing all "complete" permits
`,
      solution: `import pandas as pd
import io

permits_csv = """Permit Number|Permit Type|Street Number|Street Name|Status|Filed Date|Issued Date|Neighborhood|Existing Use|Proposed Use
BP2023-0001|alterations|450|Market St|issued|2023-01-15|2023-02-10|Financial District|office|office
BP2023-0002|new construction|1200|Mission St|complete|2023-01-18|2023-02-28|SoMa|vacant lot|apartments
BP2023-0003|additions|2847|24th St|issued|2023-01-22|2023-03-05|Mission|1 family dwelling|1 family dwelling
BP2023-0004|alterations|555|California St|cancelled|2023-01-25||Nob Hill|office|office
BP2023-0005|demolition|890|Folsom St|complete|2023-02-01|2023-02-15|SoMa|warehouse|vacant lot
BP2023-0006|new construction|3200|16th St|issued|2023-02-05|2023-04-01|Mission|parking lot|retail
BP2023-0007|alterations|100|Van Ness Ave|withdrawn|2023-02-10||Civic Center|retail|restaurant
BP2023-0008|sign erection|1800|Haight St|complete|2023-02-12|2023-02-20|Haight-Ashbury|retail|retail
BP2023-0009|additions|4521|Judah St|issued|2023-02-15|2023-04-10|Sunset|1 family dwelling|2 family dwelling
BP2023-0010|alterations|601|Montgomery St|issued|2023-02-18|2023-03-25|Financial District|office|office
BP2023-0011|new construction|2100|Folsom St|expired|2023-02-20|2023-03-30|Mission|vacant lot|apartments
BP2023-0012|alterations|789|Brannan St|complete|2023-02-22|2023-04-05|SoMa|warehouse|office
BP2023-0013|demolition|1550|Howard St|complete|2023-02-25|2023-03-10|SoMa|industrial|vacant lot
BP2023-0014|additions|3845|Noriega St|issued|2023-03-01|2023-05-01|Sunset|1 family dwelling|1 family dwelling
BP2023-0015|new construction|425|Mission St|issued|2023-03-05|2023-06-15|Financial District|parking lot|office tower"""

permits = pd.read_csv(io.StringIO(permits_csv), sep='|')

def filter_by_status(status):
    return [row["Permit Number"] for i, row in permits.iterrows() if row["Status"] == status]

complete_permits = filter_by_status("complete")
print(f"Complete permits: {complete_permits}")`,
      validateFn: `return output.includes("BP2023-0002") && output.includes("BP2023-0005") && output.includes("BP2023-0008") && output.includes("BP2023-0012") && output.includes("BP2023-0013")`,
      hint: "Define a function with 'def filter_by_status(status):' and use a list comprehension to filter rows where row['Status'] matches the status parameter.",
      xpReward: 50,
    },
  },
];
