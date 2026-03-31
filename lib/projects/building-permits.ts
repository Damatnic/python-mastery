import type { Project } from "../types";

const BUILDING_PERMITS_CSV = `Permit Number|Permit Type Definition|Street Number|Street Name|Unit|Current Status|Filed Date|Issued Date|Completed Date|Existing Use|Proposed Use|Neighborhoods|Primary Address Flag
BP2023-0001|alterations|450|Market St|Suite 200|issued|2023-01-15|2023-02-10||office|office|Financial District|Y
BP2023-0002|new construction|1200|Mission St||complete|2023-01-18|2023-02-28|2023-08-15|vacant lot|apartments|SoMa|Y
BP2023-0003|additions|2847|24th St||issued|2023-01-22|2023-03-05||1 family dwelling|1 family dwelling|Mission|Y
BP2023-0004|alterations|555|California St|Floor 12|cancelled|2023-01-25||||office|office|Nob Hill|Y
BP2023-0005|demolition|890|Folsom St||complete|2023-02-01|2023-02-15|2023-03-20|warehouse|vacant lot|SoMa|Y
BP2023-0006|new construction|3200|16th St||issued|2023-02-05|2023-04-01||parking lot|retail|Mission|Y
BP2023-0007|alterations|100|Van Ness Ave||withdrawn|2023-02-10||||retail|restaurant|Civic Center|Y
BP2023-0008|sign erection|1800|Haight St||complete|2023-02-12|2023-02-20|2023-02-28|retail|retail|Haight-Ashbury|Y
BP2023-0009|additions|4521|Judah St||issued|2023-02-15|2023-04-10||1 family dwelling|2 family dwelling|Sunset|Y
BP2023-0010|alterations|601|Montgomery St|Suite 500|issued|2023-02-18|2023-03-25||office|office|Financial District|Y
BP2023-0011|new construction|2100|Folsom St||expired|2023-02-20|2023-03-30||vacant lot|apartments|Mission|Y
BP2023-0012|alterations|789|Brannan St||complete|2023-02-22|2023-04-05|2023-07-10|warehouse|office|SoMa|Y
BP2023-0013|demolition|1550|Howard St||complete|2023-02-25|2023-03-10|2023-04-15|industrial|vacant lot|SoMa|Y
BP2023-0014|additions|3845|Noriega St||issued|2023-03-01|2023-05-01||1 family dwelling|1 family dwelling|Sunset|Y
BP2023-0015|new construction|425|Mission St||issued|2023-03-05|2023-06-15||parking lot|office tower|Financial District|Y
BP2023-0016|alterations|2200|Market St|Unit 3|complete|2023-03-08|2023-04-20|2023-06-30|retail|restaurant|Castro|Y
BP2023-0017|sign erection|300|Geary St||issued|2023-03-10|2023-03-25||retail|retail|Union Square|Y
BP2023-0018|alterations|1725|Ocean Ave||withdrawn|2023-03-12||||retail|medical office|Ingleside|Y
BP2023-0019|new construction|5600|3rd St||issued|2023-03-15|2023-06-01||industrial|mixed use|Bayview|Y
BP2023-0020|additions|145|Leavenworth St||cancelled|2023-03-18||||apartments|apartments|Tenderloin|Y
BP2023-0021|alterations|888|Brannan St||complete|2023-03-20|2023-05-10|2023-08-20|office|office|SoMa|Y
BP2023-0022|demolition|2400|Cesar Chavez St||complete|2023-03-22|2023-04-05|2023-05-01|warehouse|vacant lot|Mission|Y
BP2023-0023|new construction|1950|Mission St||issued|2023-03-25|2023-07-01||vacant lot|apartments|Mission|Y
BP2023-0024|alterations|550|Montgomery St|Floor 8|issued|2023-03-28|2023-05-15||office|office|Financial District|Y
BP2023-0025|additions|4200|Irving St||complete|2023-04-01|2023-06-10|2023-09-15|1 family dwelling|2 family dwelling|Sunset|Y
BP2023-0026|alterations|77|Geary St||issued|2023-04-05|2023-05-25||retail|retail|Union Square|Y
BP2023-0027|new construction|150|Otis St||issued|2023-04-08|2023-07-20||parking lot|apartments|Civic Center|Y
BP2023-0028|sign erection|3500|Mission St||complete|2023-04-10|2023-04-20|2023-04-30|retail|retail|Bernal Heights|Y
BP2023-0029|alterations|1100|Howard St||expired|2023-04-12|2023-05-30||warehouse|office|SoMa|Y
BP2023-0030|demolition|2650|Harrison St||complete|2023-04-15|2023-05-01|2023-06-10|industrial|vacant lot|Mission|Y
BP2023-0031|additions|2250|Chestnut St||issued|2023-04-18|2023-07-01||retail|retail|Marina|Y
BP2023-0032|new construction|975|Bryant St||issued|2023-04-20|2023-08-01||vacant lot|mixed use|SoMa|Y
BP2023-0033|alterations|445|Bush St|Suite 100|complete|2023-04-22|2023-06-15|2023-08-30|office|medical office|Financial District|Y
BP2023-0034|alterations|3100|Fillmore St||issued|2023-04-25|2023-06-20||retail|restaurant|Pacific Heights|Y
BP2023-0035|sign erection|2800|Leavenworth St||issued|2023-04-28|2023-05-10||retail|retail|Fishermans Wharf|Y
BP2023-0036|new construction|820|Harrison St||issued|2023-05-01|2023-08-15||parking lot|office|SoMa|Y
BP2023-0037|additions|1650|Vallejo St||complete|2023-05-05|2023-07-10|2023-10-01|1 family dwelling|1 family dwelling|Russian Hill|Y
BP2023-0038|alterations|222|Sansome St|Floor 3|cancelled|2023-05-08||||office|office|Financial District|Y
BP2023-0039|demolition|1800|Evans Ave||issued|2023-05-10|2023-06-01||industrial|vacant lot|Bayview|Y
BP2023-0040|alterations|660|Market St||complete|2023-05-12|2023-07-20|2023-09-25|retail|office|Financial District|Y
BP2023-0041|new construction|3450|18th St||issued|2023-05-15|2023-09-01||vacant lot|apartments|Castro|Y
BP2023-0042|additions|4800|Taraval St||issued|2023-05-18|2023-08-05||1 family dwelling|2 family dwelling|Parkside|Y
BP2023-0043|alterations|1250|Van Ness Ave||withdrawn|2023-05-20||||retail|medical office|Polk Gulch|Y
BP2023-0044|sign erection|501|Castro St||complete|2023-05-22|2023-06-05|2023-06-15|retail|retail|Castro|Y
BP2023-0045|alterations|955|Market St|Unit 7|issued|2023-05-25|2023-08-10||office|office|Civic Center|Y
BP2023-0046|new construction|2000|Evans Ave||issued|2023-05-28|2023-09-15||industrial|mixed use|Bayview|Y
BP2023-0047|demolition|345|Townsend St||complete|2023-06-01|2023-06-15|2023-07-20|warehouse|vacant lot|SoMa|Y
BP2023-0048|additions|1875|Pacific Ave||issued|2023-06-05|2023-09-01||1 family dwelling|1 family dwelling|Pacific Heights|Y
BP2023-0049|alterations|700|Beach St||complete|2023-06-08|2023-08-20|2023-10-15|retail|restaurant|Fishermans Wharf|Y
BP2023-0050|new construction|1600|Owens St||issued|2023-06-10|2023-10-01||parking lot|office tower|Mission Bay|Y`;

export const buildingPermitsProject: Project = {
  slug: "building-permits",
  title: "Building Permits Analysis",
  description: "Analyze San Francisco building permit data to discover patterns in construction activity, understand permit statuses, and identify use changes across neighborhoods.",
  difficulty: "beginner-intermediate",
  estimatedTime: "30 min",
  dataset: BUILDING_PERMITS_CSV,
  datasetName: "SF Building Permits",
  datasetDescription: "50 building permits from San Francisco including permit types, statuses, locations, and use changes.",
  steps: [
    {
      id: "bp-step-1",
      title: "Load the Dataset",
      description: `Your first task is to load the building permits dataset into a pandas DataFrame.

The data is pipe-delimited (uses \`|\` as the separator instead of commas), so you'll need to specify the separator when reading it.

**Your goals:**
1. Load the CSV data into a DataFrame called \`permits\`
2. Print the shape of the DataFrame (rows, columns)
3. Print the column names to see what data we have`,
      starterCode: `import pandas as pd
import io

# The building permits data (pipe-delimited)
permits_csv = """${BUILDING_PERMITS_CSV}"""

# TODO: Load the data into a DataFrame called 'permits'
# Hint: Use sep='|' in read_csv

permits = pd.read_csv(io.StringIO(permits_csv), sep='|')

# Print the shape
print(f"Dataset shape: {permits.shape}")

# Print column names
print(f"\\nColumns:\\n{permits.columns.tolist()}")`,
      hints: [
        "Use pd.read_csv() with the sep='|' parameter",
        "wrap the CSV string with io.StringIO()",
        "Use .shape to get (rows, columns) tuple",
        "Use .columns.tolist() for a readable list of column names"
      ],
      validateFn: `return output.includes("(50,") && output.includes("13)") && output.includes("Permit Number") && output.includes("Neighborhoods")`
    },
    {
      id: "bp-step-2",
      title: "Rename Columns",
      description: `Column names with spaces can be annoying to work with. Let's clean them up by replacing spaces with underscores.

**Your goals:**
1. Rename all columns to use underscores instead of spaces
2. Print the new column names to verify
3. Print the first 3 rows to see the data`,
      starterCode: `import pandas as pd
import io

permits_csv = """${BUILDING_PERMITS_CSV}"""
permits = pd.read_csv(io.StringIO(permits_csv), sep='|')

# TODO: Rename columns - replace spaces with underscores
# Hint: Use .columns.str.replace() or a rename mapping

permits.columns = permits.columns.str.replace(' ', '_')

# Print new column names
print("New columns:")
print(permits.columns.tolist())

# Print first 3 rows
print("\\nFirst 3 rows:")
print(permits.head(3))`,
      hints: [
        "Use permits.columns.str.replace(' ', '_')",
        "Alternatively, create a dict mapping old names to new names",
        "String methods on .columns work because column names are a pandas Index"
      ],
      validateFn: `return output.includes("Permit_Number") && output.includes("Permit_Type_Definition") && output.includes("Current_Status")`
    },
    {
      id: "bp-step-3",
      title: "Filter Permits",
      description: `Not all permits move forward. Some get cancelled, withdrawn, or expire. Let's focus on the permits that actually matter: those that are issued or complete.

**Your goals:**
1. Filter to keep only permits where \`Current_Status\` is 'issued' or 'complete'
2. Store the result in \`active_permits\`
3. Print how many permits remain and what percentage of the original dataset this represents`,
      starterCode: `import pandas as pd
import io

permits_csv = """${BUILDING_PERMITS_CSV}"""
permits = pd.read_csv(io.StringIO(permits_csv), sep='|')
permits.columns = permits.columns.str.replace(' ', '_')

# TODO: Filter to only 'issued' or 'complete' permits
# Hint: Use .isin() or multiple conditions with |

active_permits = permits[permits['Current_Status'].isin(['issued', 'complete'])]

# Print results
original_count = len(permits)
active_count = len(active_permits)
pct = (active_count / original_count) * 100

print(f"Original permits: {original_count}")
print(f"Active permits: {active_count}")
print(f"Percentage active: {pct:.1f}%")`,
      hints: [
        "Use .isin(['issued', 'complete']) for cleaner code",
        "Or use (df['col'] == 'issued') | (df['col'] == 'complete')",
        "Don't forget to wrap conditions in parentheses when using |"
      ],
      validateFn: `return output.includes("Original permits: 50") && output.includes("Active permits:") && output.includes("Percentage active:")`
    },
    {
      id: "bp-step-4",
      title: "Group and Count",
      description: `Now let's see where construction activity is happening. Which neighborhoods have the most building permits?

**Your goals:**
1. Group the data by \`Neighborhoods\`
2. Count permits per neighborhood
3. Sort from most to least permits
4. Print the top 5 neighborhoods`,
      starterCode: `import pandas as pd
import io

permits_csv = """${BUILDING_PERMITS_CSV}"""
permits = pd.read_csv(io.StringIO(permits_csv), sep='|')
permits.columns = permits.columns.str.replace(' ', '_')

# TODO: Group by neighborhood and count permits
# Then sort descending and show top 5

neighborhood_counts = permits.groupby('Neighborhoods').size().sort_values(ascending=False)

print("Permits by Neighborhood (Top 5):")
print(neighborhood_counts.head(5))

# Also show as a simple bar-style visualization
print("\\n" + "=" * 40)
for neighborhood, count in neighborhood_counts.head(5).items():
    bar = "█" * count
    print(f"{neighborhood:25} {bar} ({count})")`,
      hints: [
        "Use .groupby('column').size() to count rows per group",
        "Use .sort_values(ascending=False) to sort descending",
        "Use .head(5) to get top 5"
      ],
      validateFn: `return output.includes("SoMa") && output.includes("Financial District") && output.includes("Mission")`
    },
    {
      id: "bp-step-5",
      title: "Find Use Changes",
      description: `One interesting aspect of building permits is when they change the use of a property. For example, converting a warehouse to offices, or a parking lot to apartments.

**Your goals:**
1. Find all permits where \`Proposed_Use\` is different from \`Existing_Use\`
2. Store in \`use_changes\`
3. Print how many permits involve a use change
4. Show a few examples with the old and new use`,
      starterCode: `import pandas as pd
import io

permits_csv = """${BUILDING_PERMITS_CSV}"""
permits = pd.read_csv(io.StringIO(permits_csv), sep='|')
permits.columns = permits.columns.str.replace(' ', '_')

# TODO: Find permits where Proposed_Use != Existing_Use

use_changes = permits[permits['Proposed_Use'] != permits['Existing_Use']]

print(f"Permits with use changes: {len(use_changes)}")
print(f"Percentage of all permits: {len(use_changes) / len(permits) * 100:.1f}%")

# Show some examples
print("\\nExamples of use changes:")
for _, row in use_changes.head(5).iterrows():
    print(f"  {row['Existing_Use']} → {row['Proposed_Use']} ({row['Neighborhoods']})")`,
      hints: [
        "Compare columns directly: df['col1'] != df['col2']",
        "Use iterrows() to loop through rows for display",
        "Access values with row['column_name']"
      ],
      validateFn: `return output.includes("Permits with use changes:") && output.includes("→") && output.includes("Percentage")`
    }
  ]
};
