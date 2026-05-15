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
Variables hold values. Python figures out the type:

\`\`\`python
name = "Alice"
age = 25
price = 19.99
is_active = True
\`\`\`

F-strings embed expressions inside strings. Prefix with \`f\`, put expressions in \`{}\`:

\`\`\`python
print(f"hi {name}, you are {age} years old")
print(f"total: \${price * 3:.2f}")  # math works inside braces
\`\`\`

\`:.2f\` is a format spec. A few you'll reach for constantly:

- \`:.2f\` two decimals (\`3.14159\` becomes \`3.14\`)
- \`:,\` thousands separator (\`1000000\` becomes \`1,000,000\`)
- \`:.0%\` percent (\`0.85\` becomes \`85%\`)
- \`:>10\` right-align inside 10 chars
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
A list is an ordered, mutable collection. Square brackets:

\`\`\`python
fruits = ["apple", "banana", "cherry"]
numbers = [1, 2, 3, 4, 5]
mixed = ["hello", 42, True, 3.14]
\`\`\`

Index from 0. Negative indexes count from the end:

\`\`\`python
fruits[0]    # "apple"
fruits[-1]   # "cherry"
fruits[-2]   # "banana"
\`\`\`

Slice with \`[start:end:step]\`. End is exclusive:

\`\`\`python
numbers = [0, 1, 2, 3, 4, 5]
numbers[1:4]   # [1, 2, 3]
numbers[:3]    # [0, 1, 2]
numbers[3:]    # [3, 4, 5]
numbers[::2]   # [0, 2, 4]
\`\`\`

Mutating:

\`\`\`python
fruits.append("date")
fruits.insert(1, "orange")
fruits.remove("banana")
popped = fruits.pop()
\`\`\`

Tuples are lists you can't change. Parens. Use them for coordinate-like data or database row tuples:

\`\`\`python
coordinates = (10, 20)
rgb = (255, 128, 0)
# coordinates[0] = 5  # TypeError
\`\`\`

Built-ins that work on both: \`len()\`, \`sum()\`, \`min()\`, \`max()\`, \`sorted()\`.
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
A dict is a hashmap. Keys to values:

\`\`\`python
person = {"name": "Alice", "age": 30, "city": "Boston"}
\`\`\`

Access with brackets or \`.get()\`. The first raises \`KeyError\` on missing keys; \`.get()\` returns \`None\` or a default:

\`\`\`python
person["name"]               # "Alice"
person.get("job")            # None
person.get("job", "unknown") # "unknown"
\`\`\`

Add, modify, delete:

\`\`\`python
person["job"] = "engineer"
person["age"] = 31
del person["city"]
\`\`\`

Useful methods: \`.keys()\`, \`.values()\`, \`.items()\` (iterates pairs).

Nest freely:

\`\`\`python
employees = {
    "emp001": {"name": "Alice", "dept": "Engineering"},
    "emp002": {"name": "Bob", "dept": "Marketing"},
}
employees["emp001"]["name"]  # "Alice"
\`\`\`

Reach for a dict whenever you'd describe the relationship as "look this up by name" — counting occurrences, caching results, indexing rows by id.
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
\`if/elif/else\` evaluates top to bottom and stops at the first match:

\`\`\`python
if score >= 90: grade = "A"
elif score >= 80: grade = "B"
elif score >= 70: grade = "C"
else: grade = "F"
\`\`\`

Comparison operators you'll use: \`==\`, \`!=\`, \`<\`, \`>\`, \`<=\`, \`>=\`, and \`in\` for membership (\`"apple" in fruits\`).

\`for\` iterates anything iterable:

\`\`\`python
for fruit in fruits:
    print(fruit)
\`\`\`

\`range()\` makes integer sequences — \`range(5)\` is 0..4, \`range(2, 6)\` is 2..5, \`range(0, 10, 2)\` steps by 2.

\`enumerate()\` when you need the index alongside the value:

\`\`\`python
for i, fruit in enumerate(fruits):
    print(f"{i}: {fruit}")
\`\`\`

\`while\` for "keep going until":

\`\`\`python
count = 0
while count < 5:
    print(count)
    count += 1
\`\`\`

Rule of thumb: \`for\` when the iteration count is knowable up front, \`while\` when it depends on runtime state.
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
Functions are reusable blocks. \`def\`, then params, return value:

\`\`\`python
def greet(name):
    return f"hi {name}"

greet("Alice")  # "hi Alice"
\`\`\`

Defaults turn params optional. Pass by keyword to skip ahead:

\`\`\`python
def total(price, qty, tax_rate=0.08):
    subtotal = price * qty
    return subtotal + subtotal * tax_rate

total(10, 5)                  # uses default
total(10, 5, tax_rate=0.10)   # override
\`\`\`

List comprehensions replace the for/append loop. These two do the same thing, but the second one is what experienced Python looks like:

\`\`\`python
squares = []
for x in range(5):
    squares.append(x ** 2)

squares = [x ** 2 for x in range(5)]
\`\`\`

Add a condition to filter:

\`\`\`python
evens = [x for x in range(10) if x % 2 == 0]
passing = [s for s in scores if s >= 70]
\`\`\`

Dict comprehensions work the same way:

\`\`\`python
grade_book = {name: score for name, score in zip(names, scores)}
doubled = {k: v * 2 for k, v in prices.items()}
\`\`\`
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
