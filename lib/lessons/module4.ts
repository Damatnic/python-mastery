import type { Lesson } from "../types";

export const lessonsModule4: Lesson[] = [
  {
    module: "Grouping & Combining",
    moduleSlug: "grouping-combining",
    lessonNumber: 16,
    slug: "groupby-basics",
    title: "GroupBy Basics",
    badge: "concept",
    theory: `
## The Split-Apply-Combine Pattern

GroupBy works in three steps:
1. **Split** the data into groups based on a key
2. **Apply** a function to each group
3. **Combine** the results

\`\`\`python
df.groupby("category")["price"].mean()
#   Split by category
#   Apply mean() to price column
#   Combine into result Series
\`\`\`

## Basic GroupBy Operations

\`\`\`python
# Single aggregation
df.groupby("category")["amount"].sum()
df.groupby("category")["amount"].mean()
df.groupby("category")["amount"].count()
df.groupby("category")["amount"].min()
df.groupby("category")["amount"].max()

# Multiple columns
df.groupby("category")[["amount", "quantity"]].sum()
\`\`\`

## Using agg() for Multiple Aggregations

\`\`\`python
df.groupby("category")["amount"].agg(["sum", "mean", "count"])
\`\`\`

This gives you sum, mean, and count for each category in one table.

## Reset Index After GroupBy

By default, the group key becomes the index. To get it back as a column:

\`\`\`python
result = df.groupby("category")["amount"].sum().reset_index()
# Now 'category' is a regular column again
\`\`\`

## Common Use Cases

- Sales by region
- Average score by subject
- Count of orders by customer
- Total revenue by product category
`,
    starterCode: `# Group students by subject and calculate average score
avg_by_subject = students.groupby("subject")["score"].mean()
print("Average score by subject:")
print(avg_by_subject)

# Count students per grade
count_by_grade = students.groupby("grade")["name"].count()
print("\\nStudents per grade:")
print(count_by_grade)
`,
    examples: [
      {
        title: "Basic GroupBy",
        explanation: "Group and aggregate data",
        code: `# Total quantity sold per category
by_category = sales.groupby("category")["quantity"].sum()
print("Quantity by category:")
print(by_category)

# Average price per category
avg_price = sales.groupby("category")["price"].mean()
print("\\nAverage price by category:")
print(avg_price)`,
      },
      {
        title: "Multiple Aggregations",
        explanation: "Get several stats at once",
        code: `# Get sum, mean, count for quantity
stats = sales.groupby("category")["quantity"].agg(["sum", "mean", "count"])
print("Quantity statistics by category:")
print(stats)`,
      },
      {
        title: "Reset Index",
        explanation: "Turn grouped result back into a regular DataFrame",
        code: `# Group and reset
result = students.groupby("subject")["score"].mean().reset_index()
result.columns = ["subject", "avg_score"]
print("Average scores (as DataFrame):")
print(result)`,
      },
    ],
    challenges: [
      {
        id: "m4l1c1",
        prompt: "Calculate the total revenue (price * quantity) for sales, then group by category and sum. Print the result.",
        hint: "First create revenue column, then groupby('category')['revenue'].sum()",
        validateFn: `return output.includes("Electronics") && output.includes("Tools")`,
        solution: `sales["revenue"] = sales["price"] * sales["quantity"]
by_cat = sales.groupby("category")["revenue"].sum()
print(by_cat)`,
      },
      {
        id: "m4l1c2",
        prompt: "Group students by grade and find the max score in each grade. Print the result.",
        hint: "groupby('grade')['score'].max()",
        validateFn: `return output.includes("96") && output.includes("88") && output.includes("74")`,
        solution: `max_scores = students.groupby("grade")["score"].max()
print(max_scores)`,
      },
    ],
    projectChallenge: {
      threadId: "survey",
      threadTitle: "Survey Insights Report",
      taskTitle: "Average Salary by Country",
      context: "Your recruiter report needs a salary benchmark section. Calculate the average salary for each country to help set competitive compensation packages for international hiring.",
      starterCode: `import pandas as pd
import io

survey_csv = """RespondentID,Country,Age,YearsExperience,LanguageUsed,Salary,RemoteWork,Education,JobTitle
1001,USA,28,5,Python,95000,Yes,Bachelor's,Data Scientist
1002,India,24,2,Python,28000,Yes,Master's,Data Analyst
1003,USA,35,12,Python,145000,No,Master's,Senior Data Engineer
1004,Canada,29,6,R,82000,Yes,PhD,Research Scientist
1005,UK,31,8,Python,78000,Hybrid,Master's,Machine Learning Engineer
1006,Germany,27,4,SQL,65000,No,Bachelor's,Data Analyst
1007,USA,42,18,Python,175000,Yes,PhD,Principal Data Scientist
1008,India,26,3,Python,32000,Yes,Bachelor's,Data Analyst
1009,USA,33,9,Java,125000,No,Master's,Data Engineer
1010,Canada,38,14,Python,115000,Hybrid,Bachelor's,Senior Data Scientist
1011,UK,25,2,R,45000,Yes,Master's,Junior Data Scientist
1012,India,30,7,Python,48000,Yes,Master's,Data Scientist
1013,USA,29,5,Python,98000,Hybrid,Bachelor's,Data Scientist
1014,Australia,34,10,Python,105000,Yes,Master's,Machine Learning Engineer
1015,Germany,28,4,SQL,58000,No,Bachelor's,Business Analyst"""

survey = pd.read_csv(io.StringIO(survey_csv))

# Calculate and print the average salary by country
`,
      solution: `import pandas as pd
import io

survey_csv = """RespondentID,Country,Age,YearsExperience,LanguageUsed,Salary,RemoteWork,Education,JobTitle
1001,USA,28,5,Python,95000,Yes,Bachelor's,Data Scientist
1002,India,24,2,Python,28000,Yes,Master's,Data Analyst
1003,USA,35,12,Python,145000,No,Master's,Senior Data Engineer
1004,Canada,29,6,R,82000,Yes,PhD,Research Scientist
1005,UK,31,8,Python,78000,Hybrid,Master's,Machine Learning Engineer
1006,Germany,27,4,SQL,65000,No,Bachelor's,Data Analyst
1007,USA,42,18,Python,175000,Yes,PhD,Principal Data Scientist
1008,India,26,3,Python,32000,Yes,Bachelor's,Data Analyst
1009,USA,33,9,Java,125000,No,Master's,Data Engineer
1010,Canada,38,14,Python,115000,Hybrid,Bachelor's,Senior Data Scientist
1011,UK,25,2,R,45000,Yes,Master's,Junior Data Scientist
1012,India,30,7,Python,48000,Yes,Master's,Data Scientist
1013,USA,29,5,Python,98000,Hybrid,Bachelor's,Data Scientist
1014,Australia,34,10,Python,105000,Yes,Master's,Machine Learning Engineer
1015,Germany,28,4,SQL,58000,No,Bachelor's,Business Analyst"""

survey = pd.read_csv(io.StringIO(survey_csv))

# Calculate and print the average salary by country
avg_salary = survey.groupby("Country")["Salary"].mean()
print("Average Salary by Country:")
print(avg_salary.sort_values(ascending=False))`,
      validateFn: `return output.includes("USA") && output.includes("India") && output.includes("Country")`,
      hint: "Use survey.groupby('Country')['Salary'].mean() to get average salary per country",
      xpReward: 50,
    },
  },
  {
    module: "Grouping & Combining",
    moduleSlug: "grouping-combining",
    lessonNumber: 17,
    slug: "multi-column-groupby",
    title: "Multi-Column GroupBy",
    badge: "practice",
    theory: `
## Grouping by Multiple Columns

\`\`\`python
df.groupby(["region", "category"])["sales"].sum()
\`\`\`

This creates a hierarchical index with all combinations.

## Multiple Aggregations on Multiple Columns

\`\`\`python
df.groupby("category").agg({
    "price": "mean",
    "quantity": "sum",
    "date": "count"
})
\`\`\`

## Named Aggregations (Clean Column Names)

\`\`\`python
df.groupby("category").agg(
    avg_price=("price", "mean"),
    total_qty=("quantity", "sum"),
    num_orders=("date", "count")
)
\`\`\`

This gives you descriptive column names in the result.

## Working with Multi-Index Results

\`\`\`python
# After multi-column groupby
result = df.groupby(["region", "category"])["sales"].sum()

# Reset to flat DataFrame
flat = result.reset_index()

# Or unstack for pivot-style view
pivoted = result.unstack()
\`\`\`

## Size vs Count

\`\`\`python
df.groupby("category").size()   # Count all rows
df.groupby("category").count()  # Count non-NaN per column
\`\`\`
`,
    starterCode: `# Group by multiple columns
by_grade_subject = students.groupby(["grade", "subject"])["score"].mean()
print("Average score by grade and subject:")
print(by_grade_subject)

# Reset to see as table
result = by_grade_subject.reset_index()
print("\\nAs DataFrame:")
print(result)
`,
    examples: [
      {
        title: "Multi-Column GroupBy",
        explanation: "Group by two columns at once",
        code: `# Group sales by category and then analyze
grouped = sales.groupby("category").agg({
    "price": ["mean", "min", "max"],
    "quantity": "sum"
})
print(grouped)`,
      },
      {
        title: "Named Aggregations",
        explanation: "Give your aggregated columns meaningful names",
        code: `result = sales.groupby("category").agg(
    avg_price=("price", "mean"),
    total_units=("quantity", "sum"),
    product_count=("product", "count")
)
print(result)`,
      },
      {
        title: "Dictionary Aggregation",
        explanation: "Different aggregations for different columns",
        code: `result = students.groupby("subject").agg({
    "score": ["mean", "std"],
    "age": "mean",
    "name": "count"
}).reset_index()
print(result)`,
      },
    ],
    challenges: [
      {
        id: "m4l2c1",
        prompt: "Group students by both 'grade' and 'subject', count students in each group, and print the result.",
        hint: "groupby(['grade', 'subject']).size()",
        validateFn: `return output.includes("A") && output.includes("Math")`,
        solution: `counts = students.groupby(["grade", "subject"]).size()
print(counts)`,
      },
      {
        id: "m4l2c2",
        prompt: "Calculate both the mean and max score by subject using named aggregations.",
        hint: "Use .agg(mean_score=('score', 'mean'), max_score=('score', 'max'))",
        validateFn: `return output.includes("mean") && output.includes("max") && output.includes("Math")`,
        solution: `result = students.groupby("subject").agg(
    mean_score=("score", "mean"),
    max_score=("score", "max")
)
print(result)`,
      },
    ],
    projectChallenge: {
      threadId: "survey",
      threadTitle: "Survey Insights Report",
      taskTitle: "Language Popularity by Country",
      context: "You need to understand programming language trends across regions. Group the survey data by Country and LanguageUsed to count how many respondents use each language in each country.",
      starterCode: `import pandas as pd
import io

survey_csv = """RespondentID,Country,Age,YearsExperience,LanguageUsed,Salary,RemoteWork,Education,JobTitle
1001,USA,28,5,Python,95000,Yes,Bachelor's,Data Scientist
1002,India,24,2,Python,28000,Yes,Master's,Data Analyst
1003,USA,35,12,Python,145000,No,Master's,Senior Data Engineer
1004,Canada,29,6,R,82000,Yes,PhD,Research Scientist
1005,UK,31,8,Python,78000,Hybrid,Master's,Machine Learning Engineer
1006,Germany,27,4,SQL,65000,No,Bachelor's,Data Analyst
1007,USA,42,18,Python,175000,Yes,PhD,Principal Data Scientist
1008,India,26,3,Python,32000,Yes,Bachelor's,Data Analyst
1009,USA,33,9,Java,125000,No,Master's,Data Engineer
1010,Canada,38,14,Python,115000,Hybrid,Bachelor's,Senior Data Scientist
1011,UK,25,2,R,45000,Yes,Master's,Junior Data Scientist
1012,India,30,7,Python,48000,Yes,Master's,Data Scientist
1013,USA,29,5,Python,98000,Hybrid,Bachelor's,Data Scientist
1014,Australia,34,10,Python,105000,Yes,Master's,Machine Learning Engineer
1015,Germany,28,4,SQL,58000,No,Bachelor's,Business Analyst"""

survey = pd.read_csv(io.StringIO(survey_csv))

# Group by Country and LanguageUsed, count respondents in each group
`,
      solution: `import pandas as pd
import io

survey_csv = """RespondentID,Country,Age,YearsExperience,LanguageUsed,Salary,RemoteWork,Education,JobTitle
1001,USA,28,5,Python,95000,Yes,Bachelor's,Data Scientist
1002,India,24,2,Python,28000,Yes,Master's,Data Analyst
1003,USA,35,12,Python,145000,No,Master's,Senior Data Engineer
1004,Canada,29,6,R,82000,Yes,PhD,Research Scientist
1005,UK,31,8,Python,78000,Hybrid,Master's,Machine Learning Engineer
1006,Germany,27,4,SQL,65000,No,Bachelor's,Data Analyst
1007,USA,42,18,Python,175000,Yes,PhD,Principal Data Scientist
1008,India,26,3,Python,32000,Yes,Bachelor's,Data Analyst
1009,USA,33,9,Java,125000,No,Master's,Data Engineer
1010,Canada,38,14,Python,115000,Hybrid,Bachelor's,Senior Data Scientist
1011,UK,25,2,R,45000,Yes,Master's,Junior Data Scientist
1012,India,30,7,Python,48000,Yes,Master's,Data Scientist
1013,USA,29,5,Python,98000,Hybrid,Bachelor's,Data Scientist
1014,Australia,34,10,Python,105000,Yes,Master's,Machine Learning Engineer
1015,Germany,28,4,SQL,58000,No,Bachelor's,Business Analyst"""

survey = pd.read_csv(io.StringIO(survey_csv))

# Group by Country and LanguageUsed, count respondents in each group
language_counts = survey.groupby(["Country", "LanguageUsed"]).size().reset_index(name="count")
print("Language Usage by Country:")
print(language_counts)`,
      validateFn: `return output.includes("Country") && output.includes("LanguageUsed") && output.includes("Python")`,
      hint: "Use groupby(['Country', 'LanguageUsed']).size() to count respondents in each combination",
      xpReward: 50,
    },
  },
  {
    module: "Grouping & Combining",
    moduleSlug: "grouping-combining",
    lessonNumber: 18,
    slug: "merge-join",
    title: "Merge & Join",
    badge: "concept",
    theory: `
## pd.merge() — Combining DataFrames

Think of merge like a SQL JOIN. You combine two tables based on matching values.

\`\`\`python
pd.merge(left_df, right_df, on="common_column")
\`\`\`

## Join Types (how parameter)

| Type | Keeps |
|------|-------|
| inner | Only matching rows (default) |
| left | All from left + matches from right |
| right | All from right + matches from left |
| outer | All rows from both |

\`\`\`python
pd.merge(orders, customers, on="customer_id", how="left")
\`\`\`

## Different Column Names

When the join columns have different names:

\`\`\`python
pd.merge(orders, customers,
         left_on="cust_id",
         right_on="customer_id")
\`\`\`

## Handling Duplicate Column Names

When both DataFrames have columns with the same name (that aren't join keys):

\`\`\`python
pd.merge(df1, df2, on="id", suffixes=("_left", "_right"))
# Columns become: value_left, value_right
\`\`\`

## Merge Patterns

\`\`\`python
# Add customer details to orders
orders_with_details = pd.merge(orders, customers, on="customer_id")

# Find orders without customers (left join, then filter NaN)
all_orders = pd.merge(orders, customers, on="customer_id", how="left")
orphan_orders = all_orders[all_orders["customer_name"].isna()]

# Find all combinations (cross join)
pd.merge(df1, df2, how="cross")
\`\`\`
`,
    starterCode: `import io

# Create two related DataFrames
orders_csv = """order_id,product,customer_id,amount
1,Laptop,101,999
2,Mouse,102,25
3,Keyboard,101,75
4,Monitor,103,350"""

customers_csv = """customer_id,name,city
101,Alice,NYC
102,Bob,LA
104,Carol,Chicago"""

orders = pd.read_csv(io.StringIO(orders_csv))
customers = pd.read_csv(io.StringIO(customers_csv))

print("Orders:")
print(orders)
print("\\nCustomers:")
print(customers)
`,
    examples: [
      {
        title: "Inner Join (Default)",
        explanation: "Only keep rows that match in both tables",
        code: `import io
orders_csv = """order_id,customer_id,amount
1,101,999
2,102,25
3,103,75"""

customers_csv = """customer_id,name
101,Alice
102,Bob"""

orders = pd.read_csv(io.StringIO(orders_csv))
customers = pd.read_csv(io.StringIO(customers_csv))

# Inner join - only matching customer_ids
result = pd.merge(orders, customers, on="customer_id")
print("Inner join (only matches):")
print(result)`,
      },
      {
        title: "Left Join",
        explanation: "Keep all rows from left table",
        code: `import io
orders_csv = """order_id,customer_id,amount
1,101,999
2,102,25
3,103,75"""

customers_csv = """customer_id,name
101,Alice
102,Bob"""

orders = pd.read_csv(io.StringIO(orders_csv))
customers = pd.read_csv(io.StringIO(customers_csv))

# Left join - keep all orders
result = pd.merge(orders, customers, on="customer_id", how="left")
print("Left join (all orders):")
print(result)`,
      },
      {
        title: "Using Suffixes",
        explanation: "Handle duplicate column names",
        code: `import io
jan = pd.DataFrame({"product": ["A", "B"], "sales": [100, 200]})
feb = pd.DataFrame({"product": ["A", "B"], "sales": [150, 180]})

merged = pd.merge(jan, feb, on="product", suffixes=("_jan", "_feb"))
print("With suffixes:")
print(merged)`,
      },
    ],
    challenges: [
      {
        id: "m4l3c1",
        prompt: "Merge students with a grades_info DataFrame containing grade descriptions. Use the 'grade' column as the key.",
        hint: "pd.merge(students, grades_info, on='grade')",
        validateFn: `return output.includes("Alice") && output.includes("Excellent")`,
        solution: `import io
grades_csv = """grade,description
A,Excellent
B,Good
C,Average"""
grades_info = pd.read_csv(io.StringIO(grades_csv))
result = pd.merge(students, grades_info, on="grade")
print(result)`,
      },
      {
        id: "m4l3c2",
        prompt: "Perform a left join between sales and a category_info table. Show all sales even if category info is missing.",
        hint: "pd.merge(..., how='left')",
        validateFn: `return output.includes("Widget")`,
        solution: `import io
cat_csv = """category,manager
Electronics,Alice
Tools,Bob"""
cat_info = pd.read_csv(io.StringIO(cat_csv))
result = pd.merge(sales, cat_info, on="category", how="left")
print(result)`,
      },
    ],
    projectChallenge: {
      threadId: "survey",
      threadTitle: "Survey Insights Report",
      taskTitle: "Enrich Survey with Region Data",
      context: "Your report needs regional context. Create a country_info table with regions (North America, Europe, Asia, Oceania) and merge it with the survey data to enable regional salary analysis.",
      starterCode: `import pandas as pd
import io

survey_csv = """RespondentID,Country,Age,YearsExperience,LanguageUsed,Salary,RemoteWork,Education,JobTitle
1001,USA,28,5,Python,95000,Yes,Bachelor's,Data Scientist
1002,India,24,2,Python,28000,Yes,Master's,Data Analyst
1003,USA,35,12,Python,145000,No,Master's,Senior Data Engineer
1004,Canada,29,6,R,82000,Yes,PhD,Research Scientist
1005,UK,31,8,Python,78000,Hybrid,Master's,Machine Learning Engineer
1006,Germany,27,4,SQL,65000,No,Bachelor's,Data Analyst
1007,USA,42,18,Python,175000,Yes,PhD,Principal Data Scientist
1008,India,26,3,Python,32000,Yes,Bachelor's,Data Analyst
1009,USA,33,9,Java,125000,No,Master's,Data Engineer
1010,Canada,38,14,Python,115000,Hybrid,Bachelor's,Senior Data Scientist
1011,UK,25,2,R,45000,Yes,Master's,Junior Data Scientist
1012,India,30,7,Python,48000,Yes,Master's,Data Scientist
1013,USA,29,5,Python,98000,Hybrid,Bachelor's,Data Scientist
1014,Australia,34,10,Python,105000,Yes,Master's,Machine Learning Engineer
1015,Germany,28,4,SQL,58000,No,Bachelor's,Business Analyst"""

survey = pd.read_csv(io.StringIO(survey_csv))

# Create a country_info DataFrame with Country and Region columns
# Then merge it with the survey data
`,
      solution: `import pandas as pd
import io

survey_csv = """RespondentID,Country,Age,YearsExperience,LanguageUsed,Salary,RemoteWork,Education,JobTitle
1001,USA,28,5,Python,95000,Yes,Bachelor's,Data Scientist
1002,India,24,2,Python,28000,Yes,Master's,Data Analyst
1003,USA,35,12,Python,145000,No,Master's,Senior Data Engineer
1004,Canada,29,6,R,82000,Yes,PhD,Research Scientist
1005,UK,31,8,Python,78000,Hybrid,Master's,Machine Learning Engineer
1006,Germany,27,4,SQL,65000,No,Bachelor's,Data Analyst
1007,USA,42,18,Python,175000,Yes,PhD,Principal Data Scientist
1008,India,26,3,Python,32000,Yes,Bachelor's,Data Analyst
1009,USA,33,9,Java,125000,No,Master's,Data Engineer
1010,Canada,38,14,Python,115000,Hybrid,Bachelor's,Senior Data Scientist
1011,UK,25,2,R,45000,Yes,Master's,Junior Data Scientist
1012,India,30,7,Python,48000,Yes,Master's,Data Scientist
1013,USA,29,5,Python,98000,Hybrid,Bachelor's,Data Scientist
1014,Australia,34,10,Python,105000,Yes,Master's,Machine Learning Engineer
1015,Germany,28,4,SQL,58000,No,Bachelor's,Business Analyst"""

survey = pd.read_csv(io.StringIO(survey_csv))

# Create a country_info DataFrame with Country and Region columns
country_info = pd.DataFrame({
    "Country": ["USA", "Canada", "UK", "Germany", "India", "Australia"],
    "Region": ["North America", "North America", "Europe", "Europe", "Asia", "Oceania"]
})

# Merge with survey data
enriched = pd.merge(survey, country_info, on="Country")
print("Survey with Region data:")
print(enriched[["RespondentID", "Country", "Region", "Salary"]].head(10))`,
      validateFn: `return output.includes("Region") && output.includes("North America") && output.includes("Europe")`,
      hint: "Create a DataFrame with Country and Region columns, then use pd.merge() to join on Country",
      xpReward: 50,
    },
  },
  {
    module: "Grouping & Combining",
    moduleSlug: "grouping-combining",
    lessonNumber: 19,
    slug: "concat-pivot",
    title: "Concat & Pivot",
    badge: "practice",
    theory: `
## pd.concat() — Stacking DataFrames

Stack DataFrames vertically (add more rows):

\`\`\`python
combined = pd.concat([df1, df2, df3])
combined = pd.concat([df1, df2], ignore_index=True)  # Fresh index
\`\`\`

Stack horizontally (add more columns):

\`\`\`python
combined = pd.concat([df1, df2], axis=1)
\`\`\`

## Pivot Tables

Transform long data into wide format:

\`\`\`python
df.pivot_table(
    values="amount",      # What to aggregate
    index="region",       # Rows
    columns="product",    # Columns
    aggfunc="sum"         # How to aggregate
)
\`\`\`

## Pivot vs Pivot_table

- **pivot()**: Simple reshape, no aggregation (will error on duplicates)
- **pivot_table()**: Handles duplicates by aggregating

\`\`\`python
# Simple pivot (unique combinations only)
df.pivot(index="date", columns="product", values="sales")

# Pivot table (aggregates duplicates)
df.pivot_table(index="date", columns="product", values="sales", aggfunc="sum")
\`\`\`

## Common Pivot Patterns

\`\`\`python
# Sales by region and product
df.pivot_table(index="region", columns="product", values="sales", aggfunc="sum")

# Multiple aggregations
df.pivot_table(index="region", values="sales", aggfunc=["sum", "mean", "count"])

# Fill missing values
df.pivot_table(..., fill_value=0)
\`\`\`

## Melt — Opposite of Pivot

Unpivot from wide to long format:

\`\`\`python
pd.melt(df, id_vars=["date"], value_vars=["A", "B", "C"])
\`\`\`
`,
    starterCode: `import io

# Create DataFrames to concatenate
q1 = pd.DataFrame({
    "month": ["Jan", "Feb", "Mar"],
    "sales": [100, 120, 130]
})
q2 = pd.DataFrame({
    "month": ["Apr", "May", "Jun"],
    "sales": [140, 150, 145]
})

# Stack them vertically
full_year = pd.concat([q1, q2], ignore_index=True)
print("Combined data:")
print(full_year)
`,
    examples: [
      {
        title: "Concat DataFrames",
        explanation: "Stack DataFrames to combine rows",
        code: `import io

# Two batches of data
batch1 = pd.DataFrame({"id": [1, 2], "value": [10, 20]})
batch2 = pd.DataFrame({"id": [3, 4], "value": [30, 40]})

# Combine with fresh index
combined = pd.concat([batch1, batch2], ignore_index=True)
print(combined)`,
      },
      {
        title: "Basic Pivot Table",
        explanation: "Reshape data from long to wide format",
        code: `# Pivot students: subjects as columns, grades as index
pivot = students.pivot_table(
    values="score",
    index="grade",
    columns="subject",
    aggfunc="mean"
)
print("Average score by grade and subject:")
print(pivot.round(1))`,
      },
      {
        title: "Pivot with Multiple Aggregations",
        explanation: "Get several statistics in pivot format",
        code: `# Multiple aggregations for sales
pivot = sales.pivot_table(
    values="quantity",
    index="category",
    aggfunc=["sum", "mean", "count"]
)
print(pivot)`,
      },
    ],
    challenges: [
      {
        id: "m4l4c1",
        prompt: "Create a pivot table showing average score by subject (as rows). Print the result.",
        hint: "pivot_table(values='score', index='subject', aggfunc='mean')",
        validateFn: `return output.includes("Math") && output.includes("Science") && output.includes("English")`,
        solution: `pivot = students.pivot_table(
    values="score",
    index="subject",
    aggfunc="mean"
)
print(pivot)`,
      },
      {
        id: "m4l4c2",
        prompt: "Concat the first 3 rows and last 3 rows of students into a new DataFrame with a fresh index.",
        hint: "Use students.head(3) and students.tail(3) with concat",
        validateFn: `return output.includes("Alice") && output.includes("Hank") && output.includes("0")`,
        solution: `first3 = students.head(3)
last3 = students.tail(3)
combined = pd.concat([first3, last3], ignore_index=True)
print(combined)`,
      },
    ],
    projectChallenge: {
      threadId: "survey",
      threadTitle: "Survey Insights Report",
      taskTitle: "Salary Pivot by Country and Education",
      context: "Create a salary comparison matrix for your report. Build a pivot table showing average salary with Country as rows and Education level as columns to identify compensation patterns.",
      starterCode: `import pandas as pd
import io

survey_csv = """RespondentID,Country,Age,YearsExperience,LanguageUsed,Salary,RemoteWork,Education,JobTitle
1001,USA,28,5,Python,95000,Yes,Bachelor's,Data Scientist
1002,India,24,2,Python,28000,Yes,Master's,Data Analyst
1003,USA,35,12,Python,145000,No,Master's,Senior Data Engineer
1004,Canada,29,6,R,82000,Yes,PhD,Research Scientist
1005,UK,31,8,Python,78000,Hybrid,Master's,Machine Learning Engineer
1006,Germany,27,4,SQL,65000,No,Bachelor's,Data Analyst
1007,USA,42,18,Python,175000,Yes,PhD,Principal Data Scientist
1008,India,26,3,Python,32000,Yes,Bachelor's,Data Analyst
1009,USA,33,9,Java,125000,No,Master's,Data Engineer
1010,Canada,38,14,Python,115000,Hybrid,Bachelor's,Senior Data Scientist
1011,UK,25,2,R,45000,Yes,Master's,Junior Data Scientist
1012,India,30,7,Python,48000,Yes,Master's,Data Scientist
1013,USA,29,5,Python,98000,Hybrid,Bachelor's,Data Scientist
1014,Australia,34,10,Python,105000,Yes,Master's,Machine Learning Engineer
1015,Germany,28,4,SQL,58000,No,Bachelor's,Business Analyst"""

survey = pd.read_csv(io.StringIO(survey_csv))

# Create a pivot table: Country as rows, Education as columns, average Salary as values
`,
      solution: `import pandas as pd
import io

survey_csv = """RespondentID,Country,Age,YearsExperience,LanguageUsed,Salary,RemoteWork,Education,JobTitle
1001,USA,28,5,Python,95000,Yes,Bachelor's,Data Scientist
1002,India,24,2,Python,28000,Yes,Master's,Data Analyst
1003,USA,35,12,Python,145000,No,Master's,Senior Data Engineer
1004,Canada,29,6,R,82000,Yes,PhD,Research Scientist
1005,UK,31,8,Python,78000,Hybrid,Master's,Machine Learning Engineer
1006,Germany,27,4,SQL,65000,No,Bachelor's,Data Analyst
1007,USA,42,18,Python,175000,Yes,PhD,Principal Data Scientist
1008,India,26,3,Python,32000,Yes,Bachelor's,Data Analyst
1009,USA,33,9,Java,125000,No,Master's,Data Engineer
1010,Canada,38,14,Python,115000,Hybrid,Bachelor's,Senior Data Scientist
1011,UK,25,2,R,45000,Yes,Master's,Junior Data Scientist
1012,India,30,7,Python,48000,Yes,Master's,Data Scientist
1013,USA,29,5,Python,98000,Hybrid,Bachelor's,Data Scientist
1014,Australia,34,10,Python,105000,Yes,Master's,Machine Learning Engineer
1015,Germany,28,4,SQL,58000,No,Bachelor's,Business Analyst"""

survey = pd.read_csv(io.StringIO(survey_csv))

# Create a pivot table: Country as rows, Education as columns, average Salary as values
salary_pivot = survey.pivot_table(
    values="Salary",
    index="Country",
    columns="Education",
    aggfunc="mean"
)
print("Average Salary by Country and Education:")
print(salary_pivot.round(0))`,
      validateFn: `return output.includes("Country") && output.includes("Bachelor") && output.includes("Master") && output.includes("USA")`,
      hint: "Use pivot_table(values='Salary', index='Country', columns='Education', aggfunc='mean')",
      xpReward: 50,
    },
  },
  {
    module: "Grouping & Combining",
    moduleSlug: "grouping-combining",
    lessonNumber: 20,
    slug: "fixed-width-files",
    title: "Fixed-Width Files",
    badge: "concept",
    theory: `
## What Are Fixed-Width Files?

Unlike CSVs (comma-separated), fixed-width files use character positions. Each field occupies a set number of characters:

\`\`\`
NAMEAGECITY
Alice 25NYC
Bob   30LA
Carol 28CHI
\`\`\`

Name is characters 0-5, Age is 6-7, City is 8-11.

## Reading Fixed-Width with pd.read_fwf()

\`\`\`python
# Auto-detect column widths (sometimes works)
df = pd.read_fwf("data.txt")

# Specify column positions manually
df = pd.read_fwf("data.txt",
    colspecs=[(0, 6), (6, 8), (8, 12)],
    names=["name", "age", "city"])

# Using widths (simpler if columns are evenly spaced)
df = pd.read_fwf("data.txt",
    widths=[6, 2, 4],
    names=["name", "age", "city"])
\`\`\`

## colspecs Format

List of (start, end) tuples. Character positions are 0-indexed:

\`\`\`python
colspecs = [
    (0, 10),    # Characters 0-9 (10 chars)
    (10, 15),   # Characters 10-14 (5 chars)
    (15, 25)    # Characters 15-24 (10 chars)
]
\`\`\`

## Common Parameters

\`\`\`python
pd.read_fwf(filepath,
    colspecs=[(0,5), (5,10)],  # Column positions
    widths=[5, 5],              # Alternative: column widths
    names=["col1", "col2"],     # Column names
    skiprows=1,                 # Skip header row
    na_values=["", "  "],       # Treat as missing
    dtype={"zip": str}          # Force data types
)
\`\`\`

## When You'll See Fixed-Width Files

- Government data (census, IRS)
- Mainframe exports
- Legacy banking systems
- Log files with fixed formats
`,
    starterCode: `import io

# Fixed-width data: Name (10 chars), Age (3 chars), City (10 chars)
fwf_data = """Name      Age City
Alice     25  New York
Bob       30  LA
Carol     28  Chicago"""

# Read with column specifications
df = pd.read_fwf(
    io.StringIO(fwf_data),
    colspecs=[(0, 10), (10, 14), (14, 24)],
    names=["name", "age", "city"],
    skiprows=1
)
print(df)
`,
    examples: [
      {
        title: "Reading Fixed-Width Data",
        explanation: "Parse data with specific column positions",
        code: `import io

# Fixed positions: ID(0-4), Name(4-14), Score(14-17)
data = """0001Alice     095
0002Bob       082
0003Carol     091"""

df = pd.read_fwf(
    io.StringIO(data),
    colspecs=[(0, 4), (4, 14), (14, 17)],
    names=["id", "name", "score"]
)
df["name"] = df["name"].str.strip()
print(df)`,
      },
      {
        title: "Using Widths Instead of Colspecs",
        explanation: "Simpler syntax when you know column widths",
        code: `import io

# Each field has a fixed width
data = """AA1001Alice
BB2002Bob
CC3003Carol"""

df = pd.read_fwf(
    io.StringIO(data),
    widths=[2, 4, 5],
    names=["code", "id", "name"]
)
print(df)`,
      },
      {
        title: "Auto-Detect Columns",
        explanation: "Let pandas figure out the columns",
        code: `import io

data = """Name      Age  City
Alice     25   NYC
Bob       30   LA
Carol     28   CHI"""

# Auto-detect (works if columns are clearly separated)
df = pd.read_fwf(io.StringIO(data))
print(df)`,
      },
    ],
    challenges: [
      {
        id: "m4l5c1",
        prompt: "Read this fixed-width string where Product is chars 0-10, Price is 10-16, Qty is 16-20. Print the result.",
        hint: "Use colspecs=[(0,10), (10,16), (16,20)]",
        validateFn: `return output.includes("Widget") && output.includes("29.99") || output.includes("29")`,
        solution: `import io
data = """Widget A  29.99 150
Widget B  49.99 80"""

df = pd.read_fwf(
    io.StringIO(data),
    colspecs=[(0, 10), (10, 16), (16, 20)],
    names=["product", "price", "qty"]
)
print(df)`,
      },
      {
        id: "m4l5c2",
        prompt: "Read fixed-width data using widths=[5, 3, 8] for ID, Age, and City columns.",
        hint: "pd.read_fwf(..., widths=[5, 3, 8], names=['id', 'age', 'city'])",
        validateFn: `return output.includes("id") && output.includes("age") && output.includes("city")`,
        solution: `import io
data = """00001 25 New York
00002 30 LA
00003 28 Chicago"""

df = pd.read_fwf(
    io.StringIO(data),
    widths=[5, 3, 8],
    names=["id", "age", "city"]
)
print(df)`,
      },
    ],
    projectChallenge: {
      threadId: "survey",
      threadTitle: "Survey Insights Report",
      taskTitle: "Parse Legacy HR System Export",
      context: "Your company's legacy HR system exports employee data in fixed-width format. Parse this sample record to integrate historical employee data with your modern survey analysis.",
      starterCode: `import pandas as pd
import io

# Legacy HR system export (fixed-width format)
# EmpID: 6 chars, Name: 15 chars, Dept: 10 chars, Salary: 8 chars
hr_data = """001001John Smith     Engineering 85000
001002Jane Doe       DataScience 92000
001003Bob Wilson     Analytics   78000   """

# Parse this fixed-width data and print the result
`,
      solution: `import pandas as pd
import io

# Legacy HR system export (fixed-width format)
# EmpID: 6 chars, Name: 15 chars, Dept: 10 chars, Salary: 8 chars
hr_data = """001001John Smith     Engineering 85000
001002Jane Doe       DataScience 92000
001003Bob Wilson     Analytics   78000   """

# Parse this fixed-width data and print the result
hr_df = pd.read_fwf(
    io.StringIO(hr_data),
    colspecs=[(0, 6), (6, 21), (21, 33), (33, 41)],
    names=["emp_id", "name", "department", "salary"]
)
hr_df["name"] = hr_df["name"].str.strip()
hr_df["department"] = hr_df["department"].str.strip()
print("Parsed HR Data:")
print(hr_df)`,
      validateFn: `return output.includes("emp_id") && output.includes("John") && output.includes("Engineering")`,
      hint: "Use pd.read_fwf() with colspecs=[(0,6), (6,21), (21,33), (33,41)] to define column positions",
      xpReward: 50,
    },
  },
];
