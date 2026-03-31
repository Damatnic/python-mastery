import type { Lesson } from "../types";

export const lessonsModule6: Lesson[] = [
  {
    module: "Web & APIs",
    moduleSlug: "web-apis",
    lessonNumber: 26,
    slug: "requests-basics",
    title: "Requests Basics",
    badge: "concept",
    theory: `
## Making HTTP Requests

The \`requests\` library is the standard way to fetch data from the web:

\`\`\`python
import requests

response = requests.get("https://api.example.com/data")
print(response.status_code)  # 200 for success
print(response.text)         # Raw text content
print(response.json())       # Parse as JSON
\`\`\`

## HTTP Methods

\`\`\`python
requests.get(url)      # Read data
requests.post(url)     # Create data
requests.put(url)      # Update data
requests.delete(url)   # Delete data
\`\`\`

## Common Response Properties

\`\`\`python
response.status_code  # HTTP status (200, 404, 500, etc.)
response.ok           # True if status < 400
response.text         # Response as string
response.json()       # Parse JSON response
response.headers      # Response headers
response.url          # Final URL (after redirects)
\`\`\`

## Adding Headers and Parameters

\`\`\`python
# Query parameters
response = requests.get(
    "https://api.example.com/search",
    params={"q": "python", "limit": 10}
)
# URL becomes: ...?q=python&limit=10

# Custom headers
response = requests.get(
    "https://api.example.com/data",
    headers={"Authorization": "Bearer token123"}
)
\`\`\`

## Handling Errors

\`\`\`python
try:
    response = requests.get(url, timeout=10)
    response.raise_for_status()  # Raises exception for 4xx/5xx
    data = response.json()
except requests.exceptions.RequestException as e:
    print(f"Request failed: {e}")
\`\`\`

**Note:** In this browser environment, we'll simulate HTTP responses since we can't make real network requests.
`,
    starterCode: `# In browser, we simulate API responses
# Real code would use: import requests

# Simulated API response
api_response = {
    "status": 200,
    "data": {
        "users": [
            {"id": 1, "name": "Alice", "email": "alice@example.com"},
            {"id": 2, "name": "Bob", "email": "bob@example.com"}
        ],
        "total": 2
    }
}

# Process the response
if api_response["status"] == 200:
    users = api_response["data"]["users"]
    print(f"Found {len(users)} users:")
    for user in users:
        print(f"  {user['name']}: {user['email']}")
`,
    examples: [
      {
        title: "Processing API Response",
        explanation: "Parse and use JSON data from an API",
        code: `# Simulated weather API response
weather_response = {
    "city": "New York",
    "temperature": 72,
    "conditions": "Sunny",
    "forecast": [
        {"day": "Mon", "high": 75, "low": 60},
        {"day": "Tue", "high": 78, "low": 62},
        {"day": "Wed", "high": 73, "low": 58}
    ]
}

print(f"Weather in {weather_response['city']}:")
print(f"Currently: {weather_response['temperature']}°F, {weather_response['conditions']}")
print("\\nForecast:")
for day in weather_response["forecast"]:
    print(f"  {day['day']}: High {day['high']}°, Low {day['low']}°")`,
      },
      {
        title: "Error Handling Pattern",
        explanation: "Handle different response status codes",
        code: `def process_api_response(response):
    status = response.get("status", 0)

    if status == 200:
        return response["data"]
    elif status == 404:
        print("Resource not found")
        return None
    elif status >= 500:
        print("Server error")
        return None
    else:
        print(f"Unexpected status: {status}")
        return None

# Test with different responses
good_response = {"status": 200, "data": {"message": "Success!"}}
not_found = {"status": 404}

result = process_api_response(good_response)
print(f"Result: {result}")

result = process_api_response(not_found)
print(f"Result: {result}")`,
      },
      {
        title: "Building Request Parameters",
        explanation: "Construct API queries",
        code: `# Build query parameters for an API request
def build_search_url(base_url, **params):
    if not params:
        return base_url
    query = "&".join(f"{k}={v}" for k, v in params.items())
    return f"{base_url}?{query}"

url = build_search_url(
    "https://api.example.com/search",
    query="python",
    page=1,
    limit=25
)
print(f"Request URL: {url}")`,
      },
    ],
    challenges: [
      {
        id: "m6l1c1",
        prompt: "Given response = {'status': 200, 'data': {'count': 42}}, extract and print the count value.",
        hint: "Navigate the nested dictionary structure",
        validateFn: `return output.includes("42")`,
        solution: `response = {'status': 200, 'data': {'count': 42}}
count = response['data']['count']
print(f"Count: {count}")`,
      },
      {
        id: "m6l1c2",
        prompt: "Write a function that checks if response['status'] is 200 and returns response['data'] or None.",
        hint: "Check status, return data if 200, else None",
        validateFn: `return output.includes("Success") && output.includes("None")`,
        solution: `def get_data(response):
    if response.get("status") == 200:
        return response.get("data")
    return None

good = {"status": 200, "data": "Success"}
bad = {"status": 404}
print(get_data(good))
print(get_data(bad))`,
      },
    ],
  },
  {
    module: "Web & APIs",
    moduleSlug: "web-apis",
    lessonNumber: 27,
    slug: "json-apis",
    title: "JSON from APIs",
    badge: "practice",
    theory: `
## API Response Patterns

Most APIs return JSON in predictable structures:

**List of items:**
\`\`\`json
{
  "data": [
    {"id": 1, "name": "Item 1"},
    {"id": 2, "name": "Item 2"}
  ],
  "total": 2
}
\`\`\`

**Single item:**
\`\`\`json
{
  "data": {"id": 1, "name": "Item 1"},
  "status": "success"
}
\`\`\`

**Paginated results:**
\`\`\`json
{
  "data": [...],
  "page": 1,
  "total_pages": 10,
  "next": "https://api.example.com/items?page=2"
}
\`\`\`

## Converting to DataFrame

\`\`\`python
import pandas as pd

# List of dicts → DataFrame
data = [{"name": "A", "value": 1}, {"name": "B", "value": 2}]
df = pd.DataFrame(data)

# Nested structure → normalize
from pandas import json_normalize
df = json_normalize(data, record_path="items", meta=["page"])
\`\`\`

## Working with Nested JSON

\`\`\`python
response = {
    "results": [
        {
            "user": {"name": "Alice", "id": 1},
            "scores": [95, 88, 91]
        }
    ]
}

# Extract nested data
for result in response["results"]:
    name = result["user"]["name"]
    avg_score = sum(result["scores"]) / len(result["scores"])
    print(f"{name}: {avg_score:.1f}")
\`\`\`

## Flattening Nested Data

\`\`\`python
# Manual flattening
rows = []
for item in response["results"]:
    rows.append({
        "name": item["user"]["name"],
        "id": item["user"]["id"],
        "avg_score": sum(item["scores"]) / len(item["scores"])
    })
df = pd.DataFrame(rows)
\`\`\`
`,
    starterCode: `# Process nested API data
api_data = {
    "status": "success",
    "results": [
        {"id": 1, "name": "Product A", "price": 29.99, "tags": ["electronics", "sale"]},
        {"id": 2, "name": "Product B", "price": 49.99, "tags": ["electronics"]},
        {"id": 3, "name": "Product C", "price": 19.99, "tags": ["sale", "clearance"]}
    ],
    "count": 3
}

# Convert results to DataFrame
df = pd.DataFrame(api_data["results"])
print("Products DataFrame:")
print(df)
`,
    examples: [
      {
        title: "Extracting Nested Data",
        explanation: "Navigate complex JSON structures",
        code: `# API response with nested user data
response = {
    "users": [
        {
            "profile": {"name": "Alice", "age": 25},
            "stats": {"posts": 42, "followers": 150}
        },
        {
            "profile": {"name": "Bob", "age": 30},
            "stats": {"posts": 28, "followers": 89}
        }
    ]
}

# Extract and flatten
rows = []
for user in response["users"]:
    rows.append({
        "name": user["profile"]["name"],
        "age": user["profile"]["age"],
        "posts": user["stats"]["posts"],
        "followers": user["stats"]["followers"]
    })

df = pd.DataFrame(rows)
print(df)`,
      },
      {
        title: "Handling Paginated Data",
        explanation: "Combine multiple pages of results",
        code: `# Simulated paginated responses
page1 = {"data": [{"id": 1}, {"id": 2}], "page": 1}
page2 = {"data": [{"id": 3}, {"id": 4}], "page": 2}
page3 = {"data": [{"id": 5}], "page": 3}

# Combine all pages
all_data = []
for page in [page1, page2, page3]:
    all_data.extend(page["data"])

df = pd.DataFrame(all_data)
print(f"Total records: {len(df)}")
print(df)`,
      },
      {
        title: "JSON to DataFrame with Filtering",
        explanation: "Load and filter API data",
        code: `products = [
    {"name": "Widget", "category": "Electronics", "price": 29.99, "in_stock": True},
    {"name": "Gadget", "category": "Electronics", "price": 99.99, "in_stock": False},
    {"name": "Tool", "category": "Hardware", "price": 15.99, "in_stock": True}
]

df = pd.DataFrame(products)

# Filter in-stock electronics
available = df[(df["in_stock"]) & (df["category"] == "Electronics")]
print("Available Electronics:")
print(available)`,
      },
    ],
    challenges: [
      {
        id: "m6l2c1",
        prompt: "Convert this list to DataFrame and filter where price > 20: [{'item': 'A', 'price': 15}, {'item': 'B', 'price': 30}]",
        hint: "pd.DataFrame(list), then filter with df[df['price'] > 20]",
        validateFn: `return output.includes("B") && output.includes("30") && !output.includes("15")`,
        solution: `data = [{'item': 'A', 'price': 15}, {'item': 'B', 'price': 30}]
df = pd.DataFrame(data)
expensive = df[df['price'] > 20]
print(expensive)`,
      },
      {
        id: "m6l2c2",
        prompt: "Extract names from nested data and calculate average age: {'users': [{'info': {'name': 'A', 'age': 20}}, {'info': {'name': 'B', 'age': 30}}]}",
        hint: "Loop through users, access info dict, collect ages for average",
        validateFn: `return output.includes("A") && output.includes("B") && output.includes("25")`,
        solution: `data = {'users': [{'info': {'name': 'A', 'age': 20}}, {'info': {'name': 'B', 'age': 30}}]}
ages = []
for user in data['users']:
    print(f"Name: {user['info']['name']}")
    ages.append(user['info']['age'])
print(f"Average age: {sum(ages)/len(ages)}")`,
      },
    ],
  },
  {
    module: "Web & APIs",
    moduleSlug: "web-apis",
    lessonNumber: 28,
    slug: "beautifulsoup-basics",
    title: "BeautifulSoup Basics",
    badge: "concept",
    theory: `
## What is BeautifulSoup?

BeautifulSoup parses HTML/XML, letting you extract data from web pages:

\`\`\`python
from bs4 import BeautifulSoup

html = "<html><body><h1>Title</h1><p>Content</p></body></html>"
soup = BeautifulSoup(html, "html.parser")

print(soup.h1.text)  # "Title"
print(soup.p.text)   # "Content"
\`\`\`

## Finding Elements

\`\`\`python
# Find first matching element
soup.find("div")
soup.find("div", class_="container")
soup.find("a", href="/page")

# Find all matching elements
soup.find_all("p")
soup.find_all("a")
soup.find_all("div", class_="item")
\`\`\`

## Extracting Data

\`\`\`python
element = soup.find("a")
element.text           # Text content
element.get("href")    # Attribute value
element["href"]        # Same, but may raise error
element.get_text(strip=True)  # Clean text
\`\`\`

## CSS Selectors

\`\`\`python
soup.select("div.container")    # Class selector
soup.select("#main")            # ID selector
soup.select("div p")            # Descendant
soup.select("div > p")          # Direct child
soup.select("a[href]")          # Has attribute
\`\`\`

## Common Pattern: Scraping a List

\`\`\`python
items = []
for row in soup.find_all("tr"):
    cols = row.find_all("td")
    if cols:
        items.append({
            "name": cols[0].text.strip(),
            "price": cols[1].text.strip()
        })
\`\`\`

**Note:** In this browser environment, we'll work with HTML strings since we can't access external websites.
`,
    starterCode: `# We'll simulate BeautifulSoup-like parsing
# In real code: from bs4 import BeautifulSoup

html_content = """
<html>
<body>
    <h1>Product List</h1>
    <div class="product">
        <span class="name">Widget A</span>
        <span class="price">$29.99</span>
    </div>
    <div class="product">
        <span class="name">Widget B</span>
        <span class="price">$49.99</span>
    </div>
</body>
</html>
"""

# Simple parsing (simulating BeautifulSoup)
import re

# Extract product names
names = re.findall(r'<span class="name">([^<]+)</span>', html_content)
print("Products found:")
for name in names:
    print(f"  {name}")
`,
    examples: [
      {
        title: "Extracting Links",
        explanation: "Find and extract href attributes",
        code: `import re

html = '''
<nav>
    <a href="/home">Home</a>
    <a href="/about">About</a>
    <a href="/contact">Contact</a>
</nav>
'''

# Extract links using regex (simulating BeautifulSoup)
pattern = r'<a href="([^"]+)">([^<]+)</a>'
links = re.findall(pattern, html)

print("Navigation links:")
for href, text in links:
    print(f"  {text}: {href}")`,
      },
      {
        title: "Parsing Tables",
        explanation: "Extract data from HTML tables",
        code: `import re

html = '''
<table>
    <tr><th>Name</th><th>Score</th></tr>
    <tr><td>Alice</td><td>95</td></tr>
    <tr><td>Bob</td><td>82</td></tr>
    <tr><td>Carol</td><td>91</td></tr>
</table>
'''

# Extract table rows
rows = re.findall(r'<tr><td>([^<]+)</td><td>([^<]+)</td></tr>', html)

# Convert to DataFrame
df = pd.DataFrame(rows, columns=["name", "score"])
df["score"] = df["score"].astype(int)
print(df)
print(f"\\nAverage score: {df['score'].mean():.1f}")`,
      },
      {
        title: "Extracting Structured Data",
        explanation: "Parse repeated HTML structures",
        code: `import re

html = '''
<div class="card">
    <h2>Product A</h2>
    <p class="price">$29.99</p>
    <p class="stock">In Stock</p>
</div>
<div class="card">
    <h2>Product B</h2>
    <p class="price">$49.99</p>
    <p class="stock">Out of Stock</p>
</div>
'''

# Extract cards
cards = re.findall(
    r'<h2>([^<]+)</h2>\\s*<p class="price">([^<]+)</p>\\s*<p class="stock">([^<]+)</p>',
    html
)

products = []
for name, price, stock in cards:
    products.append({
        "name": name,
        "price": price,
        "available": "In Stock" in stock
    })

df = pd.DataFrame(products)
print(df)`,
      },
    ],
    challenges: [
      {
        id: "m6l3c1",
        prompt: "Extract all text between <li> tags from: '<ul><li>Apple</li><li>Banana</li><li>Cherry</li></ul>'",
        hint: "Use re.findall with pattern r'<li>([^<]+)</li>'",
        validateFn: `return output.includes("Apple") && output.includes("Banana") && output.includes("Cherry")`,
        solution: `import re
html = '<ul><li>Apple</li><li>Banana</li><li>Cherry</li></ul>'
items = re.findall(r'<li>([^<]+)</li>', html)
for item in items:
    print(item)`,
      },
      {
        id: "m6l3c2",
        prompt: "Parse '<a href=\"/page1\">Link 1</a><a href=\"/page2\">Link 2</a>' and print each URL and text.",
        hint: "Pattern: r'<a href=\"([^\"]+)\">([^<]+)</a>'",
        validateFn: `return output.includes("/page1") && output.includes("Link 1") && output.includes("/page2")`,
        solution: `import re
html = '<a href="/page1">Link 1</a><a href="/page2">Link 2</a>'
links = re.findall(r'<a href="([^"]+)">([^<]+)</a>', html)
for url, text in links:
    print(f"{text}: {url}")`,
      },
    ],
  },
  {
    module: "Web & APIs",
    moduleSlug: "web-apis",
    lessonNumber: 29,
    slug: "scraping-tables",
    title: "Scraping Tables",
    badge: "practice",
    theory: `
## pd.read_html() — The Easy Way

Pandas can automatically parse HTML tables:

\`\`\`python
tables = pd.read_html("https://example.com/data")
# Returns list of DataFrames, one per table found
df = tables[0]  # First table
\`\`\`

## Parameters for read_html

\`\`\`python
pd.read_html(
    source,           # URL, file, or HTML string
    match="pattern",  # Only tables containing this text
    header=0,         # Row to use as header
    index_col=0,      # Column to use as index
    skiprows=1,       # Skip first N rows
    attrs={"id": "table-id"}  # Match specific table
)
\`\`\`

## From HTML String

\`\`\`python
html = '''
<table>
  <tr><th>Name</th><th>Score</th></tr>
  <tr><td>Alice</td><td>95</td></tr>
  <tr><td>Bob</td><td>82</td></tr>
</table>
'''
tables = pd.read_html(html)
df = tables[0]
\`\`\`

## Cleaning Table Data

After parsing, you often need to clean:

\`\`\`python
# Remove extra whitespace
df.columns = df.columns.str.strip()
df = df.apply(lambda x: x.str.strip() if x.dtype == "object" else x)

# Convert types
df["Score"] = pd.to_numeric(df["Score"], errors="coerce")

# Rename columns
df.columns = ["name", "score"]
\`\`\`

## Real-World Tips

1. Tables might have merged cells (headers span multiple columns)
2. Some tables use images instead of text
3. Tables might be loaded by JavaScript (need Selenium)
4. Always check \`len(tables)\` to see how many were found
`,
    starterCode: `# Parse HTML table with pandas
html_table = """
<table border="1">
    <thead>
        <tr><th>Product</th><th>Category</th><th>Price</th><th>Stock</th></tr>
    </thead>
    <tbody>
        <tr><td>Laptop</td><td>Electronics</td><td>$999</td><td>50</td></tr>
        <tr><td>Mouse</td><td>Electronics</td><td>$29</td><td>200</td></tr>
        <tr><td>Desk</td><td>Furniture</td><td>$299</td><td>25</td></tr>
        <tr><td>Chair</td><td>Furniture</td><td>$199</td><td>40</td></tr>
    </tbody>
</table>
"""

# Parse the table
tables = pd.read_html(html_table)
df = tables[0]
print("Parsed table:")
print(df)
`,
    examples: [
      {
        title: "Basic Table Parsing",
        explanation: "Extract a simple HTML table",
        code: `html = """
<table>
    <tr><th>Name</th><th>Age</th><th>City</th></tr>
    <tr><td>Alice</td><td>25</td><td>NYC</td></tr>
    <tr><td>Bob</td><td>30</td><td>LA</td></tr>
    <tr><td>Carol</td><td>28</td><td>Chicago</td></tr>
</table>
"""

df = pd.read_html(html)[0]
print(df)
print(f"\\nAverage age: {df['Age'].mean():.1f}")`,
      },
      {
        title: "Cleaning Parsed Data",
        explanation: "Process table data after extraction",
        code: `html = """
<table>
    <tr><th>Item</th><th>Price</th></tr>
    <tr><td>Widget</td><td>$29.99</td></tr>
    <tr><td>Gadget</td><td>$49.99</td></tr>
    <tr><td>Gizmo</td><td>$19.99</td></tr>
</table>
"""

df = pd.read_html(html)[0]

# Clean price column - remove $ and convert to float
df["Price"] = df["Price"].str.replace("$", "", regex=False).astype(float)

print(df)
print(f"\\nTotal value: \${df['Price'].sum():.2f}")`,
      },
      {
        title: "Multiple Tables",
        explanation: "Handle pages with multiple tables",
        code: `html = """
<h2>Sales</h2>
<table>
    <tr><th>Product</th><th>Revenue</th></tr>
    <tr><td>A</td><td>1000</td></tr>
</table>

<h2>Expenses</h2>
<table>
    <tr><th>Category</th><th>Amount</th></tr>
    <tr><td>Rent</td><td>500</td></tr>
</table>
"""

tables = pd.read_html(html)
print(f"Found {len(tables)} tables")

print("\\nTable 1 (Sales):")
print(tables[0])

print("\\nTable 2 (Expenses):")
print(tables[1])`,
      },
    ],
    challenges: [
      {
        id: "m6l4c1",
        prompt: "Parse this HTML table and calculate the sum of the Value column: '<table><tr><th>Name</th><th>Value</th></tr><tr><td>A</td><td>100</td></tr><tr><td>B</td><td>200</td></tr></table>'",
        hint: "pd.read_html(html)[0], then sum the Value column",
        validateFn: `return output.includes("300")`,
        solution: `html = '<table><tr><th>Name</th><th>Value</th></tr><tr><td>A</td><td>100</td></tr><tr><td>B</td><td>200</td></tr></table>'
df = pd.read_html(html)[0]
total = df['Value'].sum()
print(f"Total: {total}")`,
      },
      {
        id: "m6l4c2",
        prompt: "Parse a table with prices like '$10.99', remove the $ sign, convert to float, and find the max price.",
        hint: "str.replace('$', ''), astype(float), then .max()",
        validateFn: `return output.includes("25") || output.includes("25.99")`,
        solution: `html = '''<table>
<tr><th>Item</th><th>Price</th></tr>
<tr><td>A</td><td>$10.99</td></tr>
<tr><td>B</td><td>$25.99</td></tr>
<tr><td>C</td><td>$15.99</td></tr>
</table>'''
df = pd.read_html(html)[0]
df['Price'] = df['Price'].str.replace('$', '', regex=False).astype(float)
print(f"Max price: \${df['Price'].max()}")`,
      },
    ],
  },
  {
    module: "Web & APIs",
    moduleSlug: "web-apis",
    lessonNumber: 30,
    slug: "data-pipeline",
    title: "Building a Data Pipeline",
    badge: "challenge",
    theory: `
## What is a Data Pipeline?

A pipeline is a series of steps that transform raw data into useful output:

1. **Extract** — Get data from source (API, file, database)
2. **Transform** — Clean, reshape, enrich the data
3. **Load** — Save to destination (file, database, dashboard)

## Pipeline Pattern

\`\`\`python
def extract():
    # Fetch raw data
    response = requests.get("https://api.example.com/data")
    return response.json()

def transform(raw_data):
    # Clean and process
    df = pd.DataFrame(raw_data)
    df = df.dropna()
    df["date"] = pd.to_datetime(df["date"])
    return df

def load(df, filename):
    # Save results
    df.to_csv(filename, index=False)
    print(f"Saved {len(df)} rows to {filename}")

# Run pipeline
raw = extract()
clean = transform(raw)
load(clean, "output.csv")
\`\`\`

## Error Handling in Pipelines

\`\`\`python
def run_pipeline():
    try:
        raw = extract()
        if not raw:
            raise ValueError("No data extracted")

        clean = transform(raw)
        if len(clean) == 0:
            raise ValueError("No data after transformation")

        load(clean, "output.csv")
        return True

    except Exception as e:
        print(f"Pipeline failed: {e}")
        return False
\`\`\`

## Logging Progress

\`\`\`python
def log(msg):
    from datetime import datetime
    print(f"[{datetime.now():%H:%M:%S}] {msg}")

log("Starting extraction...")
# ... do work
log("Extracted 1000 records")
\`\`\`

## Best Practices

1. Make each step a function
2. Return data, don't modify in place
3. Validate data between steps
4. Log progress and errors
5. Make it idempotent (safe to re-run)
`,
    starterCode: `# Build a mini data pipeline

# Step 1: Extract (simulated API data)
def extract():
    raw_data = [
        {"date": "2024-01-15", "product": "Widget", "sales": "1500", "region": "East"},
        {"date": "2024-01-15", "product": "Gadget", "sales": "800", "region": "West"},
        {"date": "2024-01-16", "product": "Widget", "sales": "1200", "region": "East"},
        {"date": "2024-01-16", "product": "Gadget", "sales": None, "region": "West"},
        {"date": "2024-01-17", "product": "Widget", "sales": "1800", "region": "East"},
    ]
    print(f"Extracted {len(raw_data)} records")
    return raw_data

# Step 2: Transform
def transform(data):
    df = pd.DataFrame(data)
    print(f"Raw records: {len(df)}")

    # Drop rows with missing sales
    df = df.dropna(subset=["sales"])
    print(f"After dropna: {len(df)}")

    # Convert types
    df["sales"] = pd.to_numeric(df["sales"])
    df["date"] = pd.to_datetime(df["date"])

    return df

# Step 3: Load (aggregate and display)
def load(df):
    summary = df.groupby("product")["sales"].agg(["sum", "mean", "count"])
    print("\\n=== Sales Summary ===")
    print(summary)
    return summary

# Run the pipeline
raw = extract()
clean = transform(raw)
result = load(clean)
`,
    examples: [
      {
        title: "Complete ETL Pipeline",
        explanation: "Full extract-transform-load workflow",
        code: `def extract_sales():
    return [
        {"product": "A", "qty": "10", "price": "9.99"},
        {"product": "B", "qty": "5", "price": "19.99"},
        {"product": "A", "qty": "8", "price": "9.99"},
        {"product": "C", "qty": "invalid", "price": "14.99"},
    ]

def transform_sales(data):
    df = pd.DataFrame(data)
    # Safe conversion
    df["qty"] = pd.to_numeric(df["qty"], errors="coerce")
    df["price"] = pd.to_numeric(df["price"], errors="coerce")
    # Drop invalid
    df = df.dropna()
    # Calculate revenue
    df["revenue"] = df["qty"] * df["price"]
    return df

def load_summary(df):
    print("=== Revenue by Product ===")
    summary = df.groupby("product")["revenue"].sum()
    print(summary)
    print(f"\\nTotal Revenue: \${summary.sum():.2f}")

# Run it
raw = extract_sales()
clean = transform_sales(raw)
load_summary(clean)`,
      },
      {
        title: "Pipeline with Validation",
        explanation: "Add checks between steps",
        code: `def validate_data(df, min_rows=1):
    if len(df) < min_rows:
        raise ValueError(f"Expected {min_rows}+ rows, got {len(df)}")
    if df.isna().any().any():
        print("Warning: Data contains NaN values")
    return True

def run_pipeline():
    # Extract
    data = [{"x": 1}, {"x": 2}, {"x": 3}]
    df = pd.DataFrame(data)
    print(f"Extracted {len(df)} rows")

    # Validate
    try:
        validate_data(df, min_rows=2)
        print("Validation passed!")
    except ValueError as e:
        print(f"Validation failed: {e}")
        return None

    # Transform
    df["x_squared"] = df["x"] ** 2
    print(f"Transformed: added x_squared column")

    return df

result = run_pipeline()
print("\\nFinal result:")
print(result)`,
      },
      {
        title: "Logging Pipeline Progress",
        explanation: "Track pipeline execution",
        code: `from datetime import datetime

def log(step, message):
    print(f"[{datetime.now():%H:%M:%S}] [{step}] {message}")

def etl_with_logging():
    log("START", "Pipeline beginning")

    # Extract
    log("EXTRACT", "Fetching data...")
    data = [{"id": i, "value": i * 10} for i in range(5)]
    log("EXTRACT", f"Got {len(data)} records")

    # Transform
    log("TRANSFORM", "Processing data...")
    df = pd.DataFrame(data)
    df["doubled"] = df["value"] * 2
    log("TRANSFORM", "Added doubled column")

    # Load
    log("LOAD", "Generating output...")
    print(df)
    log("LOAD", f"Output {len(df)} rows")

    log("END", "Pipeline complete!")

etl_with_logging()`,
      },
    ],
    challenges: [
      {
        id: "m6l5c1",
        prompt: "Build a pipeline that: extracts [{'name': 'A', 'score': '85'}, {'name': 'B', 'score': '92'}], converts score to int, and prints the average.",
        hint: "Create extract/transform functions, convert with pd.to_numeric",
        validateFn: `return output.includes("88") || output.includes("88.5")`,
        solution: `def extract():
    return [{'name': 'A', 'score': '85'}, {'name': 'B', 'score': '92'}]

def transform(data):
    df = pd.DataFrame(data)
    df['score'] = pd.to_numeric(df['score'])
    return df

def analyze(df):
    print(f"Average score: {df['score'].mean()}")

raw = extract()
clean = transform(raw)
analyze(clean)`,
      },
      {
        id: "m6l5c2",
        prompt: "Create a pipeline with validation that rejects data with fewer than 3 rows. Test with 2-row data.",
        hint: "Check len(df) and raise ValueError if too few",
        validateFn: `return output.includes("fail") || output.includes("Error") || output.includes("fewer")`,
        solution: `def validate(df):
    if len(df) < 3:
        raise ValueError("Too few rows! Need at least 3")
    return df

def run_pipeline():
    data = [{"x": 1}, {"x": 2}]  # Only 2 rows
    df = pd.DataFrame(data)
    try:
        validate(df)
        print("Success!")
    except ValueError as e:
        print(f"Pipeline failed: {e}")

run_pipeline()`,
      },
    ],
  },
];
