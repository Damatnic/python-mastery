import type { Lesson } from "../types";

export const lessonsModule7: Lesson[] = [
  {
    module: "Functions & Apply",
    moduleSlug: "functions-apply",
    lessonNumber: 31,
    slug: "lambda-functions",
    title: "Lambda Functions",
    badge: "concept",
    theory: `
## What is a Lambda?

A lambda is a small, anonymous function. Instead of using \`def\`:

\`\`\`python
def double(x):
    return x * 2
\`\`\`

You can write:

\`\`\`python
double = lambda x: x * 2
\`\`\`

## Lambda Syntax

\`\`\`python
lambda arguments: expression
\`\`\`

- No \`def\` keyword
- No function name (anonymous)
- Single expression (no statements)
- Implicit return

## Examples

\`\`\`python
# One argument
square = lambda x: x ** 2
print(square(5))  # 25

# Multiple arguments
add = lambda a, b: a + b
print(add(3, 4))  # 7

# With conditional
grade = lambda score: "Pass" if score >= 70 else "Fail"
print(grade(85))  # "Pass"
\`\`\`

## Using with map() and filter()

\`\`\`python
numbers = [1, 2, 3, 4, 5]

# map: apply function to each element
doubled = list(map(lambda x: x * 2, numbers))
# [2, 4, 6, 8, 10]

# filter: keep elements where function returns True
evens = list(filter(lambda x: x % 2 == 0, numbers))
# [2, 4]
\`\`\`

## When to Use Lambdas

**Good for:**
- Simple, one-line operations
- Passing to functions like sort(), map(), filter()
- Quick DataFrame transformations

**Avoid when:**
- Logic needs multiple lines
- Function is used in multiple places
- Logic is complex or needs documentation
`,
    starterCode: `# Lambda basics
square = lambda x: x ** 2
print(f"5 squared = {square(5)}")

# Lambda with condition
grade = lambda score: "A" if score >= 90 else "B" if score >= 80 else "C"
print(f"Score 85 = {grade(85)}")

# Using with map
numbers = [1, 2, 3, 4, 5]
cubed = list(map(lambda x: x ** 3, numbers))
print(f"Cubes: {cubed}")
`,
    examples: [
      {
        title: "Lambda with map()",
        explanation: "Transform each element in a list",
        code: `prices = [10.99, 25.50, 5.99, 42.00]

# Add tax (8%)
with_tax = list(map(lambda p: round(p * 1.08, 2), prices))
print(f"Original: {prices}")
print(f"With tax: {with_tax}")

# Format as currency
formatted = list(map(lambda p: f"\${p:.2f}", prices))
print(f"Formatted: {formatted}")`,
      },
      {
        title: "Lambda with filter()",
        explanation: "Keep only elements meeting a condition",
        code: `numbers = [15, 22, 8, 45, 31, 9, 52]

# Keep only values > 20
big = list(filter(lambda x: x > 20, numbers))
print(f"Numbers > 20: {big}")

# Keep only even numbers
evens = list(filter(lambda x: x % 2 == 0, numbers))
print(f"Even numbers: {evens}")`,
      },
      {
        title: "Lambda for Sorting",
        explanation: "Custom sort keys with lambda",
        code: `people = [
    {"name": "Alice", "age": 30},
    {"name": "Bob", "age": 25},
    {"name": "Carol", "age": 35}
]

# Sort by age
by_age = sorted(people, key=lambda p: p["age"])
print("By age:")
for p in by_age:
    print(f"  {p['name']}: {p['age']}")

# Sort by name length
by_name_len = sorted(people, key=lambda p: len(p["name"]))
print("\\nBy name length:")
for p in by_name_len:
    print(f"  {p['name']}")`,
      },
    ],
    challenges: [
      {
        id: "m7l1c1",
        prompt: "Use map() with a lambda to convert ['hello', 'world'] to uppercase. Print the result.",
        hint: "map(lambda s: s.upper(), list)",
        validateFn: `return output.includes("HELLO") && output.includes("WORLD")`,
        solution: `words = ['hello', 'world']
upper = list(map(lambda s: s.upper(), words))
print(upper)`,
      },
      {
        id: "m7l1c2",
        prompt: "Use filter() with a lambda to keep only strings longer than 3 chars from ['hi', 'hello', 'bye', 'goodbye'].",
        hint: "filter(lambda s: len(s) > 3, list)",
        validateFn: `return output.includes("hello") && output.includes("goodbye") && !output.includes("'hi'") && !output.includes("'bye'")`,
        solution: `words = ['hi', 'hello', 'bye', 'goodbye']
long_words = list(filter(lambda s: len(s) > 3, words))
print(long_words)`,
      },
    ],
  },
  {
    module: "Functions & Apply",
    moduleSlug: "functions-apply",
    lessonNumber: 32,
    slug: "apply-map",
    title: "Apply & Map",
    badge: "practice",
    theory: `
## Series.apply()

Apply a function to each value in a Series:

\`\`\`python
df["grade"] = df["score"].apply(lambda x: "A" if x >= 90 else "B")
\`\`\`

Or with a named function:

\`\`\`python
def get_grade(score):
    if score >= 90: return "A"
    elif score >= 80: return "B"
    else: return "C"

df["grade"] = df["score"].apply(get_grade)
\`\`\`

## DataFrame.apply()

Apply function to rows or columns:

\`\`\`python
# Apply to each column (axis=0, default)
df.apply(lambda col: col.max())

# Apply to each row (axis=1)
df.apply(lambda row: row["price"] * row["qty"], axis=1)
\`\`\`

## Series.map()

Transform values using a dictionary or function:

\`\`\`python
# Using dictionary
df["grade_name"] = df["grade"].map({
    "A": "Excellent",
    "B": "Good",
    "C": "Average"
})

# Using function
df["score_doubled"] = df["score"].map(lambda x: x * 2)
\`\`\`

## apply vs map vs applymap

| Method | Use Case |
|--------|----------|
| Series.apply() | Function on each Series value |
| Series.map() | Dict mapping or function on Series |
| DataFrame.apply() | Function on rows or columns |
| DataFrame.map() | Element-wise function on entire DataFrame |

## When to Use Each

- **map()**: Simple value translations (dict) or element transformations
- **apply()**: Complex logic, access to row context
- **Vectorized ops**: Prefer \`df["a"] + df["b"]\` over apply when possible
`,
    starterCode: `# Apply function to Series
def classify_score(score):
    if score >= 90:
        return "High"
    elif score >= 75:
        return "Medium"
    else:
        return "Low"

students["category"] = students["score"].apply(classify_score)
print("With category:")
print(students[["name", "score", "category"]])
`,
    examples: [
      {
        title: "Series.apply() Examples",
        explanation: "Transform individual values",
        code: `# Apply lambda to clean names
students["clean_name"] = students["name"].apply(lambda x: x.strip().title())

# Apply complex logic
def age_group(age):
    if age < 20:
        return "Teen"
    elif age < 22:
        return "Young Adult"
    else:
        return "Adult"

students["age_group"] = students["age"].apply(age_group)
print(students[["name", "age", "age_group"]])`,
      },
      {
        title: "DataFrame.apply() with axis=1",
        explanation: "Access multiple columns in each row",
        code: `# Calculate weighted score (row-wise operation)
def weighted_score(row):
    base = row["score"]
    # Bonus for grade A
    bonus = 5 if row["grade"] == "A" else 0
    return base + bonus

students["weighted"] = students.apply(weighted_score, axis=1)
print(students[["name", "score", "grade", "weighted"]])`,
      },
      {
        title: "Using map() with Dict",
        explanation: "Translate values using a dictionary",
        code: `# Map grades to points
grade_points = {"A": 4.0, "B": 3.0, "C": 2.0}
students["gpa"] = students["grade"].map(grade_points)

# Map subject to department
dept_map = {
    "Math": "STEM",
    "Science": "STEM",
    "English": "Humanities"
}
students["department"] = students["subject"].map(dept_map)

print(students[["name", "grade", "gpa", "subject", "department"]])`,
      },
    ],
    challenges: [
      {
        id: "m7l2c1",
        prompt: "Use apply() to create a 'passed' column that is True if score >= 70, False otherwise.",
        hint: "students['score'].apply(lambda x: x >= 70)",
        validateFn: `return output.includes("True") && output.includes("False")`,
        solution: `students["passed"] = students["score"].apply(lambda x: x >= 70)
print(students[["name", "score", "passed"]])`,
      },
      {
        id: "m7l2c2",
        prompt: "Use map() with a dict to convert grades A→4, B→3, C→2. Print the result.",
        hint: "students['grade'].map({'A': 4, 'B': 3, 'C': 2})",
        validateFn: `return output.includes("4") && output.includes("3") && output.includes("2")`,
        solution: `points = {"A": 4, "B": 3, "C": 2}
students["points"] = students["grade"].map(points)
print(students[["name", "grade", "points"]])`,
      },
    ],
  },
  {
    module: "Functions & Apply",
    moduleSlug: "functions-apply",
    lessonNumber: 33,
    slug: "custom-aggregations",
    title: "Custom Aggregations",
    badge: "practice",
    theory: `
## Custom Functions in agg()

You can use custom functions with groupby().agg():

\`\`\`python
def range_func(x):
    return x.max() - x.min()

df.groupby("category")["value"].agg(range_func)
\`\`\`

## Multiple Custom Aggregations

\`\`\`python
df.groupby("category")["value"].agg([
    "sum",
    "mean",
    ("range", lambda x: x.max() - x.min()),
    ("cv", lambda x: x.std() / x.mean())  # coefficient of variation
])
\`\`\`

## Named Aggregations with Custom Functions

\`\`\`python
df.groupby("category").agg(
    total=("value", "sum"),
    average=("value", "mean"),
    spread=("value", lambda x: x.max() - x.min())
)
\`\`\`

## transform() vs agg()

- **agg()**: Returns one row per group
- **transform()**: Returns same shape as input

\`\`\`python
# agg - one value per group
df.groupby("category")["value"].agg("mean")

# transform - value for each row (group's mean)
df["group_mean"] = df.groupby("category")["value"].transform("mean")
\`\`\`

## Common transform() Uses

\`\`\`python
# Normalize within groups
df["normalized"] = df.groupby("group")["value"].transform(
    lambda x: (x - x.mean()) / x.std()
)

# Rank within groups
df["rank"] = df.groupby("group")["value"].transform("rank")

# Percentage of group total
df["pct"] = df.groupby("group")["value"].transform(
    lambda x: x / x.sum() * 100
)
\`\`\`
`,
    starterCode: `# Custom aggregation: score range per subject
def score_range(x):
    return x.max() - x.min()

by_subject = students.groupby("subject")["score"].agg([
    "mean",
    "min",
    "max",
    ("range", score_range)
])
print("Score statistics by subject:")
print(by_subject)
`,
    examples: [
      {
        title: "Custom Agg Functions",
        explanation: "Define your own aggregation logic",
        code: `def coefficient_of_variation(x):
    """CV = std / mean - measures relative variability"""
    if x.mean() == 0:
        return 0
    return (x.std() / x.mean() * 100).round(1)

stats = students.groupby("subject")["score"].agg([
    ("avg", "mean"),
    ("std", "std"),
    ("cv", coefficient_of_variation)
])
print("Score variability by subject:")
print(stats)`,
      },
      {
        title: "Using transform()",
        explanation: "Calculate group stats for each row",
        code: `# Add group mean to each row
students["subject_avg"] = students.groupby("subject")["score"].transform("mean")

# Calculate deviation from group mean
students["vs_avg"] = students["score"] - students["subject_avg"]

print(students[["name", "subject", "score", "subject_avg", "vs_avg"]])`,
      },
      {
        title: "Percentage of Group Total",
        explanation: "Calculate relative contribution within groups",
        code: `# Calculate each sale's % of category total
sales["category_total"] = sales.groupby("category")["quantity"].transform("sum")
sales["pct_of_category"] = (sales["quantity"] / sales["category_total"] * 100).round(1)

print(sales[["product", "category", "quantity", "pct_of_category"]])`,
      },
    ],
    challenges: [
      {
        id: "m7l3c1",
        prompt: "Write a custom function that returns max - min, then use it to find the score range by grade.",
        hint: "def range_fn(x): return x.max() - x.min(), then groupby('grade')['score'].agg(range_fn)",
        validateFn: `return output.includes("A") && output.includes("B") && output.includes("C")`,
        solution: `def score_range(x):
    return x.max() - x.min()

ranges = students.groupby("grade")["score"].agg(score_range)
print(ranges)`,
      },
      {
        id: "m7l3c2",
        prompt: "Use transform() to add a column showing each student's rank within their subject (by score, highest=1).",
        hint: "groupby('subject')['score'].transform('rank', ascending=False)",
        validateFn: `return output.includes("1") && output.includes("rank")`,
        solution: `students["rank_in_subject"] = students.groupby("subject")["score"].transform(
    "rank", ascending=False
)
print(students[["name", "subject", "score", "rank_in_subject"]])`,
      },
    ],
  },
  {
    module: "Functions & Apply",
    moduleSlug: "functions-apply",
    lessonNumber: 34,
    slug: "vectorized-operations",
    title: "Vectorized Operations",
    badge: "concept",
    theory: `
## Why Vectorization Matters

**Slow (loop):**
\`\`\`python
result = []
for i in range(len(df)):
    result.append(df.iloc[i]["a"] + df.iloc[i]["b"])
df["sum"] = result
\`\`\`

**Fast (vectorized):**
\`\`\`python
df["sum"] = df["a"] + df["b"]
\`\`\`

Vectorized operations are 10-100x faster because they use optimized C code under the hood.

## Vectorized Math

\`\`\`python
df["doubled"] = df["value"] * 2
df["squared"] = df["value"] ** 2
df["total"] = df["price"] * df["qty"]
df["pct"] = df["value"] / df["value"].sum() * 100
\`\`\`

## String Operations (.str accessor)

\`\`\`python
df["lower"] = df["name"].str.lower()
df["first_letter"] = df["name"].str[0]
df["has_a"] = df["name"].str.contains("a")
df["parts"] = df["text"].str.split(",")
\`\`\`

## Conditional Operations

\`\`\`python
import numpy as np

# np.where: if-else vectorized
df["label"] = np.where(df["value"] > 50, "High", "Low")

# Multiple conditions
conditions = [
    df["score"] >= 90,
    df["score"] >= 80,
    df["score"] >= 70
]
choices = ["A", "B", "C"]
df["grade"] = np.select(conditions, choices, default="F")

# pd.cut: binning
df["bucket"] = pd.cut(df["value"], bins=[0, 25, 50, 75, 100])
\`\`\`

## Comparison to apply()

| Operation | Use |
|-----------|-----|
| Math on columns | Vectorized |
| String methods | .str accessor |
| Simple conditions | np.where / np.select |
| Complex row logic | apply() |
| Need multiple columns | apply(axis=1) or vectorized |
`,
    starterCode: `import numpy as np

# Vectorized operations are much faster than loops

# Math operations
students["score_pct"] = students["score"] / 100
students["curved"] = students["score"] + 5

# Conditional with np.where
students["pass_fail"] = np.where(students["score"] >= 70, "Pass", "Fail")

print(students[["name", "score", "score_pct", "curved", "pass_fail"]])
`,
    examples: [
      {
        title: "Vectorized Math",
        explanation: "Column-wise calculations without loops",
        code: `# Calculate revenue and profit margin
sales["revenue"] = sales["price"] * sales["quantity"]
sales["unit_profit"] = sales["price"] * 0.3  # 30% margin
sales["total_profit"] = sales["unit_profit"] * sales["quantity"]

print(sales[["product", "revenue", "total_profit"]])
print(f"\\nTotal Revenue: \${sales['revenue'].sum():.2f}")`,
      },
      {
        title: "np.where for Conditionals",
        explanation: "Vectorized if-else",
        code: `import numpy as np

# Simple condition
students["level"] = np.where(students["age"] >= 21, "Senior", "Junior")

# Nested conditions (chained np.where)
students["tier"] = np.where(
    students["score"] >= 90, "Gold",
    np.where(students["score"] >= 80, "Silver", "Bronze")
)

print(students[["name", "score", "age", "level", "tier"]])`,
      },
      {
        title: "pd.cut for Binning",
        explanation: "Group continuous values into bins",
        code: `# Create score bins
bins = [0, 60, 70, 80, 90, 100]
labels = ["F", "D", "C", "B", "A"]
students["letter_grade"] = pd.cut(
    students["score"],
    bins=bins,
    labels=labels,
    right=True  # Include right edge
)

# Count per grade
print("Grade distribution:")
print(students["letter_grade"].value_counts().sort_index())`,
      },
    ],
    challenges: [
      {
        id: "m7l4c1",
        prompt: "Use np.where to create 'status' column: 'High' if score >= 85, else 'Normal'. Print results.",
        hint: "np.where(students['score'] >= 85, 'High', 'Normal')",
        validateFn: `return output.includes("High") && output.includes("Normal")`,
        solution: `import numpy as np
students["status"] = np.where(students["score"] >= 85, "High", "Normal")
print(students[["name", "score", "status"]])`,
      },
      {
        id: "m7l4c2",
        prompt: "Use pd.cut to bin ages into 'Teen' (0-19), 'Young' (20-21), 'Adult' (22+). Print the distribution.",
        hint: "pd.cut(students['age'], bins=[0, 19, 21, 100], labels=[...])",
        validateFn: `return output.includes("Teen") || output.includes("Young") || output.includes("Adult")`,
        solution: `students["age_group"] = pd.cut(
    students["age"],
    bins=[0, 19, 21, 100],
    labels=["Teen", "Young", "Adult"]
)
print(students["age_group"].value_counts())`,
      },
    ],
  },
  {
    module: "Functions & Apply",
    moduleSlug: "functions-apply",
    lessonNumber: 35,
    slug: "capstone",
    title: "Capstone Project",
    badge: "challenge",
    theory: `
## Putting It All Together

This capstone combines everything you've learned:
- Loading and exploring data
- Cleaning (missing values, types, strings)
- Filtering and selecting
- Grouping and aggregating
- Creating derived columns
- Exporting results

## The Challenge

You'll build a complete data analysis pipeline:

1. **Load** the sales data
2. **Clean** any issues (types, missing values)
3. **Enrich** with calculated fields
4. **Analyze** by grouping and aggregating
5. **Filter** to find insights
6. **Export** a summary

## Pipeline Structure

\`\`\`python
def load_data():
    # Load and initial exploration
    pass

def clean_data(df):
    # Handle missing, fix types, clean strings
    pass

def enrich_data(df):
    # Add calculated columns
    pass

def analyze(df):
    # Group, aggregate, find insights
    pass

def export_summary(df, summary):
    # Save results
    pass

# Run pipeline
raw = load_data()
clean = clean_data(raw)
enriched = enrich_data(clean)
insights = analyze(enriched)
export_summary(enriched, insights)
\`\`\`

## Success Criteria

Your solution should:
- Handle edge cases gracefully
- Use vectorized operations where possible
- Include clear print statements showing progress
- Generate a meaningful summary
`,
    starterCode: `# CAPSTONE: Complete Data Analysis Pipeline
# Goal: Analyze sales data and generate insights

# Step 1: Load data (using pre-loaded 'sales' DataFrame)
print("=== Step 1: Load & Explore ===")
print(f"Shape: {sales.shape}")
print(f"Columns: {list(sales.columns)}")
print(sales.head())

# Step 2: Clean data
print("\\n=== Step 2: Clean ===")
# Convert date to datetime
sales["date"] = pd.to_datetime(sales["date"])
print(f"Date range: {sales['date'].min()} to {sales['date'].max()}")

# Step 3: Enrich with calculated fields
print("\\n=== Step 3: Enrich ===")
sales["revenue"] = sales["price"] * sales["quantity"]
sales["day_of_week"] = sales["date"].dt.day_name()
print("Added: revenue, day_of_week")

# Step 4: Analyze
print("\\n=== Step 4: Analyze ===")
# Your analysis here...

# Step 5: Generate summary
print("\\n=== Step 5: Summary ===")
# Your summary here...
`,
    examples: [
      {
        title: "Complete Pipeline Example",
        explanation: "Full end-to-end data analysis",
        code: `import numpy as np

print("=" * 50)
print("STUDENT PERFORMANCE ANALYSIS")
print("=" * 50)

# 1. EXPLORE
print("\\n1. DATA OVERVIEW")
print(f"   Total students: {len(students)}")
print(f"   Subjects: {students['subject'].unique().tolist()}")
print(f"   Grades: {students['grade'].unique().tolist()}")

# 2. CLEAN & VALIDATE
print("\\n2. DATA QUALITY")
missing = students.isna().sum().sum()
print(f"   Missing values: {missing}")

# 3. ENRICH
students["performance"] = np.where(
    students["score"] >= 90, "Excellent",
    np.where(students["score"] >= 80, "Good", "Average")
)
students["gpa"] = students["grade"].map({"A": 4.0, "B": 3.0, "C": 2.0})

# 4. ANALYZE
print("\\n3. KEY METRICS")
print(f"   Average score: {students['score'].mean():.1f}")
print(f"   Average GPA: {students['gpa'].mean():.2f}")

print("\\n4. BY SUBJECT")
by_subject = students.groupby("subject").agg(
    count=("name", "count"),
    avg_score=("score", "mean"),
    top_score=("score", "max")
).round(1)
print(by_subject)

print("\\n5. TOP PERFORMERS")
top = students[students["performance"] == "Excellent"][["name", "subject", "score"]]
print(top)

print("\\n" + "=" * 50)
print("ANALYSIS COMPLETE")
print("=" * 50)`,
      },
      {
        title: "Sales Analysis Pipeline",
        explanation: "Business intelligence from sales data",
        code: `print("SALES ANALYSIS REPORT")
print("=" * 40)

# Prepare data
sales["revenue"] = sales["price"] * sales["quantity"]
sales["date"] = pd.to_datetime(sales["date"])

# Summary stats
print("\\nOVERALL METRICS:")
print(f"  Total Revenue: \${sales['revenue'].sum():,.2f}")
print(f"  Total Units: {sales['quantity'].sum():,}")
print(f"  Avg Order Value: \${sales['revenue'].mean():.2f}")

# By category
print("\\nBY CATEGORY:")
cat_summary = sales.groupby("category").agg(
    revenue=("revenue", "sum"),
    units=("quantity", "sum"),
    products=("product", "count")
).sort_values("revenue", ascending=False)
print(cat_summary)

# Top products
print("\\nTOP 3 PRODUCTS BY REVENUE:")
top_products = (sales.groupby("product")["revenue"]
    .sum()
    .sort_values(ascending=False)
    .head(3))
for product, rev in top_products.items():
    print(f"  {product}: \${rev:,.2f}")`,
      },
    ],
    challenges: [
      {
        id: "m7l5c1",
        prompt: "Complete the capstone: calculate total revenue by category and find which category has the highest revenue.",
        hint: "groupby('category')['revenue'].sum(), then find the max",
        validateFn: `return output.includes("Electronics") || output.includes("highest") || output.includes("revenue")`,
        solution: `# Enrich
sales["revenue"] = sales["price"] * sales["quantity"]

# Analyze by category
by_category = sales.groupby("category")["revenue"].sum()
print("Revenue by Category:")
print(by_category)

# Find highest
top_category = by_category.idxmax()
top_revenue = by_category.max()
print(f"\\nHighest: {top_category} with \${top_revenue:.2f}")`,
      },
      {
        id: "m7l5c2",
        prompt: "Create a summary showing: total students, average score, count per grade, and count per subject.",
        hint: "Use len(), mean(), and value_counts() for each metric",
        validateFn: `return output.includes("Total") && output.includes("Average") && (output.includes("Math") || output.includes("grade"))`,
        solution: `print("=== STUDENT SUMMARY ===")
print(f"Total Students: {len(students)}")
print(f"Average Score: {students['score'].mean():.1f}")

print("\\nBy Grade:")
print(students["grade"].value_counts().sort_index())

print("\\nBy Subject:")
print(students["subject"].value_counts())`,
      },
    ],
  },
];
