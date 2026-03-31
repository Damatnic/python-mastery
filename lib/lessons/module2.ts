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
  },
];
