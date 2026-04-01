import type { Lesson } from "../types";

export const lessonsModule3: Lesson[] = [
  {
    module: "Data Cleaning",
    moduleSlug: "data-cleaning",
    lessonNumber: 11,
    slug: "missing-data",
    title: "Missing Data",
    badge: "concept",
    theory: `
## Detecting Missing Values

In pandas, missing values are represented as \`NaN\` (Not a Number) or \`None\`.

\`\`\`python
df.isna()        # DataFrame of True/False
df.isna().sum()  # Count of NaN per column
df.isna().any()  # True if column has any NaN
\`\`\`

## Handling Missing Data

**Option 1: Drop rows with missing values**
\`\`\`python
df.dropna()                    # Drop any row with NaN
df.dropna(subset=["name"])     # Drop only if 'name' is NaN
df.dropna(how="all")           # Drop only if ALL values are NaN
df.dropna(thresh=3)            # Keep rows with at least 3 non-NaN
\`\`\`

**Option 2: Fill missing values**
\`\`\`python
df.fillna(0)                   # Fill all NaN with 0
df.fillna({"age": 0, "city": "Unknown"})  # Different values per column
df["age"].fillna(df["age"].mean())  # Fill with mean
df.fillna(method="ffill")      # Forward fill (use previous value)
df.fillna(method="bfill")      # Backward fill (use next value)
\`\`\`

## Checking for Missing Data

\`\`\`python
# Total missing values
print(df.isna().sum().sum())

# Percentage missing per column
print(df.isna().mean() * 100)

# Rows with any missing values
rows_with_na = df[df.isna().any(axis=1)]
\`\`\`

## When to Drop vs Fill

**Drop when:**
- Few rows have missing data (< 5%)
- The missing data is random
- You have plenty of data

**Fill when:**
- Many rows would be lost
- You have a sensible default
- Missing values have meaning (0, "Unknown")
`,
    starterCode: `import io

# Sample data with missing values
csv_data = """name,age,city,salary
Alice,25,NYC,75000
Bob,,LA,
Carol,28,,78000
Dave,35,Chicago,82000
Eve,,Boston,71000"""

df = pd.read_csv(io.StringIO(csv_data))
print("Original data:")
print(df)
print("\\nMissing values per column:")
print(df.isna().sum())
`,
    examples: [
      {
        title: "Detecting Missing Values",
        explanation: "Find where NaN values exist",
        code: `import io
csv_data = """name,age,score
Alice,25,95
Bob,,82
Carol,28,
Dave,,74"""

df = pd.read_csv(io.StringIO(csv_data))
print("Data:")
print(df)
print("\\nIs NA?:")
print(df.isna())
print("\\nCount per column:")
print(df.isna().sum())`,
      },
      {
        title: "Dropping Missing Values",
        explanation: "Remove rows with NaN",
        code: `import io
csv_data = """name,age,score
Alice,25,95
Bob,,82
Carol,28,
Dave,30,74"""

df = pd.read_csv(io.StringIO(csv_data))
print("Original rows:", len(df))

# Drop any row with NaN
clean = df.dropna()
print("After dropna:", len(clean))
print(clean)`,
      },
      {
        title: "Filling Missing Values",
        explanation: "Replace NaN with meaningful values",
        code: `import io
csv_data = """name,age,score
Alice,25,95
Bob,,82
Carol,28,
Dave,30,74"""

df = pd.read_csv(io.StringIO(csv_data))
# Fill age with median, score with 0
df["age"] = df["age"].fillna(df["age"].median())
df["score"] = df["score"].fillna(0)
print(df)`,
      },
    ],
    challenges: [
      {
        id: "m3l1c1",
        prompt: "Count the total number of missing values in the students DataFrame and print it.",
        hint: "Use isna().sum().sum() to get total count",
        validateFn: `return output.includes("0")`,
        solution: `total_missing = students.isna().sum().sum()
print(f"Total missing values: {total_missing}")`,
      },
      {
        id: "m3l1c2",
        prompt: "Create a DataFrame with some NaN values, then fill all NaN with the string 'MISSING' and print it.",
        hint: "Use fillna('MISSING')",
        validateFn: `return output.includes("MISSING")`,
        solution: `import io
csv_data = """name,city
Alice,NYC
Bob,
Carol,LA"""
df = pd.read_csv(io.StringIO(csv_data))
df = df.fillna("MISSING")
print(df)`,
      },
    ],
    projectChallenge: {
      threadId: "survey",
      threadTitle: "Survey Insights Report",
      taskTitle: "Check for Missing Survey Data",
      context: "You're a tech recruiter analyzing developer survey responses. Before building your insights report, you need to verify data quality by checking for any missing values in the dataset.",
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

# Check for missing values per column and print the counts
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

# Check for missing values per column and print the counts
print("Missing values per column:")
print(survey.isna().sum())
print(f"\\nTotal missing values: {survey.isna().sum().sum()}")`,
      validateFn: `return output.includes("Missing values") && output.includes("0")`,
      hint: "Use survey.isna().sum() to count missing values per column",
      xpReward: 50,
    },
  },
  {
    module: "Data Cleaning",
    moduleSlug: "data-cleaning",
    lessonNumber: 12,
    slug: "type-conversion",
    title: "Type Conversion",
    badge: "practice",
    theory: `
## Why Types Matter

Pandas might read numbers as strings, dates as text, or misinterpret your data. Wrong types mean:
- Math operations fail
- Sorting is alphabetical instead of numeric
- Filtering doesn't work as expected

## Checking Types

\`\`\`python
df.dtypes         # Type of each column
df["col"].dtype   # Type of specific column
df.info()         # Types + non-null counts
\`\`\`

## Converting Types

\`\`\`python
# To numeric
df["price"] = pd.to_numeric(df["price"])
df["price"] = pd.to_numeric(df["price"], errors="coerce")  # NaN for invalid

# To datetime
df["date"] = pd.to_datetime(df["date"])
df["date"] = pd.to_datetime(df["date"], format="%Y-%m-%d")

# Using astype
df["age"] = df["age"].astype(int)
df["active"] = df["active"].astype(bool)
df["id"] = df["id"].astype(str)
\`\`\`

## The errors Parameter

\`\`\`python
pd.to_numeric(series, errors="raise")   # Default: raise error on invalid
pd.to_numeric(series, errors="coerce")  # Convert invalid to NaN
pd.to_numeric(series, errors="ignore")  # Return original on error
\`\`\`

## Common Date Formats

| Format | Example |
|--------|---------|
| %Y-%m-%d | 2024-03-15 |
| %m/%d/%Y | 03/15/2024 |
| %d-%b-%Y | 15-Mar-2024 |
| %Y-%m-%d %H:%M:%S | 2024-03-15 14:30:00 |

## Working with Dates

\`\`\`python
df["date"] = pd.to_datetime(df["date"])
df["year"] = df["date"].dt.year
df["month"] = df["date"].dt.month
df["day_name"] = df["date"].dt.day_name()
\`\`\`
`,
    starterCode: `import io

# Data with mixed types that need cleaning
csv_data = """product,price,quantity,date
Widget A,$29.99,150,2024-01-15
Widget B,$49.99,80,2024-01-16
Widget C,invalid,200,2024-01-17"""

df = pd.read_csv(io.StringIO(csv_data))
print("Original types:")
print(df.dtypes)
print("\\nData:")
print(df)
`,
    examples: [
      {
        title: "Converting to Numeric",
        explanation: "Handle strings that should be numbers",
        code: `import io
csv_data = """item,price
A,$10.99
B,$25.50
C,invalid"""

df = pd.read_csv(io.StringIO(csv_data))
# Remove $ and convert, invalid becomes NaN
df["price"] = df["price"].str.replace("$", "", regex=False)
df["price"] = pd.to_numeric(df["price"], errors="coerce")
print(df)
print("\\nSum of valid prices:", df["price"].sum())`,
      },
      {
        title: "Converting Dates",
        explanation: "Parse date strings into datetime objects",
        code: `import io
csv_data = """event,date
Launch,2024-03-15
Update,2024-04-20
Release,2024-05-01"""

df = pd.read_csv(io.StringIO(csv_data))
df["date"] = pd.to_datetime(df["date"])
df["month"] = df["date"].dt.month
df["day_name"] = df["date"].dt.day_name()
print(df)`,
      },
      {
        title: "Using astype",
        explanation: "Direct type conversion",
        code: `import io
csv_data = """id,active,score
1,True,85.5
2,False,92.0
3,True,78.0"""

df = pd.read_csv(io.StringIO(csv_data))
print("Before:", df.dtypes)

# Convert types
df["id"] = df["id"].astype(str)
df["score"] = df["score"].astype(int)
print("\\nAfter:", df.dtypes)
print("\\n", df)`,
      },
    ],
    challenges: [
      {
        id: "m3l2c1",
        prompt: "Convert the 'date' column in sales DataFrame to datetime and print the data types.",
        hint: "Use pd.to_datetime(sales['date'])",
        validateFn: `return output.includes("datetime")`,
        solution: `sales["date"] = pd.to_datetime(sales["date"])
print(sales.dtypes)`,
      },
      {
        id: "m3l2c2",
        prompt: "Convert students['score'] to float type and print the mean.",
        hint: "astype(float) then .mean()",
        validateFn: `return output.includes("85")`,
        solution: `students["score"] = students["score"].astype(float)
print(f"Mean score: {students['score'].mean()}")`,
      },
    ],
    projectChallenge: {
      threadId: "survey",
      threadTitle: "Survey Insights Report",
      taskTitle: "Fix Salary and Age Data Types",
      context: "The survey data was imported with some columns as generic types. You need to ensure Salary is an integer and Age is properly typed for accurate statistical analysis in your recruiter report.",
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

# Convert Salary to int and verify Age is int, then print dtypes
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

# Convert Salary to int and verify Age is int, then print dtypes
survey["Salary"] = survey["Salary"].astype(int)
survey["Age"] = survey["Age"].astype(int)
print("Data types after conversion:")
print(survey.dtypes)
print(f"\\nAverage salary: \${survey['Salary'].mean():,.0f}")`,
      validateFn: `return output.includes("int") && output.includes("Salary")`,
      hint: "Use .astype(int) to convert columns to integer type",
      xpReward: 50,
    },
  },
  {
    module: "Data Cleaning",
    moduleSlug: "data-cleaning",
    lessonNumber: 13,
    slug: "string-cleaning",
    title: "String Cleaning",
    badge: "practice",
    theory: `
## The .str Accessor

Pandas provides string methods through the \`.str\` accessor:

\`\`\`python
df["name"].str.lower()
df["name"].str.upper()
df["name"].str.title()
df["name"].str.strip()
\`\`\`

## Common String Operations

\`\`\`python
# Remove whitespace
df["text"].str.strip()       # Both ends
df["text"].str.lstrip()      # Left only
df["text"].str.rstrip()      # Right only

# Case conversion
df["text"].str.lower()
df["text"].str.upper()
df["text"].str.title()       # Capitalize Words

# Replace patterns
df["text"].str.replace("old", "new")
df["text"].str.replace(r"\\d+", "", regex=True)  # Remove numbers

# Check content
df["text"].str.contains("word")       # Returns True/False
df["text"].str.startswith("prefix")
df["text"].str.endswith("suffix")
\`\`\`

## Extracting Parts of Strings

\`\`\`python
# Split and get parts
df["name"].str.split(" ").str[0]  # First word
df["name"].str.split(" ").str[-1]  # Last word

# Extract with regex
df["text"].str.extract(r"(\\d+)")  # First number

# Get length
df["text"].str.len()
\`\`\`

## Combining String Operations

Chain multiple operations:
\`\`\`python
df["clean_name"] = (df["name"]
    .str.strip()
    .str.lower()
    .str.replace(" ", "_"))
\`\`\`

## Real-World Examples

\`\`\`python
# Clean phone numbers
df["phone"] = df["phone"].str.replace(r"[^\\d]", "", regex=True)

# Extract email domain
df["domain"] = df["email"].str.split("@").str[1]

# Standardize Yes/No
df["active"] = df["active"].str.lower().str.strip()
df["active"] = df["active"].replace({"yes": True, "no": False})
\`\`\`
`,
    starterCode: `import io

csv_data = """name,email,city
  Alice Smith  ,alice@example.com,  new york
BOB JONES,bob@test.com,LOS ANGELES
  carol Lee,carol@demo.com,chicago"""

df = pd.read_csv(io.StringIO(csv_data))
print("Before cleaning:")
print(df)
print("\\nNote the inconsistent spacing and case!")
`,
    examples: [
      {
        title: "Basic String Cleaning",
        explanation: "Strip whitespace and standardize case",
        code: `import io
csv_data = """name,city
  Alice  ,  NYC
BOB,la
  Carol,CHICAGO"""

df = pd.read_csv(io.StringIO(csv_data))
df["name"] = df["name"].str.strip().str.title()
df["city"] = df["city"].str.strip().str.upper()
print(df)`,
      },
      {
        title: "Replace and Contains",
        explanation: "Find and replace text patterns",
        code: `import io
csv_data = """product,description
Widget A,Color: Red - Size: Large
Widget B,Color: Blue - Size: Medium
Widget C,Color: Green - Size: Small"""

df = pd.read_csv(io.StringIO(csv_data))
# Extract just the color
df["color"] = df["description"].str.extract(r"Color: (\\w+)")
# Check if large
df["is_large"] = df["description"].str.contains("Large")
print(df)`,
      },
      {
        title: "Splitting Strings",
        explanation: "Break apart strings into columns",
        code: `import io
csv_data = """full_name,email
Alice Smith,alice@company.com
Bob Jones,bob@agency.org
Carol Lee,carol@startup.io"""

df = pd.read_csv(io.StringIO(csv_data))
# Split name into first/last
df["first_name"] = df["full_name"].str.split(" ").str[0]
df["last_name"] = df["full_name"].str.split(" ").str[1]
# Extract email domain
df["domain"] = df["email"].str.split("@").str[1]
print(df)`,
      },
    ],
    challenges: [
      {
        id: "m3l3c1",
        prompt: "Clean the students 'name' column: strip whitespace and convert to title case. Print the names.",
        hint: "Use .str.strip().str.title()",
        validateFn: `return output.includes("Alice") && output.includes("Bob")`,
        solution: `students["name"] = students["name"].str.strip().str.title()
print(students["name"])`,
      },
      {
        id: "m3l3c2",
        prompt: "Find all students whose name contains the letter 'a' (case insensitive) and print them.",
        hint: "Use .str.contains('a', case=False)",
        validateFn: `return output.includes("Alice") && output.includes("Carol") && output.includes("Dave")`,
        solution: `has_a = students[students["name"].str.contains("a", case=False)]
print(has_a)`,
      },
    ],
    projectChallenge: {
      threadId: "survey",
      threadTitle: "Survey Insights Report",
      taskTitle: "Standardize Job Titles",
      context: "Job titles in the survey have inconsistent formatting. Clean the JobTitle column by stripping whitespace and converting to title case for consistent reporting in your recruiter dashboard.",
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

# Clean the JobTitle column: strip whitespace and convert to title case
# Then print the unique job titles
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

# Clean the JobTitle column: strip whitespace and convert to title case
survey["JobTitle"] = survey["JobTitle"].str.strip().str.title()
print("Unique job titles after cleaning:")
print(survey["JobTitle"].unique())`,
      validateFn: `return output.includes("Data Scientist") && output.includes("Data Analyst")`,
      hint: "Use .str.strip().str.title() to clean and standardize the text",
      xpReward: 50,
    },
  },
  {
    module: "Data Cleaning",
    moduleSlug: "data-cleaning",
    lessonNumber: 14,
    slug: "renaming-dropping",
    title: "Renaming & Dropping",
    badge: "practice",
    theory: `
## Renaming Columns

\`\`\`python
# Rename specific columns
df.rename(columns={"old_name": "new_name"})

# Rename multiple columns
df.rename(columns={
    "firstName": "first_name",
    "lastName": "last_name"
})

# Rename all columns at once
df.columns = ["col1", "col2", "col3"]

# Apply function to all column names
df.columns = df.columns.str.lower()
df.columns = df.columns.str.replace(" ", "_")
\`\`\`

## Dropping Columns

\`\`\`python
# Drop single column
df.drop(columns=["unwanted"])

# Drop multiple columns
df.drop(columns=["col1", "col2"])

# Drop by position
df.drop(df.columns[0], axis=1)  # First column
\`\`\`

## Dropping Rows

\`\`\`python
# Drop by index
df.drop(index=[0, 1, 2])

# Drop by condition (opposite of filtering)
df = df[df["age"] >= 18]  # Keep only adults

# Drop using drop()
df.drop(df[df["score"] < 50].index)
\`\`\`

## Reordering Columns

\`\`\`python
# Specify exact order
df = df[["name", "age", "city", "score"]]

# Move specific column to front
cols = ["important_col"] + [c for c in df.columns if c != "important_col"]
df = df[cols]
\`\`\`

## In-Place Operations

By default, these return a new DataFrame. Use \`inplace=True\` to modify the original:
\`\`\`python
df.rename(columns={"old": "new"}, inplace=True)
df.drop(columns=["unwanted"], inplace=True)
\`\`\`

Or just reassign: \`df = df.drop(...)\`
`,
    starterCode: `# Let's rename and reorganize the students DataFrame
print("Original columns:", list(students.columns))
print("\\nOriginal data:")
print(students.head(3))

# Rename 'name' to 'student_name'
students_clean = students.rename(columns={"name": "student_name"})
print("\\nAfter rename:")
print(students_clean.head(3))
`,
    examples: [
      {
        title: "Renaming Columns",
        explanation: "Change column names for clarity",
        code: `# Rename for better readability
renamed = sales.rename(columns={
    "product": "item_name",
    "quantity": "units_sold"
})
print("Renamed columns:", list(renamed.columns))
print(renamed.head())`,
      },
      {
        title: "Dropping Columns",
        explanation: "Remove columns you don't need",
        code: `# Create a copy and drop columns
df = students.copy()
print("Before:", list(df.columns))

# Drop the 'age' column
df = df.drop(columns=["age"])
print("After:", list(df.columns))`,
      },
      {
        title: "Reordering Columns",
        explanation: "Change the order columns appear",
        code: `# Reorder columns
new_order = ["name", "score", "grade", "subject", "age"]
reordered = students[new_order]
print("Reordered columns:")
print(reordered.head())`,
      },
    ],
    challenges: [
      {
        id: "m3l4c1",
        prompt: "Rename the 'score' column to 'test_score' in students and print the column names.",
        hint: "Use rename(columns={'score': 'test_score'})",
        validateFn: `return output.includes("test_score") && !output.includes("'score'")`,
        solution: `students = students.rename(columns={"score": "test_score"})
print(list(students.columns))`,
      },
      {
        id: "m3l4c2",
        prompt: "Drop the 'date' column from sales and print the remaining columns.",
        hint: "Use drop(columns=['date'])",
        validateFn: `return !output.includes("date") && output.includes("product")`,
        solution: `sales_clean = sales.drop(columns=["date"])
print(list(sales_clean.columns))`,
      },
    ],
    projectChallenge: {
      threadId: "survey",
      threadTitle: "Survey Insights Report",
      taskTitle: "Rename Columns to Snake Case",
      context: "Your data pipeline requires snake_case column names. Rename the survey columns from camelCase (like YearsExperience) to snake_case (years_experience) for consistency with your database schema.",
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

# Rename columns to snake_case and print the new column names
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

# Rename columns to snake_case and print the new column names
survey = survey.rename(columns={
    "RespondentID": "respondent_id",
    "Country": "country",
    "Age": "age",
    "YearsExperience": "years_experience",
    "LanguageUsed": "language_used",
    "Salary": "salary",
    "RemoteWork": "remote_work",
    "Education": "education",
    "JobTitle": "job_title"
})
print("Renamed columns:")
print(list(survey.columns))`,
      validateFn: `return output.includes("years_experience") && output.includes("job_title") && output.includes("remote_work")`,
      hint: "Use .rename(columns={...}) with a dictionary mapping old names to new snake_case names",
      xpReward: 50,
    },
  },
  {
    module: "Data Cleaning",
    moduleSlug: "data-cleaning",
    lessonNumber: 15,
    slug: "duplicates-reset",
    title: "Duplicates & Reset Index",
    badge: "practice",
    theory: `
## Finding Duplicates

\`\`\`python
# Check for duplicate rows
df.duplicated()                    # True/False for each row
df.duplicated().sum()              # Count of duplicates
df[df.duplicated()]                # View duplicate rows

# Check specific columns
df.duplicated(subset=["name"])     # Duplicate names only
df.duplicated(subset=["name", "email"])  # Both must match
\`\`\`

## Removing Duplicates

\`\`\`python
# Remove duplicate rows
df.drop_duplicates()

# Keep first or last occurrence
df.drop_duplicates(keep="first")   # Default
df.drop_duplicates(keep="last")
df.drop_duplicates(keep=False)     # Remove ALL duplicates

# Based on specific columns
df.drop_duplicates(subset=["email"])
\`\`\`

## Reset Index

After filtering or sorting, the index might have gaps. Reset it:

\`\`\`python
df.reset_index()                   # Old index becomes a column
df.reset_index(drop=True)          # Discard old index
\`\`\`

## Setting Index

\`\`\`python
df.set_index("id")                 # Use 'id' column as index
df.set_index("id", drop=True)      # Remove from columns (default)
df.set_index(["year", "month"])    # Multi-level index
\`\`\`

## Common Pattern: Filter, Reset, Continue

\`\`\`python
# Filter data
filtered = df[df["score"] >= 70]

# Reset index for clean 0, 1, 2, ... indexing
filtered = filtered.reset_index(drop=True)
\`\`\`

This ensures subsequent operations work with a clean, sequential index.
`,
    starterCode: `import io

csv_data = """name,email,score
Alice,alice@test.com,95
Bob,bob@test.com,82
Alice,alice@test.com,95
Carol,carol@test.com,91
Bob,bob2@test.com,85"""

df = pd.read_csv(io.StringIO(csv_data))
print("Original data:")
print(df)
print("\\nDuplicate rows:", df.duplicated().sum())
`,
    examples: [
      {
        title: "Finding and Removing Duplicates",
        explanation: "Identify and remove duplicate rows",
        code: `import io
csv_data = """id,name,dept
1,Alice,Eng
2,Bob,Sales
3,Alice,Eng
4,Carol,HR
5,Bob,Sales"""

df = pd.read_csv(io.StringIO(csv_data))
print("Duplicates (by name):")
print(df[df.duplicated(subset=["name"])])

# Remove duplicates
clean = df.drop_duplicates(subset=["name"])
print("\\nAfter removing duplicates:")
print(clean)`,
      },
      {
        title: "Reset Index After Filtering",
        explanation: "Clean up index after removing rows",
        code: `# Filter high scorers
high = students[students["score"] >= 85]
print("Before reset (note index):")
print(high)

# Reset to 0, 1, 2, ...
high = high.reset_index(drop=True)
print("\\nAfter reset:")
print(high)`,
      },
      {
        title: "Set a Column as Index",
        explanation: "Use a meaningful column as the row identifier",
        code: `# Use name as index
indexed = students.set_index("name")
print("With name as index:")
print(indexed)

# Now you can use .loc with names
print("\\nAlice's row:")
print(indexed.loc["Alice"])`,
      },
    ],
    challenges: [
      {
        id: "m3l5c1",
        prompt: "Check how many duplicate rows exist in the students DataFrame and print the count.",
        hint: "Use students.duplicated().sum()",
        validateFn: `return output.includes("0")`,
        solution: `dupes = students.duplicated().sum()
print(f"Duplicate rows: {dupes}")`,
      },
      {
        id: "m3l5c2",
        prompt: "Filter students with grade 'A', reset the index (dropping the old one), and print the result.",
        hint: "Filter, then .reset_index(drop=True)",
        validateFn: `return output.includes("Alice") && output.includes("Carol") && output.includes("Frank") && output.includes("0") && output.includes("1")`,
        solution: `a_students = students[students["grade"] == "A"]
a_students = a_students.reset_index(drop=True)
print(a_students)`,
      },
    ],
    projectChallenge: {
      threadId: "survey",
      threadTitle: "Survey Insights Report",
      taskTitle: "Check for Duplicate Respondents",
      context: "Before finalizing your report, verify there are no duplicate survey submissions. Check for duplicate RespondentIDs and reset the index after any filtering operations.",
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

# Check for duplicate RespondentIDs, remove any duplicates, and reset the index
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

# Check for duplicate RespondentIDs, remove any duplicates, and reset the index
print(f"Duplicate respondents: {survey.duplicated(subset=['RespondentID']).sum()}")
survey = survey.drop_duplicates(subset=["RespondentID"])
survey = survey.reset_index(drop=True)
print(f"Total respondents after cleanup: {len(survey)}")
print(survey.head())`,
      validateFn: `return output.includes("Duplicate") && output.includes("0") && output.includes("15")`,
      hint: "Use .duplicated(subset=['RespondentID']).sum() to count duplicates and .drop_duplicates() to remove them",
      xpReward: 50,
    },
  },
];
