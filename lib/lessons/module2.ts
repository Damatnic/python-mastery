import type { Lesson } from "../types";

export const lessonsModule2: Lesson[] = [
  {
    module: "Pandas Fundamentals",
    moduleSlug: "pandas-fundamentals",
    lessonNumber: 6,
    slug: "dataframes-series",
    title: "DataFrames & Series",
    badge: "concept",
    theory: `
## What is a DataFrame?

A DataFrame is a 2D table with rows and columns, like an Excel spreadsheet or SQL table. It's the core data structure in pandas.

\`\`\`python
import pandas as pd

# Create from dictionary
data = {
    "name": ["Alice", "Bob", "Carol"],
    "age": [25, 30, 28],
    "city": ["NYC", "LA", "Chicago"]
}
df = pd.DataFrame(data)
\`\`\`

## What is a Series?

A Series is a single column — a 1D array with labels (the index):

\`\`\`python
ages = df["age"]  # This is a Series
print(type(ages))  # <class 'pandas.core.series.Series'>
\`\`\`

## Exploring Your Data

\`\`\`python
df.head()       # First 5 rows
df.head(10)     # First 10 rows
df.tail(3)      # Last 3 rows
df.info()       # Column types, non-null counts
df.describe()   # Statistics for numeric columns
df.shape        # (rows, columns) tuple
df.columns      # Column names
df.dtypes       # Data type of each column
\`\`\`

## Quick Data Types

| dtype | Meaning |
|-------|---------|
| int64 | Integer |
| float64 | Decimal number |
| object | String (usually) |
| bool | True/False |
| datetime64 | Date/time |

## Why DataFrames Matter

Every data analysis project loads data into a DataFrame. Once it's there, you can:
- Filter rows
- Select columns
- Aggregate and group
- Join multiple datasets
- Clean and transform

Master DataFrames and you master data analysis.
`,
    starterCode: `# The 'students' DataFrame is pre-loaded
# Let's explore it

print("First few rows:")
print(students.head())

print("\\nDataFrame info:")
print(students.info())

print("\\nShape:", students.shape)
print("Columns:", list(students.columns))
`,
    examples: [
      {
        title: "Creating a DataFrame",
        explanation: "Build a DataFrame from a dictionary",
        code: `import pandas as pd

# From dictionary of lists
data = {
    "product": ["Widget", "Gadget", "Gizmo"],
    "price": [9.99, 24.99, 14.99],
    "quantity": [100, 50, 75]
}
df = pd.DataFrame(data)
print(df)`,
      },
      {
        title: "DataFrame vs Series",
        explanation: "Understanding the difference between 1D and 2D structures",
        code: `# DataFrame - 2D (multiple columns)
print("Full DataFrame:")
print(students)

print("\\nSingle column (Series):")
print(students["name"])

print("\\nType of column:", type(students["name"]))`,
      },
      {
        title: "Describe Statistics",
        explanation: "Get quick statistics for numeric columns",
        code: `print("Sales statistics:")
print(sales.describe())

print("\\nJust the mean values:")
print(sales.describe().loc["mean"])`,
      },
    ],
    challenges: [
      {
        id: "m2l1c1",
        prompt: "Print the shape of the 'sales' DataFrame and then print all column names.",
        hint: "Use sales.shape and sales.columns",
        validateFn: `return output.includes("6") && output.includes("product") && output.includes("price")`,
        solution: `print("Shape:", sales.shape)
print("Columns:", list(sales.columns))`,
      },
      {
        id: "m2l1c2",
        prompt: "Print the last 3 rows of the students DataFrame using tail().",
        hint: "students.tail(3)",
        validateFn: `return output.includes("Grace") && output.includes("Hank")`,
        solution: `print(students.tail(3))`,
      },
    ],
    projectChallenge: {
      threadId: "permits",
      threadTitle: "SF Permits Analysis",
      taskTitle: "Explore Permits Data",
      context: "You just received the SF building permits dataset. Before any analysis, explore its structure to understand what you're working with.",
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

# TODO: Print the shape of the DataFrame and its column data types
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

print(f"Shape: {permits.shape}")
print(f"\\nData types:\\n{permits.dtypes}")`,
      validateFn: `return output.includes("15") && output.includes("10") && output.includes("object") && output.includes("Permit Number")`,
      hint: "Use permits.shape to get (rows, columns) and permits.dtypes to see the data type of each column.",
      xpReward: 50,
    },
  },
  {
    module: "Pandas Fundamentals",
    moduleSlug: "pandas-fundamentals",
    lessonNumber: 7,
    slug: "selecting-data",
    title: "Selecting Data",
    badge: "practice",
    theory: `
## Selecting Columns

Single column (returns Series):
\`\`\`python
df["name"]
\`\`\`

Multiple columns (returns DataFrame):
\`\`\`python
df[["name", "age"]]
\`\`\`

## loc vs iloc

- **loc**: Select by **label** (row/column names)
- **iloc**: Select by **integer position** (0, 1, 2...)

\`\`\`python
# loc - by label
df.loc[0]              # First row (if index is 0, 1, 2...)
df.loc[0, "name"]      # Cell at row 0, column "name"
df.loc[:, "name"]      # All rows, "name" column
df.loc[0:2, ["name", "age"]]  # Rows 0-2, specific columns

# iloc - by position
df.iloc[0]             # First row
df.iloc[0, 1]          # Row 0, column 1
df.iloc[:3, :2]        # First 3 rows, first 2 columns
df.iloc[-1]            # Last row
\`\`\`

## Key Difference

\`\`\`python
# With loc, the end is INCLUSIVE
df.loc[0:2]  # Returns rows 0, 1, AND 2

# With iloc, the end is EXCLUSIVE
df.iloc[0:2]  # Returns rows 0 and 1 only
\`\`\`

## Column Selection Tips

\`\`\`python
# Get column as Series (most common)
names = df["name"]

# Get column as DataFrame (preserves structure)
names_df = df[["name"]]

# Select multiple columns
subset = df[["name", "score", "grade"]]
\`\`\`

## When to Use What

- **df["col"]**: Quick column access
- **df[["col1", "col2"]]**: Multiple columns
- **loc**: When you know row labels or column names
- **iloc**: When you want specific positions (like "first 5 rows")
`,
    starterCode: `# Practice selecting data from students DataFrame

# Select single column
names = students["name"]
print("Names:", list(names))

# Select multiple columns
subset = students[["name", "score"]]
print("\\nName and Score:")
print(subset)
`,
    examples: [
      {
        title: "Column Selection",
        explanation: "Different ways to select columns",
        code: `# Single column as Series
scores = students["score"]
print("Scores Series:")
print(scores)

# Multiple columns as DataFrame
subset = students[["name", "grade", "score"]]
print("\\nSubset DataFrame:")
print(subset)`,
      },
      {
        title: "Using loc",
        explanation: "Select by label (row index and column name)",
        code: `# Single cell
print("First student name:", students.loc[0, "name"])

# Row range with specific columns
print("\\nFirst 3 students, name and score:")
print(students.loc[0:2, ["name", "score"]])`,
      },
      {
        title: "Using iloc",
        explanation: "Select by integer position",
        code: `# First row
print("First row:")
print(students.iloc[0])

# Last 2 rows, first 3 columns
print("\\nLast 2 rows, first 3 columns:")
print(students.iloc[-2:, :3])`,
      },
    ],
    challenges: [
      {
        id: "m2l2c1",
        prompt: "Select only the 'product' and 'price' columns from sales DataFrame and print them.",
        hint: "Use double brackets: sales[['col1', 'col2']]",
        validateFn: `return output.includes("product") && output.includes("price") && output.includes("Widget")`,
        solution: `subset = sales[["product", "price"]]
print(subset)`,
      },
      {
        id: "m2l2c2",
        prompt: "Use iloc to select the first 3 rows and first 2 columns of the students DataFrame.",
        hint: "students.iloc[:3, :2]",
        validateFn: `return output.includes("Alice") && output.includes("Bob") && output.includes("Carol")`,
        solution: `result = students.iloc[:3, :2]
print(result)`,
      },
    ],
    projectChallenge: {
      threadId: "permits",
      threadTitle: "SF Permits Analysis",
      taskTitle: "Create Status Report View",
      context: "The status dashboard only needs three columns: Permit Number, Status, and Neighborhood. Select just these columns for the report view.",
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

# TODO: Select only Permit Number, Status, and Neighborhood columns
# Print the result
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

status_report = permits[["Permit Number", "Status", "Neighborhood"]]
print(status_report)`,
      validateFn: `return output.includes("Permit Number") && output.includes("Status") && output.includes("Neighborhood") && output.includes("BP2023-0001") && !output.includes("Street Name")`,
      hint: "Use double brackets with a list of column names: permits[['Permit Number', 'Status', 'Neighborhood']]",
      xpReward: 50,
    },
  },
  {
    module: "Pandas Fundamentals",
    moduleSlug: "pandas-fundamentals",
    lessonNumber: 8,
    slug: "filtering-rows",
    title: "Filtering Rows",
    badge: "practice",
    theory: `
## Boolean Indexing

The most powerful way to filter data. Create a True/False mask and use it to select rows:

\`\`\`python
# Create boolean mask
mask = df["age"] > 25
print(mask)  # Series of True/False

# Apply mask to filter
older_people = df[mask]
# Or in one line:
older_people = df[df["age"] > 25]
\`\`\`

## Comparison Operators

\`\`\`python
df[df["price"] > 50]       # Greater than
df[df["price"] >= 50]      # Greater than or equal
df[df["price"] == 50]      # Equal
df[df["price"] != 50]      # Not equal
df[df["name"] == "Alice"]  # String equality
\`\`\`

## Combining Conditions

Use \`&\` (and) and \`|\` (or). **Wrap each condition in parentheses!**

\`\`\`python
# AND - both must be true
df[(df["age"] > 25) & (df["city"] == "NYC")]

# OR - either can be true
df[(df["age"] < 20) | (df["age"] > 60)]
\`\`\`

## Helpful Methods

\`\`\`python
# isin() - check membership in a list
df[df["city"].isin(["NYC", "LA", "Chicago"])]

# between() - range check (inclusive)
df[df["age"].between(25, 35)]

# String methods
df[df["name"].str.startswith("A")]
df[df["name"].str.contains("ali", case=False)]
\`\`\`

## Filtering Pattern

1. Think: "What condition identifies the rows I want?"
2. Write the condition: \`df["column"] > value\`
3. Put it inside brackets: \`df[df["column"] > value]\`
`,
    starterCode: `# Filter students with score >= 90
high_scorers = students[students["score"] >= 90]
print("High scorers (90+):")
print(high_scorers)

# Filter students in Math
math_students = students[students["subject"] == "Math"]
print("\\nMath students:")
print(math_students)
`,
    examples: [
      {
        title: "Basic Filtering",
        explanation: "Filter rows based on a condition",
        code: `# Electronics products
electronics = sales[sales["category"] == "Electronics"]
print("Electronics:")
print(electronics)

# High-quantity items (>= 100)
high_qty = sales[sales["quantity"] >= 100]
print("\\nHigh quantity:")
print(high_qty)`,
      },
      {
        title: "Multiple Conditions",
        explanation: "Combine conditions with & (and) and | (or)",
        code: `# A grade AND score > 90
top_students = students[(students["grade"] == "A") & (students["score"] > 90)]
print("Top A students:")
print(top_students)

# Math OR Science students
stem = students[(students["subject"] == "Math") | (students["subject"] == "Science")]
print("\\nSTEM students:")
print(stem)`,
      },
      {
        title: "Using isin and between",
        explanation: "Convenient methods for common patterns",
        code: `# Students in specific subjects
subjects = ["Math", "Science"]
stem = students[students["subject"].isin(subjects)]
print("STEM students:")
print(stem)

# Scores between 80 and 95
mid_range = students[students["score"].between(80, 95)]
print("\\nMid-range scores (80-95):")
print(mid_range)`,
      },
    ],
    challenges: [
      {
        id: "m2l3c1",
        prompt: "Filter sales to show only products with price > 20. Print the result.",
        hint: "sales[sales['price'] > 20]",
        validateFn: `return output.includes("Widget B") && output.includes("49.99") && !output.includes("12.50")`,
        solution: `expensive = sales[sales["price"] > 20]
print(expensive)`,
      },
      {
        id: "m2l3c2",
        prompt: "Filter students who have grade 'A' OR grade 'B'. Print the result.",
        hint: "Use | for OR, and wrap conditions in parentheses",
        validateFn: `return output.includes("Alice") && output.includes("Bob") && output.includes("Eve") && !output.includes("Dave")`,
        solution: `ab_students = students[(students["grade"] == "A") | (students["grade"] == "B")]
print(ab_students)`,
      },
    ],
    projectChallenge: {
      threadId: "permits",
      threadTitle: "SF Permits Analysis",
      taskTitle: "Filter Active Permits",
      context: "The city wants to see only permits that are currently active. Filter to show permits that are either 'issued' or 'complete' status.",
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

# TODO: Filter permits where Status is 'issued' OR 'complete'
# Print the filtered DataFrame
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

active_permits = permits[(permits["Status"] == "issued") | (permits["Status"] == "complete")]
print(active_permits)`,
      validateFn: `return output.includes("BP2023-0001") && output.includes("BP2023-0002") && output.includes("issued") && output.includes("complete") && !output.includes("cancelled") && !output.includes("withdrawn")`,
      hint: "Use | for OR and wrap each condition in parentheses: (permits['Status'] == 'issued') | (permits['Status'] == 'complete')",
      xpReward: 50,
    },
  },
  {
    module: "Pandas Fundamentals",
    moduleSlug: "pandas-fundamentals",
    lessonNumber: 9,
    slug: "sorting-adding-columns",
    title: "Sorting & Adding Columns",
    badge: "practice",
    theory: `
## Sorting Data

Sort by one column:
\`\`\`python
df.sort_values("price")                    # Ascending (default)
df.sort_values("price", ascending=False)   # Descending
\`\`\`

Sort by multiple columns:
\`\`\`python
df.sort_values(["category", "price"], ascending=[True, False])
\`\`\`

## Adding New Columns

Just assign to a new column name:
\`\`\`python
# Simple calculation
df["total"] = df["price"] * df["quantity"]

# Constant value
df["status"] = "active"

# Based on condition
df["expensive"] = df["price"] > 50
\`\`\`

## Using apply()

For more complex transformations:
\`\`\`python
# Apply a function to each value
df["price_formatted"] = df["price"].apply(lambda x: f"\${x:.2f}")

# Apply to each row (axis=1)
df["description"] = df.apply(
    lambda row: f"{row['name']}: \${row['price']}", axis=1
)
\`\`\`

## Modifying Existing Columns

\`\`\`python
# Update all values
df["price"] = df["price"] * 1.1  # 10% increase

# Update based on condition
df.loc[df["category"] == "Electronics", "price"] *= 0.9  # 10% discount
\`\`\`

## Common Patterns

\`\`\`python
# Percentage of total
df["pct_of_total"] = df["amount"] / df["amount"].sum() * 100

# Rank
df["rank"] = df["score"].rank(ascending=False)

# Cumulative sum
df["running_total"] = df["amount"].cumsum()
\`\`\`
`,
    starterCode: `# Sort students by score (highest first)
sorted_students = students.sort_values("score", ascending=False)
print("Students by score (high to low):")
print(sorted_students)

# Add a new column for pass/fail
students["passed"] = students["score"] >= 70
print("\\nWith pass/fail column:")
print(students)
`,
    examples: [
      {
        title: "Sorting Examples",
        explanation: "Various ways to sort data",
        code: `# Sort by price descending
by_price = sales.sort_values("price", ascending=False)
print("By price (high to low):")
print(by_price)

# Sort by category, then by price
sorted_sales = sales.sort_values(["category", "price"])
print("\\nBy category, then price:")
print(sorted_sales)`,
      },
      {
        title: "Calculated Columns",
        explanation: "Create new columns from existing data",
        code: `# Calculate total value
sales["total_value"] = sales["price"] * sales["quantity"]
print("With total value:")
print(sales[["product", "price", "quantity", "total_value"]])

# Add percentage of total
total = sales["total_value"].sum()
sales["pct_of_total"] = (sales["total_value"] / total * 100).round(1)
print("\\nWith percentage:")
print(sales[["product", "total_value", "pct_of_total"]])`,
      },
      {
        title: "Using apply",
        explanation: "Transform values with custom logic",
        code: `def grade_category(grade):
    if grade == "A":
        return "Excellent"
    elif grade == "B":
        return "Good"
    else:
        return "Needs Improvement"

students["category"] = students["grade"].apply(grade_category)
print(students[["name", "grade", "category"]])`,
      },
    ],
    challenges: [
      {
        id: "m2l4c1",
        prompt: "Sort the sales DataFrame by quantity in descending order and print the result.",
        hint: "sort_values('quantity', ascending=False)",
        validateFn: `return output.split("\\n")[1].includes("Item Beta") || output.includes("300")`,
        solution: `sorted_sales = sales.sort_values("quantity", ascending=False)
print(sorted_sales)`,
      },
      {
        id: "m2l4c2",
        prompt: "Add a new column called 'revenue' to sales that is price * quantity. Print the product and revenue columns.",
        hint: "sales['revenue'] = sales['price'] * sales['quantity']",
        validateFn: `return output.includes("revenue") && (output.includes("4498.5") || output.includes("4498"))`,
        solution: `sales["revenue"] = sales["price"] * sales["quantity"]
print(sales[["product", "revenue"]])`,
      },
    ],
    projectChallenge: {
      threadId: "permits",
      threadTitle: "SF Permits Analysis",
      taskTitle: "Add Active Status Column",
      context: "The dashboard needs a boolean column to quickly identify active permits. Add an 'is_active' column that is True for permits with 'issued' or 'complete' status.",
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

# TODO: Add a column 'is_active' that is True when Status is 'issued' or 'complete'
# Then print the Permit Number, Status, and is_active columns
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

permits["is_active"] = permits["Status"].isin(["issued", "complete"])
print(permits[["Permit Number", "Status", "is_active"]])`,
      validateFn: `return output.includes("is_active") && output.includes("True") && output.includes("False") && output.includes("BP2023-0004")`,
      hint: "Use the isin() method to check if Status is in a list: permits['Status'].isin(['issued', 'complete'])",
      xpReward: 50,
    },
  },
  {
    module: "Pandas Fundamentals",
    moduleSlug: "pandas-fundamentals",
    lessonNumber: 10,
    slug: "reading-writing-files",
    title: "Reading & Writing Files",
    badge: "concept",
    theory: `
## Reading CSV Files

The most common operation — loading data from a CSV:

\`\`\`python
df = pd.read_csv("data.csv")
\`\`\`

Useful parameters:
\`\`\`python
pd.read_csv("data.csv",
    sep=",",              # Delimiter (default comma)
    header=0,             # Row number for headers (0 = first row)
    names=["a", "b", "c"], # Custom column names
    index_col="id",       # Use a column as index
    usecols=["a", "b"],   # Only read specific columns
    nrows=1000,           # Only read first N rows
    skiprows=5,           # Skip first N rows
    na_values=["", "NA", "NULL"],  # Treat these as missing
    dtype={"zip": str}    # Force column types
)
\`\`\`

## Reading from String (for testing)

\`\`\`python
import io
csv_string = """name,age
Alice,25
Bob,30"""
df = pd.read_csv(io.StringIO(csv_string))
\`\`\`

## Writing CSV Files

\`\`\`python
df.to_csv("output.csv")
df.to_csv("output.csv", index=False)  # Without row index
df.to_csv("output.csv", columns=["name", "age"])  # Specific columns
\`\`\`

## Other File Formats

\`\`\`python
# Excel
df = pd.read_excel("data.xlsx")
df.to_excel("output.xlsx", index=False)

# JSON
df = pd.read_json("data.json")
df.to_json("output.json")

# Parquet (fast, compressed)
df = pd.read_parquet("data.parquet")
df.to_parquet("output.parquet")
\`\`\`

## Best Practices

1. Always check your data after loading: \`df.head()\`, \`df.info()\`
2. Specify dtypes for columns that might be misinterpreted (like zip codes)
3. Use \`index=False\` when saving to avoid unnamed index column on reload
`,
    starterCode: `# In this environment, we use io.StringIO to simulate file reading
import io

csv_data = """city,population,country
Tokyo,37400000,Japan
Delhi,28514000,India
Shanghai,25582000,China
São Paulo,21650000,Brazil
Mexico City,21581000,Mexico"""

# Read the CSV data
cities = pd.read_csv(io.StringIO(csv_data))
print("Cities DataFrame:")
print(cities)
print("\\nData types:")
print(cities.dtypes)
`,
    examples: [
      {
        title: "Reading with Options",
        explanation: "Common read_csv parameters",
        code: `import io

csv_data = """id|name|score
1|Alice|95
2|Bob|82
3|Carol|91"""

# Read with pipe delimiter
df = pd.read_csv(io.StringIO(csv_data), sep="|", index_col="id")
print(df)
print("\\nIndex name:", df.index.name)`,
      },
      {
        title: "Reading Specific Columns",
        explanation: "Only load the columns you need",
        code: `import io

csv_data = """name,age,city,salary,department
Alice,25,NYC,75000,Engineering
Bob,30,LA,82000,Marketing
Carol,28,Chicago,78000,Engineering"""

# Only read name and salary
df = pd.read_csv(io.StringIO(csv_data), usecols=["name", "salary"])
print(df)`,
      },
      {
        title: "Handling Missing Values",
        explanation: "Specify what values should be treated as NA",
        code: `import io

csv_data = """name,age,city
Alice,25,NYC
Bob,NA,LA
Carol,,Chicago
Dave,NULL,"""

# Tell pandas what values mean "missing"
df = pd.read_csv(io.StringIO(csv_data), na_values=["", "NA", "NULL"])
print(df)
print("\\nMissing values:")
print(df.isna().sum())`,
      },
    ],
    challenges: [
      {
        id: "m2l5c1",
        prompt: "Read this CSV string into a DataFrame and print the first 2 rows: 'item,qty\\nApple,10\\nBanana,25\\nOrange,15'",
        hint: "Use io.StringIO() to create a file-like object from the string",
        validateFn: `return output.includes("Apple") && output.includes("Banana") && output.includes("10") && output.includes("25")`,
        solution: `import io
csv_data = "item,qty\\nApple,10\\nBanana,25\\nOrange,15"
df = pd.read_csv(io.StringIO(csv_data))
print(df.head(2))`,
      },
      {
        id: "m2l5c2",
        prompt: "Read the sales DataFrame info and print how many non-null values are in each column.",
        hint: "Use sales.info() or sales.count()",
        validateFn: `return output.includes("6") || output.includes("non-null")`,
        solution: `print(sales.info())`,
      },
    ],
    projectChallenge: {
      threadId: "permits",
      threadTitle: "SF Permits Analysis",
      taskTitle: "Check Data Quality",
      context: "Before building reports, you need to check the data quality. Some permits are missing their Issued Date. Find and report any missing values in the dataset.",
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

# TODO: Check for missing values in each column
# Print a summary showing which columns have missing data
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

print("Missing values by column:")
print(permits.isna().sum())
print(f"\\nTotal missing values: {permits.isna().sum().sum()}")`,
      validateFn: `return output.includes("Issued Date") && output.includes("2") && output.includes("Missing")`,
      hint: "Use permits.isna().sum() to count missing values in each column. The Issued Date column has 2 missing values.",
      xpReward: 50,
    },
  },
];
