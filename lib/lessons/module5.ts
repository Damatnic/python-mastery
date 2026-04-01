import type { Lesson } from "../types";

export const lessonsModule5: Lesson[] = [
  {
    module: "String & File Ops",
    moduleSlug: "string-file-ops",
    lessonNumber: 21,
    slug: "string-methods-deep",
    title: "String Methods Deep Dive",
    badge: "practice",
    theory: `
## Essential String Methods

\`\`\`python
text = "  Hello, World!  "

text.strip()       # "Hello, World!" - remove whitespace
text.lower()       # "  hello, world!  "
text.upper()       # "  HELLO, WORLD!  "
text.title()       # "  Hello, World!  "

text.replace("World", "Python")  # "  Hello, Python!  "
text.split(",")    # ["  Hello", " World!  "]
"-".join(["a", "b", "c"])  # "a-b-c"
\`\`\`

## Checking String Content

\`\`\`python
"hello".startswith("he")   # True
"hello".endswith("lo")     # True
"hello".isalpha()          # True (only letters)
"123".isdigit()            # True (only digits)
"hello123".isalnum()       # True (letters + digits)
"hello" in "hello world"   # True (substring check)
\`\`\`

## Formatting and Padding

\`\`\`python
"42".zfill(5)              # "00042" - pad with zeros
"hi".ljust(10)             # "hi        " - left justify
"hi".rjust(10)             # "        hi" - right justify
"hi".center(10)            # "    hi    " - center

# Format method
"{} is {}".format("Python", "fun")
"{name} is {age}".format(name="Alice", age=25)
\`\`\`

## Slicing Strings

\`\`\`python
text = "Python"
text[0]      # "P" - first character
text[-1]     # "n" - last character
text[0:3]    # "Pyt" - first 3
text[3:]     # "hon" - from index 3 to end
text[::-1]   # "nohtyP" - reversed
\`\`\`

## Finding and Counting

\`\`\`python
"hello world".find("world")   # 6 (index where found)
"hello world".find("xyz")     # -1 (not found)
"hello world".count("l")      # 3 (occurrences)
"hello world".index("world")  # 6 (like find, but errors if not found)
\`\`\`
`,
    starterCode: `# Practice string methods
text = "  Hello, Python World!  "

# Clean and transform
cleaned = text.strip()
print(f"Stripped: '{cleaned}'")

# Split into words
words = cleaned.split()
print(f"Words: {words}")

# Join with different separator
rejoined = " | ".join(words)
print(f"Rejoined: {rejoined}")
`,
    examples: [
      {
        title: "Cleaning User Input",
        explanation: "Common pattern for processing user data",
        code: `user_input = "  john.doe@email.com  "

# Clean and normalize
email = user_input.strip().lower()
print(f"Cleaned email: {email}")

# Extract username
username = email.split("@")[0]
print(f"Username: {username}")

# Check if valid format
is_valid = "@" in email and "." in email
print(f"Valid format: {is_valid}")`,
      },
      {
        title: "Formatting Numbers",
        explanation: "Pad and format numeric strings",
        code: `# Order numbers
order_id = "42"
formatted = order_id.zfill(8)
print(f"Order ID: {formatted}")

# Format currency
amount = 1234.56
formatted = f"\${amount:,.2f}"
print(f"Amount: {formatted}")

# Percentage
rate = 0.156
print(f"Rate: {rate:.1%}")`,
      },
      {
        title: "Search and Replace",
        explanation: "Find and modify text content",
        code: `log_line = "ERROR: Connection failed at 14:32:01"

# Check type
is_error = log_line.startswith("ERROR")
print(f"Is error: {is_error}")

# Extract time (last part after space)
time = log_line.split()[-1]
print(f"Time: {time}")

# Count words
word_count = len(log_line.split())
print(f"Word count: {word_count}")`,
      },
    ],
    challenges: [
      {
        id: "m5l1c1",
        prompt: "Given phone = '  (555) 123-4567  ', extract just the digits and print them.",
        hint: "Use replace() multiple times or join/filter with isdigit()",
        validateFn: `return output.includes("5551234567")`,
        solution: `phone = "  (555) 123-4567  "
digits = "".join(c for c in phone if c.isdigit())
print(digits)`,
      },
      {
        id: "m5l1c2",
        prompt: "Split 'apple,banana,cherry' by comma and join with ' - ' between each. Print the result.",
        hint: "split(',') then ' - '.join(list)",
        validateFn: `return output.includes("apple - banana - cherry")`,
        solution: `text = "apple,banana,cherry"
fruits = text.split(",")
result = " - ".join(fruits)
print(result)`,
      },
    ],
    projectChallenge: {
      threadId: "sales",
      threadTitle: "Sales Performance Dashboard",
      taskTitle: "Clean Sales Rep Names",
      context: "The sales data has inconsistent SalesRep name formatting. Some names have extra spaces or inconsistent capitalization. Clean the names to ensure proper formatting for the dashboard display.",
      starterCode: `import pandas as pd
import io

sales_csv = """SaleID,SalesRep,Region,Product,Category,Quantity,UnitPrice,SaleDate,CustomerSegment
S001,Alice Chen,North,Widget Pro,Electronics,15,49.99,2023-01-05,Enterprise
S002,Bob Martinez,South,Gadget Plus,Tools,8,29.99,2023-01-08,SMB
S003,Carol Davis,East,Widget Pro,Electronics,22,49.99,2023-01-10,Enterprise
S004,Dan Wilson,West,Super Tool,Tools,45,19.99,2023-01-12,Consumer
S005,Eva Brown,North,Power Unit,Electronics,10,89.99,2023-01-15,Enterprise
S006,Alice Chen,North,Gadget Plus,Tools,30,29.99,2023-01-18,SMB
S007,Bob Martinez,South,Widget Pro,Electronics,18,49.99,2023-01-20,Consumer
S008,Carol Davis,East,Super Tool,Tools,55,19.99,2023-02-01,SMB
S009,Dan Wilson,West,Power Unit,Electronics,8,89.99,2023-02-05,Enterprise
S010,Eva Brown,North,Widget Basic,Electronics,65,24.99,2023-02-10,Consumer
S011,Alice Chen,North,Super Tool,Tools,40,19.99,2023-02-15,Consumer
S012,Bob Martinez,South,Power Unit,Electronics,12,89.99,2023-02-20,Enterprise
S013,Carol Davis,East,Gadget Plus,Tools,25,29.99,2023-03-01,SMB
S014,Dan Wilson,West,Widget Pro,Electronics,20,49.99,2023-03-05,Enterprise
S015,Eva Brown,North,Widget Basic,Electronics,80,24.99,2023-03-10,Consumer"""

sales = pd.read_csv(io.StringIO(sales_csv))

# Task: Clean the SalesRep names by:
# 1. Stripping whitespace
# 2. Converting to title case
# 3. Extract just the first name into a new column 'FirstName'
# Print the unique SalesRep names and their first names
`,
      solution: `import pandas as pd
import io

sales_csv = """SaleID,SalesRep,Region,Product,Category,Quantity,UnitPrice,SaleDate,CustomerSegment
S001,Alice Chen,North,Widget Pro,Electronics,15,49.99,2023-01-05,Enterprise
S002,Bob Martinez,South,Gadget Plus,Tools,8,29.99,2023-01-08,SMB
S003,Carol Davis,East,Widget Pro,Electronics,22,49.99,2023-01-10,Enterprise
S004,Dan Wilson,West,Super Tool,Tools,45,19.99,2023-01-12,Consumer
S005,Eva Brown,North,Power Unit,Electronics,10,89.99,2023-01-15,Enterprise
S006,Alice Chen,North,Gadget Plus,Tools,30,29.99,2023-01-18,SMB
S007,Bob Martinez,South,Widget Pro,Electronics,18,49.99,2023-01-20,Consumer
S008,Carol Davis,East,Super Tool,Tools,55,19.99,2023-02-01,SMB
S009,Dan Wilson,West,Power Unit,Electronics,8,89.99,2023-02-05,Enterprise
S010,Eva Brown,North,Widget Basic,Electronics,65,24.99,2023-02-10,Consumer
S011,Alice Chen,North,Super Tool,Tools,40,19.99,2023-02-15,Consumer
S012,Bob Martinez,South,Power Unit,Electronics,12,89.99,2023-02-20,Enterprise
S013,Carol Davis,East,Gadget Plus,Tools,25,29.99,2023-03-01,SMB
S014,Dan Wilson,West,Widget Pro,Electronics,20,49.99,2023-03-05,Enterprise
S015,Eva Brown,North,Widget Basic,Electronics,80,24.99,2023-03-10,Consumer"""

sales = pd.read_csv(io.StringIO(sales_csv))

# Clean SalesRep names
sales["SalesRep"] = sales["SalesRep"].str.strip().str.title()

# Extract first name
sales["FirstName"] = sales["SalesRep"].str.split().str[0]

# Print unique names
print("Unique Sales Reps:")
for rep in sales["SalesRep"].unique():
    print(f"  {rep}")

print("\\nFirst Names:")
print(sales["FirstName"].unique().tolist())`,
      validateFn: `return output.includes("Alice") && output.includes("Bob") && output.includes("FirstName") || output.includes("First Names")`,
      hint: "Use .str.strip().str.title() to clean names, and .str.split().str[0] to extract first names",
      xpReward: 50,
    },
  },
  {
    module: "String & File Ops",
    moduleSlug: "string-file-ops",
    lessonNumber: 22,
    slug: "regex-basics",
    title: "Regex Basics",
    badge: "concept",
    theory: `
## What is Regex?

Regular expressions (regex) are patterns for matching text. They're powerful for finding, extracting, and replacing text.

\`\`\`python
import re

# Find all matches
re.findall(r"\\d+", "Order 123 has 45 items")  # ['123', '45']

# Search for pattern
re.search(r"\\d+", "Order 123")  # Match object or None

# Replace pattern
re.sub(r"\\d+", "X", "Order 123")  # "Order X"
\`\`\`

## Common Patterns

| Pattern | Matches |
|---------|---------|
| \\d | Any digit (0-9) |
| \\w | Word character (a-z, A-Z, 0-9, _) |
| \\s | Whitespace |
| . | Any character (except newline) |
| + | One or more of preceding |
| * | Zero or more of preceding |
| ? | Zero or one of preceding |
| ^ | Start of string |
| $ | End of string |

## Useful Examples

\`\`\`python
# Email pattern (simplified)
r"[\\w.]+@[\\w.]+"

# Phone number
r"\\d{3}-\\d{3}-\\d{4}"

# Date (YYYY-MM-DD)
r"\\d{4}-\\d{2}-\\d{2}"

# Extract between quotes
r'"([^"]*)"'
\`\`\`

## Groups (Extracting Parts)

\`\`\`python
# Parentheses create capture groups
match = re.search(r"(\\d+)-(\\d+)", "Phone: 555-1234")
if match:
    area = match.group(1)   # "555"
    number = match.group(2)  # "1234"
\`\`\`

## Pandas + Regex

\`\`\`python
# Extract with regex
df["digits"] = df["text"].str.extract(r"(\\d+)")

# Replace with regex
df["clean"] = df["text"].str.replace(r"\\d+", "", regex=True)

# Filter rows
df[df["text"].str.contains(r"\\d+", regex=True)]
\`\`\`
`,
    starterCode: `import re

text = "Contact us at support@example.com or sales@company.org"

# Find all email-like patterns
emails = re.findall(r"[\\w.]+@[\\w.]+", text)
print(f"Found emails: {emails}")

# Extract numbers from string
numbers_text = "Order 456 contains 12 items at $29.99 each"
numbers = re.findall(r"\\d+", numbers_text)
print(f"Found numbers: {numbers}")
`,
    examples: [
      {
        title: "Finding Patterns",
        explanation: "Use findall to get all matches",
        code: `import re

text = "Dates: 2024-01-15, 2024-02-20, 2024-03-25"

# Find all dates
dates = re.findall(r"\\d{4}-\\d{2}-\\d{2}", text)
print(f"Found dates: {dates}")

# Find all 4-digit numbers
years = re.findall(r"\\d{4}", text)
print(f"Years: {years}")`,
      },
      {
        title: "Search and Groups",
        explanation: "Extract specific parts of a match",
        code: `import re

log = "2024-03-15 14:32:01 ERROR Connection failed"

# Extract date and time
match = re.search(r"(\\d{4}-\\d{2}-\\d{2}) (\\d{2}:\\d{2}:\\d{2})", log)
if match:
    date = match.group(1)
    time = match.group(2)
    print(f"Date: {date}")
    print(f"Time: {time}")`,
      },
      {
        title: "Substitution",
        explanation: "Replace patterns with new text",
        code: `import re

# Remove all digits
text = "Phone: 555-123-4567"
no_digits = re.sub(r"\\d", "X", text)
print(no_digits)

# Clean up whitespace
messy = "too    many   spaces"
clean = re.sub(r"\\s+", " ", messy)
print(clean)`,
      },
    ],
    challenges: [
      {
        id: "m5l2c1",
        prompt: "Use regex to find all words that start with a capital letter in 'Alice met Bob in New York'",
        hint: "Use r'[A-Z][a-z]*' pattern with findall",
        validateFn: `return output.includes("Alice") && output.includes("Bob") && output.includes("New") && output.includes("York")`,
        solution: `import re
text = "Alice met Bob in New York"
caps = re.findall(r"[A-Z][a-z]*", text)
print(caps)`,
      },
      {
        id: "m5l2c2",
        prompt: "Replace all digits in 'Order #12345 total $99.99' with 'X' and print the result.",
        hint: "Use re.sub(r'\\d', 'X', text)",
        validateFn: `return output.includes("XXXXX") && output.includes("XX.XX")`,
        solution: `import re
text = "Order #12345 total $99.99"
result = re.sub(r"\\d", "X", text)
print(result)`,
      },
    ],
    projectChallenge: {
      threadId: "sales",
      threadTitle: "Sales Performance Dashboard",
      taskTitle: "Extract Sale ID Numbers",
      context: "Each sale has an ID like 'S001' or 'S015'. For database integration, you need to extract just the numeric portion of each SaleID. Use regex to parse out the numbers.",
      starterCode: `import pandas as pd
import io
import re

sales_csv = """SaleID,SalesRep,Region,Product,Category,Quantity,UnitPrice,SaleDate,CustomerSegment
S001,Alice Chen,North,Widget Pro,Electronics,15,49.99,2023-01-05,Enterprise
S002,Bob Martinez,South,Gadget Plus,Tools,8,29.99,2023-01-08,SMB
S003,Carol Davis,East,Widget Pro,Electronics,22,49.99,2023-01-10,Enterprise
S004,Dan Wilson,West,Super Tool,Tools,45,19.99,2023-01-12,Consumer
S005,Eva Brown,North,Power Unit,Electronics,10,89.99,2023-01-15,Enterprise
S006,Alice Chen,North,Gadget Plus,Tools,30,29.99,2023-01-18,SMB
S007,Bob Martinez,South,Widget Pro,Electronics,18,49.99,2023-01-20,Consumer
S008,Carol Davis,East,Super Tool,Tools,55,19.99,2023-02-01,SMB
S009,Dan Wilson,West,Power Unit,Electronics,8,89.99,2023-02-05,Enterprise
S010,Eva Brown,North,Widget Basic,Electronics,65,24.99,2023-02-10,Consumer
S011,Alice Chen,North,Super Tool,Tools,40,19.99,2023-02-15,Consumer
S012,Bob Martinez,South,Power Unit,Electronics,12,89.99,2023-02-20,Enterprise
S013,Carol Davis,East,Gadget Plus,Tools,25,29.99,2023-03-01,SMB
S014,Dan Wilson,West,Widget Pro,Electronics,20,49.99,2023-03-05,Enterprise
S015,Eva Brown,North,Widget Basic,Electronics,80,24.99,2023-03-10,Consumer"""

sales = pd.read_csv(io.StringIO(sales_csv))

# Task: Use regex to extract the numeric part of SaleID
# Create a new column 'SaleNum' with just the integer (1, 2, 3, etc.)
# Print the first 5 rows showing SaleID and SaleNum
`,
      solution: `import pandas as pd
import io
import re

sales_csv = """SaleID,SalesRep,Region,Product,Category,Quantity,UnitPrice,SaleDate,CustomerSegment
S001,Alice Chen,North,Widget Pro,Electronics,15,49.99,2023-01-05,Enterprise
S002,Bob Martinez,South,Gadget Plus,Tools,8,29.99,2023-01-08,SMB
S003,Carol Davis,East,Widget Pro,Electronics,22,49.99,2023-01-10,Enterprise
S004,Dan Wilson,West,Super Tool,Tools,45,19.99,2023-01-12,Consumer
S005,Eva Brown,North,Power Unit,Electronics,10,89.99,2023-01-15,Enterprise
S006,Alice Chen,North,Gadget Plus,Tools,30,29.99,2023-01-18,SMB
S007,Bob Martinez,South,Widget Pro,Electronics,18,49.99,2023-01-20,Consumer
S008,Carol Davis,East,Super Tool,Tools,55,19.99,2023-02-01,SMB
S009,Dan Wilson,West,Power Unit,Electronics,8,89.99,2023-02-05,Enterprise
S010,Eva Brown,North,Widget Basic,Electronics,65,24.99,2023-02-10,Consumer
S011,Alice Chen,North,Super Tool,Tools,40,19.99,2023-02-15,Consumer
S012,Bob Martinez,South,Power Unit,Electronics,12,89.99,2023-02-20,Enterprise
S013,Carol Davis,East,Gadget Plus,Tools,25,29.99,2023-03-01,SMB
S014,Dan Wilson,West,Widget Pro,Electronics,20,49.99,2023-03-05,Enterprise
S015,Eva Brown,North,Widget Basic,Electronics,80,24.99,2023-03-10,Consumer"""

sales = pd.read_csv(io.StringIO(sales_csv))

# Extract numeric part using regex
sales["SaleNum"] = sales["SaleID"].str.extract(r"(\\d+)").astype(int)

print("Sale IDs with extracted numbers:")
print(sales[["SaleID", "SaleNum"]].head())`,
      validateFn: `return output.includes("SaleNum") && output.includes("1") && output.includes("2") && output.includes("3")`,
      hint: "Use .str.extract(r'(\\d+)') to pull out digits, then convert to int",
      xpReward: 50,
    },
  },
  {
    module: "String & File Ops",
    moduleSlug: "string-file-ops",
    lessonNumber: 23,
    slug: "file-io",
    title: "File I/O",
    badge: "concept",
    theory: `
## Reading Files

\`\`\`python
# Read entire file
with open("file.txt", "r") as f:
    content = f.read()

# Read lines into list
with open("file.txt", "r") as f:
    lines = f.readlines()

# Read line by line (memory efficient)
with open("file.txt", "r") as f:
    for line in f:
        print(line.strip())
\`\`\`

## Writing Files

\`\`\`python
# Write (overwrites existing)
with open("output.txt", "w") as f:
    f.write("Hello, World!\\n")

# Append to existing
with open("output.txt", "a") as f:
    f.write("Another line\\n")

# Write multiple lines
lines = ["Line 1", "Line 2", "Line 3"]
with open("output.txt", "w") as f:
    f.writelines(line + "\\n" for line in lines)
\`\`\`

## The with Statement

Always use \`with\` to ensure files are properly closed:

\`\`\`python
# Good - file automatically closes
with open("file.txt") as f:
    data = f.read()

# Bad - you might forget to close
f = open("file.txt")
data = f.read()
f.close()  # Easy to forget!
\`\`\`

## File Modes

| Mode | Meaning |
|------|---------|
| "r" | Read (default) |
| "w" | Write (overwrites) |
| "a" | Append |
| "x" | Create (fails if exists) |
| "b" | Binary mode |
| "r+" | Read and write |

## The csv Module

\`\`\`python
import csv

# Read CSV
with open("data.csv") as f:
    reader = csv.reader(f)
    for row in reader:
        print(row)  # row is a list

# Read as dictionaries
with open("data.csv") as f:
    reader = csv.DictReader(f)
    for row in reader:
        print(row["column_name"])

# Write CSV
with open("output.csv", "w", newline="") as f:
    writer = csv.writer(f)
    writer.writerow(["Name", "Age"])
    writer.writerow(["Alice", 25])
\`\`\`
`,
    starterCode: `import io

# Simulate file operations with StringIO
# (In browser, we can't access real files)

file_content = """Line 1: Hello
Line 2: World
Line 3: Python"""

# Read all content
f = io.StringIO(file_content)
all_text = f.read()
print("All content:")
print(all_text)

# Read lines
f = io.StringIO(file_content)
lines = f.readlines()
print("\\nAs lines list:")
print(lines)
`,
    examples: [
      {
        title: "Reading Line by Line",
        explanation: "Process each line individually",
        code: `import io

data = """apple,10
banana,25
cherry,15"""

f = io.StringIO(data)
for line in f:
    parts = line.strip().split(",")
    print(f"Item: {parts[0]}, Qty: {parts[1]}")`,
      },
      {
        title: "Writing Content",
        explanation: "Write text to a file-like object",
        code: `import io

# Create a file-like object to write to
output = io.StringIO()
output.write("Header Line\\n")
output.write("Data Line 1\\n")
output.write("Data Line 2\\n")

# Read what we wrote
output.seek(0)  # Go back to start
print(output.read())`,
      },
      {
        title: "CSV Operations",
        explanation: "Read and parse CSV data",
        code: `import io
import csv

csv_data = """name,age,city
Alice,25,NYC
Bob,30,LA
Carol,28,Chicago"""

f = io.StringIO(csv_data)
reader = csv.DictReader(f)
for row in reader:
    print(f"{row['name']} is {row['age']} from {row['city']}")`,
      },
    ],
    challenges: [
      {
        id: "m5l3c1",
        prompt: "Read data='A:1\\nB:2\\nC:3' line by line, split each by ':', and print key-value pairs.",
        hint: "Use StringIO, iterate lines, split(':'), print",
        validateFn: `return output.includes("A") && output.includes("1") && output.includes("B") && output.includes("2")`,
        solution: `import io
data = "A:1\\nB:2\\nC:3"
f = io.StringIO(data)
for line in f:
    key, value = line.strip().split(":")
    print(f"Key: {key}, Value: {value}")`,
      },
      {
        id: "m5l3c2",
        prompt: "Use csv.DictReader to read 'name,score\\nAlice,95\\nBob,82' and print each name and score.",
        hint: "Create StringIO, pass to csv.DictReader, iterate",
        validateFn: `return output.includes("Alice") && output.includes("95") && output.includes("Bob") && output.includes("82")`,
        solution: `import io
import csv
data = "name,score\\nAlice,95\\nBob,82"
f = io.StringIO(data)
reader = csv.DictReader(f)
for row in reader:
    print(f"{row['name']}: {row['score']}")`,
      },
    ],
    projectChallenge: {
      threadId: "sales",
      threadTitle: "Sales Performance Dashboard",
      taskTitle: "Write Sales Summary Report",
      context: "Management wants a text summary of sales by region. Generate a report showing total revenue per region and write it to a file-like object for export.",
      starterCode: `import pandas as pd
import io

sales_csv = """SaleID,SalesRep,Region,Product,Category,Quantity,UnitPrice,SaleDate,CustomerSegment
S001,Alice Chen,North,Widget Pro,Electronics,15,49.99,2023-01-05,Enterprise
S002,Bob Martinez,South,Gadget Plus,Tools,8,29.99,2023-01-08,SMB
S003,Carol Davis,East,Widget Pro,Electronics,22,49.99,2023-01-10,Enterprise
S004,Dan Wilson,West,Super Tool,Tools,45,19.99,2023-01-12,Consumer
S005,Eva Brown,North,Power Unit,Electronics,10,89.99,2023-01-15,Enterprise
S006,Alice Chen,North,Gadget Plus,Tools,30,29.99,2023-01-18,SMB
S007,Bob Martinez,South,Widget Pro,Electronics,18,49.99,2023-01-20,Consumer
S008,Carol Davis,East,Super Tool,Tools,55,19.99,2023-02-01,SMB
S009,Dan Wilson,West,Power Unit,Electronics,8,89.99,2023-02-05,Enterprise
S010,Eva Brown,North,Widget Basic,Electronics,65,24.99,2023-02-10,Consumer
S011,Alice Chen,North,Super Tool,Tools,40,19.99,2023-02-15,Consumer
S012,Bob Martinez,South,Power Unit,Electronics,12,89.99,2023-02-20,Enterprise
S013,Carol Davis,East,Gadget Plus,Tools,25,29.99,2023-03-01,SMB
S014,Dan Wilson,West,Widget Pro,Electronics,20,49.99,2023-03-05,Enterprise
S015,Eva Brown,North,Widget Basic,Electronics,80,24.99,2023-03-10,Consumer"""

sales = pd.read_csv(io.StringIO(sales_csv))

# Task:
# 1. Calculate revenue (Quantity * UnitPrice) for each sale
# 2. Group by Region and sum the revenue
# 3. Write a formatted report to a StringIO object
# 4. Print the report contents
`,
      solution: `import pandas as pd
import io

sales_csv = """SaleID,SalesRep,Region,Product,Category,Quantity,UnitPrice,SaleDate,CustomerSegment
S001,Alice Chen,North,Widget Pro,Electronics,15,49.99,2023-01-05,Enterprise
S002,Bob Martinez,South,Gadget Plus,Tools,8,29.99,2023-01-08,SMB
S003,Carol Davis,East,Widget Pro,Electronics,22,49.99,2023-01-10,Enterprise
S004,Dan Wilson,West,Super Tool,Tools,45,19.99,2023-01-12,Consumer
S005,Eva Brown,North,Power Unit,Electronics,10,89.99,2023-01-15,Enterprise
S006,Alice Chen,North,Gadget Plus,Tools,30,29.99,2023-01-18,SMB
S007,Bob Martinez,South,Widget Pro,Electronics,18,49.99,2023-01-20,Consumer
S008,Carol Davis,East,Super Tool,Tools,55,19.99,2023-02-01,SMB
S009,Dan Wilson,West,Power Unit,Electronics,8,89.99,2023-02-05,Enterprise
S010,Eva Brown,North,Widget Basic,Electronics,65,24.99,2023-02-10,Consumer
S011,Alice Chen,North,Super Tool,Tools,40,19.99,2023-02-15,Consumer
S012,Bob Martinez,South,Power Unit,Electronics,12,89.99,2023-02-20,Enterprise
S013,Carol Davis,East,Gadget Plus,Tools,25,29.99,2023-03-01,SMB
S014,Dan Wilson,West,Widget Pro,Electronics,20,49.99,2023-03-05,Enterprise
S015,Eva Brown,North,Widget Basic,Electronics,80,24.99,2023-03-10,Consumer"""

sales = pd.read_csv(io.StringIO(sales_csv))

# Calculate revenue
sales["Revenue"] = sales["Quantity"] * sales["UnitPrice"]

# Group by region
by_region = sales.groupby("Region")["Revenue"].sum()

# Write report to StringIO
report = io.StringIO()
report.write("SALES SUMMARY BY REGION\\n")
report.write("=" * 30 + "\\n")
for region, revenue in by_region.items():
    report.write(f"{region}: \${revenue:,.2f}\\n")
report.write("=" * 30 + "\\n")
report.write(f"Total: \${by_region.sum():,.2f}\\n")

# Print the report
report.seek(0)
print(report.read())`,
      validateFn: `return output.includes("North") && output.includes("South") && output.includes("East") && output.includes("West") && output.includes("$")`,
      hint: "Calculate revenue first, then groupby('Region')['Revenue'].sum(), and write each line to a StringIO object",
      xpReward: 50,
    },
  },
  {
    module: "String & File Ops",
    moduleSlug: "string-file-ops",
    lessonNumber: 24,
    slug: "json-handling",
    title: "JSON Handling",
    badge: "practice",
    theory: `
## What is JSON?

JSON (JavaScript Object Notation) is the standard format for data exchange. It looks like Python dictionaries and lists:

\`\`\`json
{
  "name": "Alice",
  "age": 30,
  "hobbies": ["reading", "coding"],
  "address": {
    "city": "NYC",
    "zip": "10001"
  }
}
\`\`\`

## Python's json Module

\`\`\`python
import json

# Parse JSON string → Python dict
data = json.loads('{"name": "Alice", "age": 30}')
print(data["name"])  # "Alice"

# Convert Python → JSON string
json_str = json.dumps({"name": "Bob", "age": 25})
print(json_str)  # '{"name": "Bob", "age": 25}'

# Pretty print
json.dumps(data, indent=2)
\`\`\`

## Working with Files

\`\`\`python
# Read JSON file
with open("data.json") as f:
    data = json.load(f)  # Note: load, not loads

# Write JSON file
with open("output.json", "w") as f:
    json.dump(data, f, indent=2)  # Note: dump, not dumps
\`\`\`

## Nested Access

\`\`\`python
data = {
    "users": [
        {"name": "Alice", "scores": [95, 82, 91]},
        {"name": "Bob", "scores": [88, 79, 94]}
    ]
}

# Access nested data
first_user = data["users"][0]["name"]  # "Alice"
first_score = data["users"][0]["scores"][0]  # 95
\`\`\`

## JSON to DataFrame

\`\`\`python
import pandas as pd

# List of dicts → DataFrame
json_list = [
    {"name": "Alice", "age": 30},
    {"name": "Bob", "age": 25}
]
df = pd.DataFrame(json_list)

# Nested JSON → normalize
pd.json_normalize(data, record_path="users")
\`\`\`
`,
    starterCode: `import json

# Parse JSON string
json_string = '''
{
  "product": "Widget",
  "price": 29.99,
  "tags": ["electronics", "gadget"],
  "specs": {
    "weight": "0.5kg",
    "color": "blue"
  }
}
'''

data = json.loads(json_string)
print(f"Product: {data['product']}")
print(f"Price: \${data['price']}")
print(f"First tag: {data['tags'][0]}")
print(f"Color: {data['specs']['color']}")
`,
    examples: [
      {
        title: "Parsing and Navigating JSON",
        explanation: "Work with nested JSON structures",
        code: `import json

json_str = '''
{
  "company": "TechCorp",
  "employees": [
    {"name": "Alice", "role": "Engineer"},
    {"name": "Bob", "role": "Designer"}
  ]
}
'''

data = json.loads(json_str)
print(f"Company: {data['company']}")
print("\\nEmployees:")
for emp in data["employees"]:
    print(f"  {emp['name']} - {emp['role']}")`,
      },
      {
        title: "Creating JSON",
        explanation: "Convert Python objects to JSON strings",
        code: `import json

data = {
    "name": "Alice",
    "scores": [95, 88, 92],
    "active": True
}

# Compact output
compact = json.dumps(data)
print("Compact:", compact)

# Pretty output
pretty = json.dumps(data, indent=2)
print("\\nPretty:")
print(pretty)`,
      },
      {
        title: "JSON to DataFrame",
        explanation: "Convert JSON arrays to pandas DataFrames",
        code: `import json

json_str = '''
[
  {"name": "Alice", "age": 25, "city": "NYC"},
  {"name": "Bob", "age": 30, "city": "LA"},
  {"name": "Carol", "age": 28, "city": "Chicago"}
]
'''

data = json.loads(json_str)
df = pd.DataFrame(data)
print(df)`,
      },
    ],
    challenges: [
      {
        id: "m5l4c1",
        prompt: "Parse '{\"items\": [{\"name\": \"A\"}, {\"name\": \"B\"}]}' and print each item name.",
        hint: "json.loads, then loop through data['items']",
        validateFn: `return output.includes("A") && output.includes("B")`,
        solution: `import json
json_str = '{"items": [{"name": "A"}, {"name": "B"}]}'
data = json.loads(json_str)
for item in data["items"]:
    print(item["name"])`,
      },
      {
        id: "m5l4c2",
        prompt: "Convert students DataFrame to a JSON string and print it.",
        hint: "students.to_json() or json.dumps(students.to_dict())",
        validateFn: `return output.includes("Alice") && output.includes("name")`,
        solution: `json_str = students.to_json(orient="records")
print(json_str)`,
      },
    ],
    projectChallenge: {
      threadId: "sales",
      threadTitle: "Sales Performance Dashboard",
      taskTitle: "Export Top Sales to JSON",
      context: "The API team needs the top 5 sales (by revenue) in JSON format for the mobile app. Convert the filtered sales data to a JSON string with proper formatting.",
      starterCode: `import pandas as pd
import io
import json

sales_csv = """SaleID,SalesRep,Region,Product,Category,Quantity,UnitPrice,SaleDate,CustomerSegment
S001,Alice Chen,North,Widget Pro,Electronics,15,49.99,2023-01-05,Enterprise
S002,Bob Martinez,South,Gadget Plus,Tools,8,29.99,2023-01-08,SMB
S003,Carol Davis,East,Widget Pro,Electronics,22,49.99,2023-01-10,Enterprise
S004,Dan Wilson,West,Super Tool,Tools,45,19.99,2023-01-12,Consumer
S005,Eva Brown,North,Power Unit,Electronics,10,89.99,2023-01-15,Enterprise
S006,Alice Chen,North,Gadget Plus,Tools,30,29.99,2023-01-18,SMB
S007,Bob Martinez,South,Widget Pro,Electronics,18,49.99,2023-01-20,Consumer
S008,Carol Davis,East,Super Tool,Tools,55,19.99,2023-02-01,SMB
S009,Dan Wilson,West,Power Unit,Electronics,8,89.99,2023-02-05,Enterprise
S010,Eva Brown,North,Widget Basic,Electronics,65,24.99,2023-02-10,Consumer
S011,Alice Chen,North,Super Tool,Tools,40,19.99,2023-02-15,Consumer
S012,Bob Martinez,South,Power Unit,Electronics,12,89.99,2023-02-20,Enterprise
S013,Carol Davis,East,Gadget Plus,Tools,25,29.99,2023-03-01,SMB
S014,Dan Wilson,West,Widget Pro,Electronics,20,49.99,2023-03-05,Enterprise
S015,Eva Brown,North,Widget Basic,Electronics,80,24.99,2023-03-10,Consumer"""

sales = pd.read_csv(io.StringIO(sales_csv))

# Task:
# 1. Calculate Revenue for each sale
# 2. Find the top 5 sales by revenue
# 3. Select only SaleID, Product, Revenue columns
# 4. Convert to JSON (records format) and print with indentation
`,
      solution: `import pandas as pd
import io
import json

sales_csv = """SaleID,SalesRep,Region,Product,Category,Quantity,UnitPrice,SaleDate,CustomerSegment
S001,Alice Chen,North,Widget Pro,Electronics,15,49.99,2023-01-05,Enterprise
S002,Bob Martinez,South,Gadget Plus,Tools,8,29.99,2023-01-08,SMB
S003,Carol Davis,East,Widget Pro,Electronics,22,49.99,2023-01-10,Enterprise
S004,Dan Wilson,West,Super Tool,Tools,45,19.99,2023-01-12,Consumer
S005,Eva Brown,North,Power Unit,Electronics,10,89.99,2023-01-15,Enterprise
S006,Alice Chen,North,Gadget Plus,Tools,30,29.99,2023-01-18,SMB
S007,Bob Martinez,South,Widget Pro,Electronics,18,49.99,2023-01-20,Consumer
S008,Carol Davis,East,Super Tool,Tools,55,19.99,2023-02-01,SMB
S009,Dan Wilson,West,Power Unit,Electronics,8,89.99,2023-02-05,Enterprise
S010,Eva Brown,North,Widget Basic,Electronics,65,24.99,2023-02-10,Consumer
S011,Alice Chen,North,Super Tool,Tools,40,19.99,2023-02-15,Consumer
S012,Bob Martinez,South,Power Unit,Electronics,12,89.99,2023-02-20,Enterprise
S013,Carol Davis,East,Gadget Plus,Tools,25,29.99,2023-03-01,SMB
S014,Dan Wilson,West,Widget Pro,Electronics,20,49.99,2023-03-05,Enterprise
S015,Eva Brown,North,Widget Basic,Electronics,80,24.99,2023-03-10,Consumer"""

sales = pd.read_csv(io.StringIO(sales_csv))

# Calculate revenue
sales["Revenue"] = sales["Quantity"] * sales["UnitPrice"]

# Get top 5 by revenue
top5 = sales.nlargest(5, "Revenue")[["SaleID", "Product", "Revenue"]]

# Convert to JSON
json_data = top5.to_dict(orient="records")
json_str = json.dumps(json_data, indent=2)
print(json_str)`,
      validateFn: `return output.includes("SaleID") && output.includes("Revenue") && output.includes("Product")`,
      hint: "Use nlargest(5, 'Revenue') to get top sales, then to_dict(orient='records') and json.dumps with indent",
      xpReward: 50,
    },
  },
  {
    module: "String & File Ops",
    moduleSlug: "string-file-ops",
    lessonNumber: 25,
    slug: "error-handling",
    title: "Error Handling",
    badge: "concept",
    theory: `
## Try/Except Blocks

Catch errors and handle them gracefully:

\`\`\`python
try:
    result = 10 / 0
except ZeroDivisionError:
    print("Cannot divide by zero!")
\`\`\`

## Common Exception Types

| Exception | When it occurs |
|-----------|----------------|
| ValueError | Wrong value (e.g., int("abc")) |
| KeyError | Dict key doesn't exist |
| IndexError | List index out of range |
| FileNotFoundError | File doesn't exist |
| TypeError | Wrong type for operation |
| ZeroDivisionError | Division by zero |

## Catching Multiple Exceptions

\`\`\`python
try:
    # risky code
    value = int(user_input)
    result = data[value]
except ValueError:
    print("Not a valid number")
except KeyError:
    print("Key not found")
except (IndexError, TypeError) as e:
    print(f"Error: {e}")
\`\`\`

## The else and finally Clauses

\`\`\`python
try:
    file = open("data.txt")
except FileNotFoundError:
    print("File not found")
else:
    # Runs only if no exception
    content = file.read()
    file.close()
finally:
    # Always runs
    print("Done")
\`\`\`

## Raising Exceptions

\`\`\`python
def divide(a, b):
    if b == 0:
        raise ValueError("Cannot divide by zero")
    return a / b
\`\`\`

## Error Handling Patterns

\`\`\`python
# Default value on error
def safe_int(value, default=0):
    try:
        return int(value)
    except (ValueError, TypeError):
        return default

# Log and continue
for item in items:
    try:
        process(item)
    except Exception as e:
        print(f"Error processing {item}: {e}")
        continue
\`\`\`
`,
    starterCode: `# Practice error handling

def safe_divide(a, b):
    try:
        result = a / b
        return result
    except ZeroDivisionError:
        return None

# Test it
print(safe_divide(10, 2))   # 5.0
print(safe_divide(10, 0))   # None

# Handle multiple errors
def get_value(data, key):
    try:
        return data[key]
    except KeyError:
        return f"Key '{key}' not found"
    except TypeError:
        return "Invalid data type"

print(get_value({"a": 1}, "a"))  # 1
print(get_value({"a": 1}, "b"))  # Key 'b' not found
`,
    examples: [
      {
        title: "Safe Type Conversion",
        explanation: "Handle invalid input gracefully",
        code: `def safe_int(value, default=0):
    try:
        return int(value)
    except (ValueError, TypeError):
        return default

# Test cases
print(safe_int("42"))      # 42
print(safe_int("abc"))     # 0 (default)
print(safe_int(None, -1))  # -1`,
      },
      {
        title: "Dictionary Access with Default",
        explanation: "Handle missing keys gracefully",
        code: `data = {"name": "Alice", "age": 25}

# Using try/except
def get_field(data, field):
    try:
        return data[field]
    except KeyError:
        return "N/A"

print(get_field(data, "name"))   # Alice
print(get_field(data, "email"))  # N/A

# Or use dict.get() which is built-in
print(data.get("email", "N/A"))  # N/A`,
      },
      {
        title: "Processing with Error Handling",
        explanation: "Continue processing even when some items fail",
        code: `values = ["10", "20", "bad", "30", "oops"]
total = 0
errors = 0

for val in values:
    try:
        total += int(val)
    except ValueError:
        errors += 1
        print(f"Skipped invalid value: {val}")

print(f"\\nTotal: {total}, Errors: {errors}")`,
      },
    ],
    challenges: [
      {
        id: "m5l5c1",
        prompt: "Write a function safe_get(lst, index) that returns the item at index, or 'Not found' if index is out of range.",
        hint: "Use try/except IndexError",
        validateFn: `return output.includes("a") && output.includes("Not found")`,
        solution: `def safe_get(lst, index):
    try:
        return lst[index]
    except IndexError:
        return "Not found"

data = ["a", "b", "c"]
print(safe_get(data, 0))   # a
print(safe_get(data, 10))  # Not found`,
      },
      {
        id: "m5l5c2",
        prompt: "Convert ['1', '2', 'x', '4'] to integers, skipping invalid values. Print the sum of valid numbers.",
        hint: "Loop with try/except ValueError, accumulate valid ints",
        validateFn: `return output.includes("7")`,
        solution: `values = ['1', '2', 'x', '4']
total = 0
for v in values:
    try:
        total += int(v)
    except ValueError:
        pass
print(total)`,
      },
    ],
    projectChallenge: {
      threadId: "sales",
      threadTitle: "Sales Performance Dashboard",
      taskTitle: "Safe Revenue Calculator",
      context: "Some sales records might have invalid data. Create a function that safely calculates revenue, handling cases where Quantity or UnitPrice might be invalid, and returns 0 for those records.",
      starterCode: `import pandas as pd
import io

sales_csv = """SaleID,SalesRep,Region,Product,Category,Quantity,UnitPrice,SaleDate,CustomerSegment
S001,Alice Chen,North,Widget Pro,Electronics,15,49.99,2023-01-05,Enterprise
S002,Bob Martinez,South,Gadget Plus,Tools,8,29.99,2023-01-08,SMB
S003,Carol Davis,East,Widget Pro,Electronics,22,49.99,2023-01-10,Enterprise
S004,Dan Wilson,West,Super Tool,Tools,45,19.99,2023-01-12,Consumer
S005,Eva Brown,North,Power Unit,Electronics,10,89.99,2023-01-15,Enterprise
S006,Alice Chen,North,Gadget Plus,Tools,30,29.99,2023-01-18,SMB
S007,Bob Martinez,South,Widget Pro,Electronics,18,49.99,2023-01-20,Consumer
S008,Carol Davis,East,Super Tool,Tools,55,19.99,2023-02-01,SMB
S009,Dan Wilson,West,Power Unit,Electronics,8,89.99,2023-02-05,Enterprise
S010,Eva Brown,North,Widget Basic,Electronics,65,24.99,2023-02-10,Consumer
S011,Alice Chen,North,Super Tool,Tools,40,19.99,2023-02-15,Consumer
S012,Bob Martinez,South,Power Unit,Electronics,12,89.99,2023-02-20,Enterprise
S013,Carol Davis,East,Gadget Plus,Tools,25,29.99,2023-03-01,SMB
S014,Dan Wilson,West,Widget Pro,Electronics,20,49.99,2023-03-05,Enterprise
S015,Eva Brown,North,Widget Basic,Electronics,80,24.99,2023-03-10,Consumer"""

sales = pd.read_csv(io.StringIO(sales_csv))

# Task:
# 1. Create a safe_revenue(qty, price) function that:
#    - Returns qty * price if both are valid numbers
#    - Returns 0 if there's any error (TypeError, ValueError)
# 2. Apply it to calculate revenue for each row
# 3. Print total revenue and count of successful calculations
`,
      solution: `import pandas as pd
import io

sales_csv = """SaleID,SalesRep,Region,Product,Category,Quantity,UnitPrice,SaleDate,CustomerSegment
S001,Alice Chen,North,Widget Pro,Electronics,15,49.99,2023-01-05,Enterprise
S002,Bob Martinez,South,Gadget Plus,Tools,8,29.99,2023-01-08,SMB
S003,Carol Davis,East,Widget Pro,Electronics,22,49.99,2023-01-10,Enterprise
S004,Dan Wilson,West,Super Tool,Tools,45,19.99,2023-01-12,Consumer
S005,Eva Brown,North,Power Unit,Electronics,10,89.99,2023-01-15,Enterprise
S006,Alice Chen,North,Gadget Plus,Tools,30,29.99,2023-01-18,SMB
S007,Bob Martinez,South,Widget Pro,Electronics,18,49.99,2023-01-20,Consumer
S008,Carol Davis,East,Super Tool,Tools,55,19.99,2023-02-01,SMB
S009,Dan Wilson,West,Power Unit,Electronics,8,89.99,2023-02-05,Enterprise
S010,Eva Brown,North,Widget Basic,Electronics,65,24.99,2023-02-10,Consumer
S011,Alice Chen,North,Super Tool,Tools,40,19.99,2023-02-15,Consumer
S012,Bob Martinez,South,Power Unit,Electronics,12,89.99,2023-02-20,Enterprise
S013,Carol Davis,East,Gadget Plus,Tools,25,29.99,2023-03-01,SMB
S014,Dan Wilson,West,Widget Pro,Electronics,20,49.99,2023-03-05,Enterprise
S015,Eva Brown,North,Widget Basic,Electronics,80,24.99,2023-03-10,Consumer"""

sales = pd.read_csv(io.StringIO(sales_csv))

def safe_revenue(qty, price):
    try:
        return float(qty) * float(price)
    except (TypeError, ValueError):
        return 0

# Apply the function
sales["Revenue"] = sales.apply(lambda row: safe_revenue(row["Quantity"], row["UnitPrice"]), axis=1)

# Count successful calculations
successful = (sales["Revenue"] > 0).sum()
total_revenue = sales["Revenue"].sum()

print(f"Successful calculations: {successful}")
print(f"Total Revenue: \${total_revenue:,.2f}")`,
      validateFn: `return output.includes("Successful") && output.includes("Revenue") && output.includes("$")`,
      hint: "Use try/except in the function to catch errors and return 0, then use apply with axis=1 to call it per row",
      xpReward: 50,
    },
  },
];
