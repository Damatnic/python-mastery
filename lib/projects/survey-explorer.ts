import type { Project } from "../types";

const SURVEY_CSV = `RespondentID,Country,Age,YearsExperience,LanguageUsed,Salary,RemoteWork,Education,JobTitle
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
1015,Germany,28,4,SQL,58000,No,Bachelor's,Business Analyst
1016,USA,45,20,Python,195000,Yes,PhD,Director of Data Science
1017,India,23,1,Python,22000,Yes,Bachelor's,Junior Data Analyst
1018,Canada,32,8,R,88000,Hybrid,PhD,Senior Research Analyst
1019,UK,36,11,Python,95000,No,Master's,Data Science Manager
1020,USA,27,4,Python,88000,Yes,Bachelor's,Data Scientist
1021,India,28,5,SQL,35000,Yes,Bachelor's,Data Analyst
1022,USA,39,15,Python,165000,Yes,Master's,Staff Data Scientist
1023,Brazil,26,3,Python,25000,Yes,Bachelor's,Data Analyst
1024,Germany,30,6,Java,72000,Hybrid,Master's,Data Engineer
1025,USA,31,7,Python,112000,Yes,Bachelor's,Senior Data Analyst
1026,Canada,35,11,Python,105000,No,Master's,Data Science Lead
1027,UK,29,5,R,62000,Yes,PhD,Research Data Scientist
1028,India,32,9,Python,55000,Hybrid,Master's,Senior Data Analyst
1029,USA,26,3,Python,78000,Yes,Bachelor's,Data Analyst
1030,Australia,40,16,Python,135000,Hybrid,Master's,Principal Engineer
1031,India,25,2,SQL,26000,Yes,Bachelor's,Junior Analyst
1032,USA,34,10,Python,128000,Yes,Master's,Machine Learning Engineer
1033,UK,28,4,Python,58000,Hybrid,Bachelor's,Data Scientist
1034,Germany,33,9,Python,85000,No,PhD,Senior Data Scientist
1035,Canada,27,4,R,68000,Yes,Master's,Statistician
1036,USA,41,17,Python,158000,Yes,Master's,Engineering Manager
1037,India,29,6,Python,42000,Yes,Master's,Data Scientist
1038,Brazil,31,7,SQL,30000,Hybrid,Bachelor's,Data Analyst
1039,USA,24,1,Python,72000,Yes,Bachelor's,Junior Data Scientist
1040,UK,37,13,Python,110000,No,Master's,Head of Analytics
1041,India,27,4,Python,38000,Yes,Bachelor's,Data Analyst
1042,Australia,30,6,Python,92000,Yes,Master's,Data Scientist
1043,USA,36,12,Java,140000,Hybrid,Bachelor's,Senior Data Engineer
1044,Canada,28,5,Python,78000,Yes,Bachelor's,Data Scientist
1045,Germany,32,8,SQL,75000,No,Master's,Senior Analyst
1046,USA,29,5,Python,95000,Yes,Master's,ML Engineer
1047,India,35,12,Python,65000,Yes,PhD,Lead Data Scientist
1048,UK,26,3,Python,52000,Yes,Bachelor's,Data Analyst
1049,USA,44,19,Python,180000,Yes,PhD,VP of Data Science
1050,Brazil,28,4,R,28000,Yes,Master's,Data Scientist
1051,Canada,33,9,Python,98000,Hybrid,Master's,Senior Data Scientist
1052,India,24,2,SQL,24000,Yes,Bachelor's,Analyst
1053,USA,30,6,Python,105000,Yes,Bachelor's,Data Scientist
1054,Germany,29,5,Python,68000,Hybrid,Master's,Data Scientist
1055,UK,38,14,Python,125000,No,PhD,Director of Analytics
1056,Australia,27,4,R,75000,Yes,Bachelor's,Statistician
1057,USA,32,8,Python,118000,Yes,Master's,Senior ML Engineer
1058,India,31,8,Python,52000,Yes,Master's,Senior Analyst
1059,Canada,25,2,Python,62000,Yes,Bachelor's,Junior Data Scientist
1060,USA,47,22,Python,200000,Hybrid,PhD,Chief Data Officer`;

export const surveyExplorerProject: Project = {
  slug: "survey-explorer",
  title: "Survey Data Explorer",
  description: "Explore a tech industry salary survey to discover patterns in compensation, experience levels, and language preferences across countries.",
  difficulty: "beginner-intermediate",
  estimatedTime: "25 min",
  dataset: SURVEY_CSV,
  datasetName: "Tech Survey Data",
  datasetDescription: "60 survey responses from tech professionals including country, salary, experience, and programming languages used.",
  steps: [
    {
      id: "se-step-1",
      title: "Load and Examine",
      description: `Let's start by loading the survey data and getting a feel for what we're working with.

**Your goals:**
1. Load the CSV into a DataFrame called \`survey\`
2. Print the shape and data types
3. Use \`.describe()\` to get summary statistics`,
      starterCode: `import pandas as pd
import io

survey_csv = """${SURVEY_CSV}"""

# Load the survey data
survey = pd.read_csv(io.StringIO(survey_csv))

# Print basic info
print(f"Shape: {survey.shape}")
print(f"\\nData types:\\n{survey.dtypes}")

# Get summary statistics
print(f"\\nSummary statistics:")
print(survey.describe())`,
      hints: [
        "pd.read_csv() automatically uses comma as separator",
        ".dtypes shows the data type of each column",
        ".describe() gives count, mean, std, min, max for numeric columns"
      ],
      validateFn: `return output.includes("(60,") && output.includes("9)") && output.includes("mean") && output.includes("Salary")`
    },
    {
      id: "se-step-2",
      title: "Clean the Data",
      description: `Before analyzing, let's check for and handle any data quality issues.

**Your goals:**
1. Check for missing values in each column
2. Check for any unusual values or duplicates
3. Verify that numeric columns have the right type`,
      starterCode: `import pandas as pd
import io

survey_csv = """${SURVEY_CSV}"""
survey = pd.read_csv(io.StringIO(survey_csv))

# Check for missing values
print("Missing values per column:")
print(survey.isnull().sum())

# Check for duplicates
duplicates = survey.duplicated().sum()
print(f"\\nDuplicate rows: {duplicates}")

# Check unique values in categorical columns
print(f"\\nUnique countries: {survey['Country'].nunique()}")
print(f"Countries: {survey['Country'].unique()}")

print(f"\\nUnique remote work options: {survey['RemoteWork'].unique()}")

# Verify numeric columns
print(f"\\nSalary range: {survey['Salary'].min()} - {survey['Salary'].max()}")
print(f"Age range: {survey['Age'].min()} - {survey['Age'].max()}")`,
      hints: [
        ".isnull().sum() counts missing values per column",
        ".duplicated().sum() counts duplicate rows",
        ".nunique() counts unique values",
        ".unique() lists all unique values"
      ],
      validateFn: `return output.includes("Missing values") && output.includes("Duplicate rows: 0") && output.includes("Unique countries")`
    },
    {
      id: "se-step-3",
      title: "Analyze by Country",
      description: `Now let's see how salaries and respondent counts vary by country.

**Your goals:**
1. Count respondents per country
2. Calculate average salary per country
3. Display results sorted by average salary`,
      starterCode: `import pandas as pd
import io

survey_csv = """${SURVEY_CSV}"""
survey = pd.read_csv(io.StringIO(survey_csv))

# Count respondents per country
country_counts = survey.groupby('Country').size().sort_values(ascending=False)
print("Respondents per country:")
print(country_counts)

# Average salary per country
country_salaries = survey.groupby('Country')['Salary'].mean().sort_values(ascending=False)
print("\\nAverage salary by country:")
for country, salary in country_salaries.items():
    print(f"  {country}: \${salary:,.0f}")

# Combined view
print("\\nCombined stats:")
country_stats = survey.groupby('Country').agg({
    'RespondentID': 'count',
    'Salary': 'mean',
    'YearsExperience': 'mean'
}).rename(columns={'RespondentID': 'Count'})
country_stats = country_stats.sort_values('Salary', ascending=False)
print(country_stats.round(0))`,
      hints: [
        "Use .groupby('column').size() to count",
        "Use .groupby('column')['col'].mean() for average",
        "Use .agg() with a dict to compute multiple stats at once"
      ],
      validateFn: `return output.includes("USA") && output.includes("Respondents per country") && output.includes("Average salary")`
    },
    {
      id: "se-step-4",
      title: "Language Popularity",
      description: `Which programming languages are most popular among data professionals? Let's find out.

**Your goals:**
1. Count how many people use each language
2. Calculate the percentage for each
3. Create a simple bar-style visualization`,
      starterCode: `import pandas as pd
import io

survey_csv = """${SURVEY_CSV}"""
survey = pd.read_csv(io.StringIO(survey_csv))

# Count language usage
language_counts = survey['LanguageUsed'].value_counts()
print("Language usage counts:")
print(language_counts)

# Calculate percentages
total = len(survey)
print("\\nLanguage popularity:")
for lang, count in language_counts.items():
    pct = (count / total) * 100
    bar = "█" * int(pct / 2)  # Scale bar to fit
    print(f"  {lang:8} {bar} {pct:.1f}% ({count})")

# Average salary by language
print("\\nAverage salary by language:")
lang_salaries = survey.groupby('LanguageUsed')['Salary'].mean().sort_values(ascending=False)
for lang, salary in lang_salaries.items():
    print(f"  {lang}: \${salary:,.0f}")`,
      hints: [
        ".value_counts() returns counts sorted by frequency",
        "Percentage = count / total * 100",
        "Use f-strings for formatting: {value:,.0f} adds commas"
      ],
      validateFn: `return output.includes("Python") && output.includes("█") && output.includes("%")`
    },
    {
      id: "se-step-5",
      title: "Salary Insights",
      description: `Let's dig deeper into salaries. What's the median? Who are the top earners? How does salary relate to experience?

**Your goals:**
1. Calculate median salary overall
2. Find the top 10% earners (their characteristics)
3. Create experience brackets and show salary by experience level`,
      starterCode: `import pandas as pd
import io

survey_csv = """${SURVEY_CSV}"""
survey = pd.read_csv(io.StringIO(survey_csv))

# Median salary
median_salary = survey['Salary'].median()
print(f"Median salary: \${median_salary:,.0f}")

# 90th percentile threshold
top_10_threshold = survey['Salary'].quantile(0.90)
print(f"Top 10% threshold: \${top_10_threshold:,.0f}")

# Who are the top earners?
top_earners = survey[survey['Salary'] >= top_10_threshold]
print(f"\\nTop 10% earners ({len(top_earners)} people):")
print(f"  Average experience: {top_earners['YearsExperience'].mean():.1f} years")
print(f"  Most common education: {top_earners['Education'].mode()[0]}")
print(f"  Countries: {top_earners['Country'].value_counts().to_dict()}")

# Salary by experience bracket
def experience_bracket(years):
    if years <= 2:
        return "0-2 years"
    elif years <= 5:
        return "3-5 years"
    elif years <= 10:
        return "6-10 years"
    else:
        return "10+ years"

survey['ExpBracket'] = survey['YearsExperience'].apply(experience_bracket)

print("\\nSalary by experience level:")
exp_salaries = survey.groupby('ExpBracket')['Salary'].agg(['mean', 'median', 'count'])
# Sort by the natural order
exp_order = ["0-2 years", "3-5 years", "6-10 years", "10+ years"]
for bracket in exp_order:
    if bracket in exp_salaries.index:
        row = exp_salaries.loc[bracket]
        print(f"  {bracket:12} Mean: \${row['mean']:>8,.0f}  Median: \${row['median']:>8,.0f}  (n={int(row['count'])})")`,
      hints: [
        ".median() gives the 50th percentile",
        ".quantile(0.90) gives the 90th percentile",
        "Use .apply() to create new columns from functions",
        ".mode()[0] gives the most common value"
      ],
      validateFn: `return output.includes("Median salary") && output.includes("Top 10%") && output.includes("experience level")`
    }
  ]
};
