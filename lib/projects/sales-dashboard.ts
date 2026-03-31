import type { Project } from "../types";

const SALES_CSV = `SaleID,SalesRep,Region,Product,Category,Quantity,UnitPrice,SaleDate,CustomerSegment
S001,Alice Chen,North,Widget Pro,Electronics,15,49.99,2023-01-05,Enterprise
S002,Bob Martinez,South,Gadget Plus,Tools,8,29.99,2023-01-08,SMB
S003,Carol Davis,East,Widget Pro,Electronics,22,49.99,2023-01-10,Enterprise
S004,Dan Wilson,West,Super Tool,Tools,45,19.99,2023-01-12,Consumer
S005,Eva Brown,North,Power Unit,Electronics,10,89.99,2023-01-15,Enterprise
S006,Alice Chen,North,Gadget Plus,Tools,30,29.99,2023-01-18,SMB
S007,Bob Martinez,South,Widget Pro,Electronics,18,49.99,2023-01-20,Consumer
S008,Carol Davis,East,Super Tool,Tools,55,19.99,2023-01-22,SMB
S009,Dan Wilson,West,Power Unit,Electronics,8,89.99,2023-01-25,Enterprise
S010,Eva Brown,North,Widget Basic,Electronics,65,24.99,2023-01-28,Consumer
S011,Alice Chen,North,Super Tool,Tools,40,19.99,2023-02-02,Consumer
S012,Bob Martinez,South,Power Unit,Electronics,12,89.99,2023-02-05,Enterprise
S013,Carol Davis,East,Gadget Plus,Tools,25,29.99,2023-02-08,SMB
S014,Dan Wilson,West,Widget Pro,Electronics,20,49.99,2023-02-10,Enterprise
S015,Eva Brown,North,Widget Basic,Electronics,80,24.99,2023-02-12,Consumer
S016,Alice Chen,East,Power Unit,Electronics,6,89.99,2023-02-15,SMB
S017,Bob Martinez,South,Super Tool,Tools,35,19.99,2023-02-18,Consumer
S018,Carol Davis,East,Widget Basic,Electronics,45,24.99,2023-02-20,SMB
S019,Dan Wilson,West,Gadget Plus,Tools,28,29.99,2023-02-22,Enterprise
S020,Eva Brown,South,Widget Pro,Electronics,14,49.99,2023-02-25,Consumer
S021,Alice Chen,North,Widget Pro,Electronics,25,49.99,2023-03-01,Enterprise
S022,Bob Martinez,West,Power Unit,Electronics,9,89.99,2023-03-04,SMB
S023,Carol Davis,East,Super Tool,Tools,50,19.99,2023-03-07,Consumer
S024,Dan Wilson,West,Widget Basic,Electronics,70,24.99,2023-03-10,Consumer
S025,Eva Brown,North,Gadget Plus,Tools,20,29.99,2023-03-12,SMB
S026,Alice Chen,North,Power Unit,Electronics,11,89.99,2023-03-15,Enterprise
S027,Bob Martinez,South,Widget Basic,Electronics,55,24.99,2023-03-18,Consumer
S028,Carol Davis,East,Widget Pro,Electronics,16,49.99,2023-03-20,SMB
S029,Dan Wilson,South,Super Tool,Tools,42,19.99,2023-03-22,Enterprise
S030,Eva Brown,North,Widget Pro,Electronics,19,49.99,2023-03-25,Enterprise
S031,Alice Chen,East,Gadget Plus,Tools,32,29.99,2023-04-02,Consumer
S032,Bob Martinez,South,Power Unit,Electronics,7,89.99,2023-04-05,Enterprise
S033,Carol Davis,North,Widget Basic,Electronics,60,24.99,2023-04-08,SMB
S034,Dan Wilson,West,Widget Pro,Electronics,24,49.99,2023-04-10,Consumer
S035,Eva Brown,East,Super Tool,Tools,38,19.99,2023-04-12,SMB
S036,Alice Chen,North,Widget Basic,Electronics,75,24.99,2023-04-15,Consumer
S037,Bob Martinez,West,Gadget Plus,Tools,15,29.99,2023-04-18,SMB
S038,Carol Davis,East,Power Unit,Electronics,13,89.99,2023-04-20,Enterprise
S039,Dan Wilson,South,Widget Basic,Electronics,50,24.99,2023-04-22,Consumer
S040,Eva Brown,North,Widget Pro,Electronics,21,49.99,2023-04-25,Enterprise
S041,Alice Chen,North,Super Tool,Tools,48,19.99,2023-05-01,SMB
S042,Bob Martinez,South,Widget Pro,Electronics,17,49.99,2023-05-04,Enterprise
S043,Carol Davis,East,Widget Basic,Electronics,85,24.99,2023-05-07,Consumer
S044,Dan Wilson,West,Power Unit,Electronics,10,89.99,2023-05-10,SMB
S045,Eva Brown,South,Gadget Plus,Tools,22,29.99,2023-05-12,Consumer
S046,Alice Chen,East,Widget Pro,Electronics,28,49.99,2023-05-15,Enterprise
S047,Bob Martinez,North,Super Tool,Tools,33,19.99,2023-05-18,Consumer
S048,Carol Davis,East,Gadget Plus,Tools,27,29.99,2023-05-20,SMB
S049,Dan Wilson,West,Widget Basic,Electronics,90,24.99,2023-05-22,Consumer
S050,Eva Brown,North,Power Unit,Electronics,8,89.99,2023-05-25,Enterprise
S051,Alice Chen,North,Gadget Plus,Tools,18,29.99,2023-06-02,SMB
S052,Bob Martinez,South,Widget Basic,Electronics,62,24.99,2023-06-05,Consumer
S053,Carol Davis,West,Widget Pro,Electronics,23,49.99,2023-06-08,Enterprise
S054,Dan Wilson,East,Super Tool,Tools,44,19.99,2023-06-10,SMB
S055,Eva Brown,North,Widget Pro,Electronics,26,49.99,2023-06-12,Enterprise
S056,Alice Chen,South,Power Unit,Electronics,14,89.99,2023-06-15,Consumer
S057,Bob Martinez,South,Gadget Plus,Tools,36,29.99,2023-06-18,Enterprise
S058,Carol Davis,East,Widget Basic,Electronics,72,24.99,2023-06-20,SMB
S059,Dan Wilson,West,Widget Pro,Electronics,30,49.99,2023-06-22,Consumer
S060,Eva Brown,North,Super Tool,Tools,52,19.99,2023-06-25,SMB
S061,Alice Chen,North,Widget Basic,Electronics,68,24.99,2023-07-01,Consumer
S062,Bob Martinez,East,Power Unit,Electronics,11,89.99,2023-07-04,Enterprise
S063,Carol Davis,South,Super Tool,Tools,46,19.99,2023-07-07,SMB
S064,Dan Wilson,West,Gadget Plus,Tools,24,29.99,2023-07-10,Consumer
S065,Eva Brown,North,Widget Pro,Electronics,32,49.99,2023-07-12,Enterprise
S066,Alice Chen,East,Widget Pro,Electronics,19,49.99,2023-07-15,SMB
S067,Bob Martinez,South,Widget Basic,Electronics,78,24.99,2023-07-18,Consumer
S068,Carol Davis,North,Power Unit,Electronics,9,89.99,2023-07-20,Enterprise
S069,Dan Wilson,West,Super Tool,Tools,58,19.99,2023-07-22,Consumer
S070,Eva Brown,South,Gadget Plus,Tools,31,29.99,2023-07-25,SMB
S071,Alice Chen,North,Super Tool,Tools,41,19.99,2023-08-02,Consumer
S072,Bob Martinez,West,Widget Pro,Electronics,15,49.99,2023-08-05,Enterprise
S073,Carol Davis,East,Widget Basic,Electronics,82,24.99,2023-08-08,SMB
S074,Dan Wilson,South,Power Unit,Electronics,12,89.99,2023-08-10,Consumer
S075,Eva Brown,North,Gadget Plus,Tools,29,29.99,2023-08-12,Enterprise
S076,Alice Chen,East,Power Unit,Electronics,16,89.99,2023-08-15,SMB
S077,Bob Martinez,South,Super Tool,Tools,37,19.99,2023-08-18,Consumer
S078,Carol Davis,North,Widget Pro,Electronics,27,49.99,2023-08-20,Enterprise
S079,Dan Wilson,West,Widget Basic,Electronics,95,24.99,2023-08-22,Consumer
S080,Eva Brown,North,Widget Pro,Electronics,34,49.99,2023-08-25,Enterprise`;

export const salesDashboardProject: Project = {
  slug: "sales-dashboard",
  title: "Sales Performance Dashboard",
  description: "Build a sales analysis dashboard by calculating revenue metrics, identifying top performers, analyzing regional performance, and tracking monthly trends.",
  difficulty: "intermediate",
  estimatedTime: "35 min",
  dataset: SALES_CSV,
  datasetName: "Sales Data 2023",
  datasetDescription: "80 sales transactions across 5 reps, 4 regions, and 5 products spanning January to August 2023.",
  steps: [
    {
      id: "sd-step-1",
      title: "Load and Explore",
      description: `Let's start by loading the sales data and understanding what we're working with.

**Your goals:**
1. Load the CSV into a DataFrame called \`sales\`
2. Check the shape and column types
3. Look for any missing values or data issues`,
      starterCode: `import pandas as pd
import io

sales_csv = """${SALES_CSV}"""

# Load the sales data
sales = pd.read_csv(io.StringIO(sales_csv))

# Basic exploration
print(f"Shape: {sales.shape}")
print(f"\\nColumns and types:")
print(sales.dtypes)

# Check for nulls
print(f"\\nMissing values:")
print(sales.isnull().sum())

# Preview data
print(f"\\nFirst few rows:")
print(sales.head())`,
      hints: [
        "Use pd.read_csv() to load the data",
        ".shape gives (rows, columns)",
        ".dtypes shows column data types",
        ".isnull().sum() counts missing values"
      ],
      validateFn: `return output.includes("(80,") && output.includes("9)") && output.includes("SaleID") && output.includes("Missing values")`
    },
    {
      id: "sd-step-2",
      title: "Add Calculated Columns",
      description: `To analyze sales properly, we need to calculate total revenue and extract the month from each sale date.

**Your goals:**
1. Create a \`TotalRevenue\` column (Quantity * UnitPrice)
2. Convert \`SaleDate\` to datetime and extract the month
3. Show the total revenue across all sales`,
      starterCode: `import pandas as pd
import io

sales_csv = """${SALES_CSV}"""
sales = pd.read_csv(io.StringIO(sales_csv))

# Calculate TotalRevenue
sales['TotalRevenue'] = sales['Quantity'] * sales['UnitPrice']

# Convert SaleDate to datetime and extract month
sales['SaleDate'] = pd.to_datetime(sales['SaleDate'])
sales['Month'] = sales['SaleDate'].dt.month

# Also get month name for readability
sales['MonthName'] = sales['SaleDate'].dt.strftime('%B')

# Show results
print("New columns added:")
print(sales[['SaleID', 'Quantity', 'UnitPrice', 'TotalRevenue', 'Month', 'MonthName']].head(10))

# Total revenue
total_rev = sales['TotalRevenue'].sum()
print(f"\\nTotal Revenue: \${total_rev:,.2f}")
print(f"Average Sale: \${sales['TotalRevenue'].mean():,.2f}")`,
      hints: [
        "Multiply columns directly: df['A'] * df['B']",
        "Use pd.to_datetime() to convert strings to dates",
        ".dt.month extracts month number (1-12)",
        ".dt.strftime('%B') gives full month name"
      ],
      validateFn: `return output.includes("TotalRevenue") && output.includes("Month") && output.includes("Total Revenue: $")`
    },
    {
      id: "sd-step-3",
      title: "Top Performers",
      description: `Who's bringing in the most revenue? Let's identify our top sales reps.

**Your goals:**
1. Group by SalesRep and sum their total revenue
2. Sort to find the top performers
3. Calculate each rep's share of total revenue`,
      starterCode: `import pandas as pd
import io

sales_csv = """${SALES_CSV}"""
sales = pd.read_csv(io.StringIO(sales_csv))
sales['TotalRevenue'] = sales['Quantity'] * sales['UnitPrice']

# Group by sales rep and calculate total revenue
rep_revenue = sales.groupby('SalesRep')['TotalRevenue'].sum().sort_values(ascending=False)

print("Sales Rep Performance:")
print("=" * 50)

total_rev = sales['TotalRevenue'].sum()
for rep, revenue in rep_revenue.items():
    pct = (revenue / total_rev) * 100
    bar = "█" * int(pct / 2)
    print(f"{rep:15} \${revenue:>10,.2f}  {bar} {pct:.1f}%")

print(f"\\n{'Total':15} \${total_rev:>10,.2f}")

# Also show number of sales per rep
print("\\nSales count by rep:")
rep_counts = sales.groupby('SalesRep').size().sort_values(ascending=False)
print(rep_counts)

# Average sale size
print("\\nAverage sale size by rep:")
avg_sale = sales.groupby('SalesRep')['TotalRevenue'].mean().sort_values(ascending=False)
for rep, avg in avg_sale.items():
    print(f"  {rep}: \${avg:,.2f}")`,
      hints: [
        ".groupby('col')['value'].sum() totals by group",
        ".sort_values(ascending=False) puts highest first",
        "Calculate percentage: value / total * 100"
      ],
      validateFn: `return output.includes("Sales Rep Performance") && output.includes("█") && output.includes("%") && output.includes("Total")`
    },
    {
      id: "sd-step-4",
      title: "Regional Breakdown",
      description: `Now let's analyze performance by region and product category to see where revenue is coming from.

**Your goals:**
1. Calculate total revenue by Region
2. Break down revenue by Region AND Category
3. Find the best-performing region for each category`,
      starterCode: `import pandas as pd
import io

sales_csv = """${SALES_CSV}"""
sales = pd.read_csv(io.StringIO(sales_csv))
sales['TotalRevenue'] = sales['Quantity'] * sales['UnitPrice']

# Revenue by region
region_rev = sales.groupby('Region')['TotalRevenue'].sum().sort_values(ascending=False)
print("Revenue by Region:")
print("=" * 40)
for region, revenue in region_rev.items():
    print(f"  {region:10} \${revenue:>10,.2f}")

# Revenue by Region + Category
print("\\nRevenue by Region and Category:")
print("=" * 50)
region_cat = sales.groupby(['Region', 'Category'])['TotalRevenue'].sum().unstack(fill_value=0)
print(region_cat.round(2))

# Best region for each category
print("\\nBest region for each category:")
for category in sales['Category'].unique():
    cat_data = sales[sales['Category'] == category]
    best_region = cat_data.groupby('Region')['TotalRevenue'].sum().idxmax()
    best_rev = cat_data.groupby('Region')['TotalRevenue'].sum().max()
    print(f"  {category}: {best_region} (\${best_rev:,.2f})")`,
      hints: [
        "Group by multiple columns: .groupby(['col1', 'col2'])",
        ".unstack() pivots one index level into columns",
        ".idxmax() returns the index of the maximum value"
      ],
      validateFn: `return output.includes("Revenue by Region") && output.includes("North") && output.includes("Electronics") && output.includes("Tools")`
    },
    {
      id: "sd-step-5",
      title: "Monthly Trend",
      description: `How has revenue changed month over month? Let's track the trend.

**Your goals:**
1. Calculate monthly total revenue
2. Calculate month-over-month change
3. Identify the best and worst months`,
      starterCode: `import pandas as pd
import io

sales_csv = """${SALES_CSV}"""
sales = pd.read_csv(io.StringIO(sales_csv))
sales['TotalRevenue'] = sales['Quantity'] * sales['UnitPrice']
sales['SaleDate'] = pd.to_datetime(sales['SaleDate'])
sales['Month'] = sales['SaleDate'].dt.month
sales['MonthName'] = sales['SaleDate'].dt.strftime('%b')

# Monthly revenue
monthly_rev = sales.groupby(['Month', 'MonthName'])['TotalRevenue'].sum().reset_index()
monthly_rev = monthly_rev.sort_values('Month')

print("Monthly Revenue Trend:")
print("=" * 50)

max_rev = monthly_rev['TotalRevenue'].max()
for _, row in monthly_rev.iterrows():
    bar_len = int((row['TotalRevenue'] / max_rev) * 30)
    bar = "█" * bar_len
    print(f"{row['MonthName']:5} \${row['TotalRevenue']:>10,.2f}  {bar}")

# Month-over-month change
monthly_rev['PrevMonth'] = monthly_rev['TotalRevenue'].shift(1)
monthly_rev['Change'] = monthly_rev['TotalRevenue'] - monthly_rev['PrevMonth']
monthly_rev['ChangePct'] = (monthly_rev['Change'] / monthly_rev['PrevMonth']) * 100

print("\\nMonth-over-Month Change:")
for _, row in monthly_rev.iterrows():
    if pd.notna(row['ChangePct']):
        sign = "+" if row['ChangePct'] > 0 else ""
        print(f"  {row['MonthName']}: {sign}{row['ChangePct']:.1f}%")

# Best and worst months
best_month = monthly_rev.loc[monthly_rev['TotalRevenue'].idxmax()]
worst_month = monthly_rev.loc[monthly_rev['TotalRevenue'].idxmin()]
print(f"\\nBest month: {best_month['MonthName']} (\${best_month['TotalRevenue']:,.2f})")
print(f"Worst month: {worst_month['MonthName']} (\${worst_month['TotalRevenue']:,.2f})")`,
      hints: [
        ".shift(1) moves values down one row for comparison",
        "Change = Current - Previous",
        "Percent change = (Change / Previous) * 100",
        ".idxmax() and .idxmin() find the row indices of extremes"
      ],
      validateFn: `return output.includes("Monthly Revenue Trend") && output.includes("█") && output.includes("Best month") && output.includes("Worst month")`
    },
    {
      id: "sd-step-6",
      title: "Best Product per Region",
      description: `Finally, let's find each region's top-selling product by revenue to understand regional preferences.

**Your goals:**
1. For each region, find the product with the highest total revenue
2. Show the revenue and quantity sold for each top product
3. Create a summary showing regional product preferences`,
      starterCode: `import pandas as pd
import io

sales_csv = """${SALES_CSV}"""
sales = pd.read_csv(io.StringIO(sales_csv))
sales['TotalRevenue'] = sales['Quantity'] * sales['UnitPrice']

# Calculate revenue by Region and Product
region_product = sales.groupby(['Region', 'Product']).agg({
    'TotalRevenue': 'sum',
    'Quantity': 'sum',
    'SaleID': 'count'
}).rename(columns={'SaleID': 'NumSales'})

print("Best Product per Region:")
print("=" * 60)

for region in sales['Region'].unique():
    region_data = region_product.loc[region]
    best_product = region_data['TotalRevenue'].idxmax()
    best_stats = region_data.loc[best_product]

    print(f"\\n{region}:")
    print(f"  Top Product: {best_product}")
    print(f"  Revenue: \${best_stats['TotalRevenue']:,.2f}")
    print(f"  Quantity: {int(best_stats['Quantity'])} units")
    print(f"  Sales: {int(best_stats['NumSales'])} transactions")

# Summary table
print("\\n" + "=" * 60)
print("Regional Product Champions Summary:")
print("-" * 60)

summary = []
for region in sorted(sales['Region'].unique()):
    region_data = region_product.loc[region]
    best_product = region_data['TotalRevenue'].idxmax()
    revenue = region_data.loc[best_product, 'TotalRevenue']
    summary.append({'Region': region, 'TopProduct': best_product, 'Revenue': revenue})

summary_df = pd.DataFrame(summary)
for _, row in summary_df.iterrows():
    print(f"  {row['Region']:8} → {row['TopProduct']:15} \${row['Revenue']:>10,.2f}")`,
      hints: [
        "Use .groupby(['Region', 'Product']) to group by both",
        ".loc[region] accesses data for a specific region",
        "Use .idxmax() on a Series to find the index (product) with max value"
      ],
      validateFn: `return output.includes("Best Product per Region") && output.includes("Top Product") && output.includes("Revenue") && output.includes("Regional Product Champions")`
    }
  ]
};
