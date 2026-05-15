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
## detecting missing values

In pandas, missing values are represented as \`NaN\` (Not a Number) or \`None\`.

\`\`\`python
df.isna()        # DataFrame of True/False
df.isna().sum()  # Count of NaN per column
df.isna().any()  # True if column has any NaN
\`\`\`

## handling missing data

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

## checking

\`\`\`python
# Total missing values
print(df.isna().sum().sum())

# Percentage missing per column
print(df.isna().mean() * 100)

# Rows with any missing values
rows_with_na = df[df.isna().any(axis=1)]
\`\`\`

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
        title: "detecting missing values",
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
        title: "dropping missing values",
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
        title: "filling missing values",
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
## why types matter

Pandas might read numbers as strings, dates as text, or misinterpret your data. Wrong types mean:
- Math operations fail
- Sorting is alphabetical instead of numeric
- Filtering doesn't work as expected

## checking

\`\`\`python
df.dtypes         # Type of each column
df["col"].dtype   # Type of specific column
df.info()         # Types + non-null counts
\`\`\`

## converting

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

## the errors parameter

\`\`\`python
pd.to_numeric(series, errors="raise")   # Default: raise error on invalid
pd.to_numeric(series, errors="coerce")  # Convert invalid to NaN
pd.to_numeric(series, errors="ignore")  # Return original on error
\`\`\`

## date formats

| Format | Example |
|--------|---------|
| %Y-%m-%d | 2024-03-15 |
| %m/%d/%Y | 03/15/2024 |
| %d-%b-%Y | 15-Mar-2024 |
| %Y-%m-%d %H:%M:%S | 2024-03-15 14:30:00 |

## dates

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
        title: "converting to numeric",
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
        title: "converting dates",
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
        title: "using astype",
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
## the .str accessor

Pandas provides string methods through the \`.str\` accessor:

\`\`\`python
df["name"].str.lower()
df["name"].str.upper()
df["name"].str.title()
df["name"].str.strip()
\`\`\`

## common operations

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

## extracting

\`\`\`python
# Split and get parts
df["name"].str.split(" ").str[0]  # First word
df["name"].str.split(" ").str[-1]  # Last word

# Extract with regex
df["text"].str.extract(r"(\\d+)")  # First number

# Get length
df["text"].str.len()
\`\`\`

## chaining

Chain multiple operations:
\`\`\`python
df["clean_name"] = (df["name"]
    .str.strip()
    .str.lower()
    .str.replace(" ", "_"))
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
        title: "basic string cleaning",
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
        title: "replace and contains",
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
        title: "splitting strings",
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
## renaming

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

## dropping columns

\`\`\`python
# Drop single column
df.drop(columns=["unwanted"])

# Drop multiple columns
df.drop(columns=["col1", "col2"])

# Drop by position
df.drop(df.columns[0], axis=1)  # First column
\`\`\`

## dropping rows

\`\`\`python
# Drop by index
df.drop(index=[0, 1, 2])

# Drop by condition (opposite of filtering)
df = df[df["age"] >= 18]  # Keep only adults

# Drop using drop()
df.drop(df[df["score"] < 50].index)
\`\`\`

## reordering

\`\`\`python
# Specify exact order
df = df[["name", "age", "city", "score"]]

# Move specific column to front
cols = ["important_col"] + [c for c in df.columns if c != "important_col"]
df = df[cols]
\`\`\`

## in-place

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
        title: "renaming columns",
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
        title: "dropping columns",
        explanation: "Remove columns you don't need",
        code: `# Create a copy and drop columns
df = students.copy()
print("Before:", list(df.columns))

# Drop the 'age' column
df = df.drop(columns=["age"])
print("After:", list(df.columns))`,
      },
      {
        title: "reordering columns",
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
## finding duplicates

\`\`\`python
# Check for duplicate rows
df.duplicated()                    # True/False for each row
df.duplicated().sum()              # Count of duplicates
df[df.duplicated()]                # View duplicate rows

# Check specific columns
df.duplicated(subset=["name"])     # Duplicate names only
df.duplicated(subset=["name", "email"])  # Both must match
\`\`\`

## removing duplicates

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

## reset_index

After filtering or sorting, the index might have gaps. Reset it:

\`\`\`python
df.reset_index()                   # Old index becomes a column
df.reset_index(drop=True)          # Discard old index
\`\`\`

## set_index

\`\`\`python
df.set_index("id")                 # Use 'id' column as index
df.set_index("id", drop=True)      # Remove from columns (default)
df.set_index(["year", "month"])    # Multi-level index
\`\`\`

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
        title: "finding and removing duplicates",
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
        title: "reset index after filtering",
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
        title: "set a column as index",
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
  {
    module: "Data Cleaning",
    moduleSlug: "data-cleaning",
    lessonNumber: 16,
    slug: "datetime-handling",
    title: "Datetime Handling",
    badge: "concept",
    theory: `
## parsing dates

Most CSVs give you dates as strings. \`pd.to_datetime\` parses them. It's smart about common formats: \`2024-01-15\`, \`01/15/2024\`, \`Jan 15 2024\` all work.

\`\`\`python
df["date"] = pd.to_datetime(df["date"])
\`\`\`

If parsing fails on a row, you'll get an error. Use \`errors="coerce"\` to turn bad rows into \`NaT\` (missing) instead:

\`\`\`python
df["date"] = pd.to_datetime(df["date"], errors="coerce")
\`\`\`

If the format is weird and pandas can't guess, tell it:

\`\`\`python
df["date"] = pd.to_datetime(df["date"], format="%d-%b-%Y")
\`\`\`

## the .dt accessor

Once a column is datetime, \`.dt\` gives you parts:

\`\`\`python
df["date"].dt.year         # 2024
df["date"].dt.month        # 1
df["date"].dt.day          # 15
df["date"].dt.day_name()   # "Monday"
df["date"].dt.weekday      # 0 (Monday)
df["date"].dt.is_month_end # True/False
\`\`\`

## date arithmetic

Subtracting two datetimes gives you a \`Timedelta\`:

\`\`\`python
df["days_since"] = (pd.Timestamp.today() - df["date"]).dt.days
\`\`\`

Adding offsets:

\`\`\`python
df["next_week"] = df["date"] + pd.Timedelta(days=7)
df["next_month"] = df["date"] + pd.DateOffset(months=1)
\`\`\`

## filtering by date

Once parsed, comparisons just work:

\`\`\`python
recent = df[df["date"] >= "2024-01-01"]
last_30_days = df[df["date"] >= pd.Timestamp.today() - pd.Timedelta(days=30)]
\`\`\`

## formatting

\`strftime\` formats a datetime as a string:

\`\`\`python
df["date_str"] = df["date"].dt.strftime("%Y-%m-%d")
df["pretty"] = df["date"].dt.strftime("%B %d, %Y")  # "January 15, 2024"
\`\`\`

Common format codes: \`%Y\` year, \`%m\` month, \`%d\` day, \`%H\` hour (24h), \`%M\` minute, \`%B\` month name, \`%A\` day name.
`,
    starterCode: `import pandas as pd

# Try out the datetime helpers below.
events = pd.DataFrame({
    "label": ["launch", "review", "release", "retro"],
    "date": ["2024-01-15", "2024-02-03", "2024-03-22", "2024-04-10"],
})

# convert and inspect
events["date"] = pd.to_datetime(events["date"])
print(events.dtypes)
print(events)
`,
    examples: [
      {
        title: "parse a column with mixed-quality dates",
        explanation: "errors='coerce' converts unparseable values to NaT instead of raising",
        code: `import pandas as pd

raw = pd.DataFrame({
    "when": ["2024-01-15", "2024-02-30", "not a date", "2024-04-10"],
})
raw["when"] = pd.to_datetime(raw["when"], errors="coerce")
print(raw)
print(f"bad rows: {raw['when'].isna().sum()}")`,
      },
      {
        title: "extract parts with .dt",
        explanation: "Day name, month, weekday flag, all from the same column",
        code: `import pandas as pd

events = pd.DataFrame({
    "date": pd.to_datetime(["2024-01-15", "2024-02-03", "2024-03-22"]),
})
events["year"] = events["date"].dt.year
events["month"] = events["date"].dt.month
events["day_name"] = events["date"].dt.day_name()
print(events)`,
      },
      {
        title: "filter to the last n days",
        explanation: "Today minus a Timedelta is the cutoff",
        code: `import pandas as pd

df = pd.DataFrame({
    "date": pd.to_datetime(["2024-01-15", "2025-12-01", "2026-05-01", "2026-04-10"]),
    "event": ["launch", "review", "release", "retro"],
})
cutoff = pd.Timestamp.today() - pd.Timedelta(days=60)
recent = df[df["date"] >= cutoff]
print(recent)`,
      },
    ],
    challenges: [
      {
        id: "16-1",
        prompt: "Parse a column of date strings to datetime and print the day_name() for each row. Use df['dates'] = ['2024-03-04', '2024-07-21', '2024-11-15'] as your data.",
        solution: `import pandas as pd

df = pd.DataFrame({"dates": ["2024-03-04", "2024-07-21", "2024-11-15"]})
df["dates"] = pd.to_datetime(df["dates"])
print(df["dates"].dt.day_name())`,
        hint: "Use pd.to_datetime then the .dt.day_name() accessor.",
        validateFn: `return output.includes("Monday") && output.includes("Sunday") && output.includes("Friday")`,
      },
      {
        id: "16-2",
        prompt: "Parse a column with some bad/unparseable dates ('2024-01-15', 'not a date', '2024-02-30', '2024-04-10') using errors='coerce' and print exactly 'bad rows: N' where N is the count of NaT rows.",
        solution: `import pandas as pd

df = pd.DataFrame({"raw": ["2024-01-15", "not a date", "2024-02-30", "2024-04-10"]})
df["raw"] = pd.to_datetime(df["raw"], errors="coerce")
print(f"bad rows: {df['raw'].isna().sum()}")`,
        hint: "After parsing with errors='coerce', .isna().sum() counts the NaT rows.",
        validateFn: `return output.includes("bad rows: 2")`,
      },
    ],
  },
];
