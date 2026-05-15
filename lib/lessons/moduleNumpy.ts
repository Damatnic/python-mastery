import type { Lesson } from "../types";

export const lessonsModuleNumpy: Lesson[] = [
  {
    module: "NumPy Foundations",
    moduleSlug: "numpy-foundations",
    lessonNumber: 36,
    slug: "arrays-and-dtypes",
    title: "Arrays and dtypes",
    badge: "concept",
    theory: `
## why NumPy when pandas exists

Every pandas DataFrame and Series is a thin layer over a NumPy array. The math is in NumPy. So when pandas gets slow on a hot loop, the fix is almost always "drop to NumPy."

NumPy arrays have:

- **One dtype per array.** A whole array is \`int64\` or \`float64\` or \`bool\`. No mixed columns. That's what makes them fast.
- **A fixed shape.** You declare a shape; NumPy lays the bytes out contiguously. Reshape later if needed.
- **No labels.** Just positions. Labels are pandas's job.

## creating arrays

\`\`\`python
import numpy as np

a = np.array([1, 2, 3, 4])        # 1D, dtype inferred (int64)
b = np.array([[1, 2], [3, 4]])    # 2D, shape (2, 2)
c = np.zeros((3, 4))              # 3x4 of float zeros
d = np.arange(0, 10, 2)           # [0, 2, 4, 6, 8]
e = np.linspace(0, 1, 5)          # [0., 0.25, 0.5, 0.75, 1.]
\`\`\`

## dtype matters

Mixing types triggers automatic promotion:

\`\`\`python
np.array([1, 2, 3]).dtype          # int64
np.array([1, 2, 3.0]).dtype        # float64 (one float promoted everything)
np.array([1, "a"]).dtype           # <U21 (string), all numbers got stringified
\`\`\`

This is the failure mode you'll hit again and again. A bad value in a CSV makes the whole column a string and your math silently breaks.

## shape & indexing

\`\`\`python
m = np.array([[1, 2, 3], [4, 5, 6]])
m.shape         # (2, 3)
m.size          # 6 total elements
m[0]            # first row: [1, 2, 3]
m[0, 1]         # element at row 0, col 1: 2
m[:, 1]         # all rows, second column: [2, 5]
m[1, :]         # second row, all columns: [4, 5, 6]
\`\`\`

Slicing returns a **view** into the same memory, not a copy. Modifying the slice modifies the original. Useful, easy to forget.
`,
    starterCode: `import numpy as np

# Build a small 2D array and explore its shape and dtype
sales = np.array([
    [120, 95, 80],
    [200, 180, 160],
    [310, 290, 270],
])

print("shape:", sales.shape)
print("dtype:", sales.dtype)
print("total elements:", sales.size)

# First row (single product across three regions)
print("product 0 across regions:", sales[0])
# Middle region column
print("region 1 across products:", sales[:, 1])
`,
    examples: [
      {
        title: "Array creation utilities",
        explanation: "zeros, ones, arange, linspace cover most starter shapes.",
        code: `import numpy as np

print("zeros:", np.zeros(5))
print("ones:", np.ones((2, 3)))
print("arange:", np.arange(0, 1.5, 0.25))
print("linspace:", np.linspace(0, 100, 5))`,
      },
      {
        title: "dtype promotion landmines",
        explanation: "One stray string promotes the whole array. This is the source of most 'why is my math returning weird stuff' bugs.",
        code: `import numpy as np

# Clean numeric
a = np.array([1, 2, 3])
print(a.dtype, a.sum())  # int64, 6

# One float in the list -> everything becomes float
b = np.array([1, 2, 3.0])
print(b.dtype, b.sum())  # float64, 6.0

# One string -> the whole thing becomes a string array
c = np.array([1, 2, "n/a"])
print(c.dtype)           # <U21
# c.sum() would now error or concatenate, not add`,
      },
      {
        title: "Slices are views, not copies",
        explanation: "Editing a slice mutates the original array. Use .copy() when you want a real new array.",
        code: `import numpy as np

a = np.array([10, 20, 30, 40, 50])
view = a[1:4]
view[0] = 999
print("a is now:", a)   # [10, 999, 30, 40, 50]

# To avoid the alias:
b = np.array([10, 20, 30, 40, 50])
real_copy = b[1:4].copy()
real_copy[0] = 999
print("b unchanged:", b)`,
      },
    ],
    challenges: [
      {
        id: "m8l1c1",
        prompt: "Build a 1D NumPy array of the integers from 5 through 14 inclusive. Print its dtype and its sum on separate lines in the format 'dtype: ...' and 'sum: ...'.",
        hint: "np.arange(5, 15), then .dtype and .sum()",
        validateFn: `return /dtype:\\s*int(32|64)/.test(output) && /sum:\\s*95/.test(output)`,
        solution: `import numpy as np
a = np.arange(5, 15)
print(f"dtype: {a.dtype}")
print(f"sum: {a.sum()}")`,
      },
      {
        id: "m8l1c2",
        prompt: "Build a 3x4 array of float zeros, set every value in the middle row (row index 1) to 7, and print the array. Then on the next line print 'row_sum: 28' where 28 is the sum of that row.",
        hint: "np.zeros((3, 4)), assign a[1] = 7, print, then print f'row_sum: {a[1].sum()}'",
        validateFn: `return output.includes("7.") && /row_sum:\\s*28(\\.0)?/.test(output)`,
        solution: `import numpy as np
a = np.zeros((3, 4))
a[1] = 7
print(a)
print(f"row_sum: {a[1].sum()}")`,
      },
    ],
  },
  {
    module: "NumPy Foundations",
    moduleSlug: "numpy-foundations",
    lessonNumber: 37,
    slug: "reshape-and-axis",
    title: "Reshape and axis",
    badge: "concept",
    theory: `
## reshape

Reshape rearranges how a 1D buffer of numbers is interpreted. It doesn't move data; it changes the strides used to walk it.

\`\`\`python
import numpy as np
a = np.arange(12)               # shape (12,)
b = a.reshape(3, 4)             # shape (3, 4); same 12 numbers
c = a.reshape(4, 3)             # shape (4, 3); same 12 numbers
\`\`\`

\`a.reshape(-1, 4)\` lets NumPy compute the missing dimension. Useful when you know the column count but not the row count.

## axis = the dimension being collapsed

\`axis=0\` collapses rows (you get one value per column). \`axis=1\` collapses columns (one value per row).

\`\`\`python
m = np.array([
    [1, 2, 3],
    [4, 5, 6],
])
m.sum()              # 21 (whole thing)
m.sum(axis=0)        # [5, 7, 9]   <- columnwise totals
m.sum(axis=1)        # [6, 15]     <- rowwise totals
\`\`\`

The trick that makes this stick: **axis names the dimension that disappears.** \`axis=0\` collapses dimension 0 (rows), so the row dimension goes away and you're left with one number per column.

## transpose & stacking

\`\`\`python
m.T                    # transpose, shape (3, 2)
np.vstack([m, m])      # stack vertically, shape (4, 3)
np.hstack([m, m])      # stack horizontally, shape (2, 6)
np.concatenate([m, m], axis=0)  # same as vstack
\`\`\`
`,
    starterCode: `import numpy as np

# 12 sales numbers arrive as a flat buffer
raw = np.arange(120, 132)  # [120, 121, ..., 131]

# Read them as 3 products x 4 weeks
sales = raw.reshape(3, 4)
print("matrix:")
print(sales)

print("per-week totals (collapse rows, axis=0):", sales.sum(axis=0))
print("per-product totals (collapse cols, axis=1):", sales.sum(axis=1))
`,
    examples: [
      {
        title: "Reshape with -1 for the unknown dimension",
        explanation: "If you know one dimension, pass -1 for the other and NumPy fills it in.",
        code: `import numpy as np

a = np.arange(20)
print(a.reshape(-1, 5).shape)  # (4, 5)
print(a.reshape(2, -1).shape)  # (2, 10)
print(a.reshape(-1, 4).shape)  # (5, 4)`,
      },
      {
        title: "axis=0 vs axis=1 for aggregates",
        explanation: "Same array, two different aggregates, depending on which dimension you collapse.",
        code: `import numpy as np

# 3 students x 4 quizzes
scores = np.array([
    [85, 92, 78, 90],
    [70, 88, 95, 80],
    [60, 75, 80, 70],
])

print("class average per quiz:", scores.mean(axis=0))
print("student average across quizzes:", scores.mean(axis=1))

# argmax: who got the best score on each quiz?
print("top scorer per quiz (row index):", scores.argmax(axis=0))`,
      },
      {
        title: "Transpose and stack",
        explanation: "Reshaping is for the same data in a new shape. Transpose flips rows and columns. Stack glues separate arrays together.",
        code: `import numpy as np

a = np.array([[1, 2, 3], [4, 5, 6]])
print("a shape:", a.shape)
print("a.T shape:", a.T.shape)
print("a.T:\\n", a.T)

b = np.array([[7, 8, 9]])
print("\\nvstack:\\n", np.vstack([a, b]))
print("\\nhstack:\\n", np.hstack([a, a]))`,
      },
    ],
    challenges: [
      {
        id: "m8l2c1",
        prompt: "Take np.arange(24) and reshape it into a 4-row matrix without specifying the column count. Print the shape in the format 'shape: (R, C)' (with literal parens).",
        hint: "Use reshape(4, -1) and print f'shape: {arr.shape}'",
        validateFn: `return /shape:\\s*\\(4,\\s*6\\)/.test(output)`,
        solution: `import numpy as np
arr = np.arange(24).reshape(4, -1)
print(f"shape: {arr.shape}")`,
      },
      {
        id: "m8l2c2",
        prompt: "You have a 3x4 sales matrix [[10,20,30,40],[15,25,35,45],[5,15,25,35]]. Compute totals per column and per row. Print 'col totals: [a, b, c, d]' and 'row totals: [e, f, g]' with the actual numbers.",
        hint: "sum with axis=0 for column totals, axis=1 for row totals",
        validateFn: `return /col\\s*totals:\\s*\\[\\s*30\\s+60\\s+90\\s+120\\s*\\]/i.test(output) && /row\\s*totals:\\s*\\[\\s*100\\s+120\\s+80\\s*\\]/i.test(output)`,
        solution: `import numpy as np
m = np.array([[10,20,30,40],[15,25,35,45],[5,15,25,35]])
print(f"col totals: {m.sum(axis=0)}")
print(f"row totals: {m.sum(axis=1)}")`,
      },
    ],
  },
  {
    module: "NumPy Foundations",
    moduleSlug: "numpy-foundations",
    lessonNumber: 38,
    slug: "broadcasting",
    title: "Broadcasting",
    badge: "concept",
    theory: `
## broadcasting

Broadcasting is the rule that lets arrays of different shapes line up. When the shapes match (or one is 1 in a dimension), NumPy stretches the smaller one to fit. No data is copied.

## the rule

Two shapes are compatible if, working right-to-left, each pair of dimensions is either equal or one of them is 1.

\`\`\`
(3, 4)  and  (4,)        -> compatible, becomes (3, 4)
(3, 4)  and  (3, 1)      -> compatible, becomes (3, 4)
(3, 4)  and  (3,)        -> NOT compatible, ValueError
\`\`\`

## broadcasting gone wrong

If your shapes happen to be compatible but you didn't mean them to be, the math runs anyway. Always check \`shape\` on both operands before you trust the result.
`,
    starterCode: `import numpy as np

# 3 stores x 4 weeks of sales
sales = np.array([
    [120, 150, 180, 210],
    [200, 220, 230, 250],
    [80,  90,  100, 110],
])

# Apply a 7% tax to every cell using a scalar
with_tax = sales * 1.07
print("with tax:")
print(with_tax.round(2))

# Subtract each store's weekly average from each of its weeks (broadcast a column)
weekly_avg = sales.mean(axis=1).reshape(-1, 1)
centered = sales - weekly_avg
print("\\ncentered (vs each store's average):")
print(centered)
`,
    examples: [
      {
        title: "Scalar broadcasts to every cell",
        explanation: "The simplest case: one number applied to a whole array.",
        code: `import numpy as np

a = np.array([[10, 20], [30, 40]])
print("a + 1:\\n", a + 1)
print("a * 0.5:\\n", a * 0.5)
print("a ** 2:\\n", a ** 2)`,
      },
      {
        title: "1D array broadcasts across a 2D array",
        explanation: "Shape (3,) lines up with the last dimension of shape (4, 3). Each row gets the same vector added.",
        code: `import numpy as np

matrix = np.array([[1, 2, 3], [4, 5, 6], [7, 8, 9], [10, 11, 12]])
discounts = np.array([0.1, 0.2, 0.3])
print(matrix.shape, "x", discounts.shape, "->", (matrix * (1 - discounts)).shape)
print(matrix * (1 - discounts))`,
      },
      {
        title: "When shapes don't line up",
        explanation: "The most common bug: forgetting to reshape a vector. NumPy will tell you, but the error wording is dense.",
        code: `import numpy as np

a = np.zeros((3, 4))   # shape (3, 4)
v = np.array([1, 2, 3])  # shape (3,)

try:
    result = a + v
except ValueError as e:
    print("error:", e)
    print("fix: reshape v to (3, 1) so it lines up by columns instead of by rows")
    print(a + v.reshape(3, 1))`,
      },
    ],
    challenges: [
      {
        id: "m8l3c1",
        prompt: "Given prices = np.array([10, 25, 40, 5]), apply a 15% discount and a $2 shipping surcharge in one expression. Print the result formatted as 'final: [a b c d]' (let numpy print the array).",
        hint: "prices * 0.85 + 2",
        validateFn: `return /final:\\s*\\[\\s*10\\.5\\s+23\\.25\\s+36\\s+6\\.25\\s*\\]/i.test(output)`,
        solution: `import numpy as np
prices = np.array([10, 25, 40, 5])
final = prices * 0.85 + 2
print(f"final: {final}")`,
      },
      {
        id: "m8l3c2",
        prompt: "Center every column of m = np.array([[10, 20, 30], [40, 50, 60], [70, 80, 90]]) so each column has mean 0. Print the centered matrix on one line and 'col means after: [0. 0. 0.]' on the next.",
        hint: "Subtract m.mean(axis=0), then verify with the new col means",
        validateFn: `return /col\\s*means\\s*after:\\s*\\[\\s*0\\.?\\s+0\\.?\\s+0\\.?\\s*\\]/i.test(output) && output.includes("-30")`,
        solution: `import numpy as np
m = np.array([[10, 20, 30], [40, 50, 60], [70, 80, 90]])
centered = m - m.mean(axis=0)
print(centered)
print(f"col means after: {centered.mean(axis=0)}")`,
      },
    ],
  },
  {
    module: "NumPy Foundations",
    moduleSlug: "numpy-foundations",
    lessonNumber: 39,
    slug: "vectorization-vs-loops",
    title: "Vectorization vs loops",
    badge: "practice",
    theory: `
## the slow way

You can iterate over a NumPy array with a Python \`for\` loop. It works. It's also one to two orders of magnitude slower than the vectorized version.

\`\`\`python
# Slow: Python loop runs once per element
result = []
for x in a:
    result.append(x ** 2 + 1)
result = np.array(result)
\`\`\`

\`\`\`python
# Fast: one C-level call to do the same thing
result = a ** 2 + 1
\`\`\`

The vectorized form is also shorter, easier to read, and impossible to get wrong on the indexing.

## vectorized conditionals

\`np.where\` is the vectorized if/else. Branchless, no Python loop.

\`\`\`python
# Slow:
out = []
for x in a:
    out.append(0 if x < 0 else x)
out = np.array(out)

# Fast:
out = np.where(a < 0, 0, a)
\`\`\`

For more than two branches, \`np.select\`:

\`\`\`python
np.select(
    [a < 0, a < 100, a >= 100],
    ["below_zero", "small", "big"],
    default="unknown",
)
\`\`\`

## See also
The SQL equivalent of \`np.where\` is a \`CASE WHEN ... THEN ... ELSE ... END\` expression. Same branchless mental model, different syntax. The full SQL CASE lesson lives on damato-sql at [/learn/data-analysis/case-expressions](https://damato-sql.vercel.app/learn/data-analysis/case-expressions).
`,
    starterCode: `import numpy as np
import time

# 100,000 random values
rng = np.random.default_rng(0)
a = rng.integers(low=-50, high=50, size=100_000)

# Slow: pure Python loop
t0 = time.perf_counter()
loop_result = np.zeros_like(a)
for i, x in enumerate(a):
    loop_result[i] = 0 if x < 0 else x * 2
loop_secs = time.perf_counter() - t0

# Fast: vectorized with np.where
t0 = time.perf_counter()
vec_result = np.where(a < 0, 0, a * 2)
vec_secs = time.perf_counter() - t0

print(f"loop:       {loop_secs*1000:7.1f} ms")
print(f"vectorized: {vec_secs*1000:7.1f} ms")
print(f"speedup:    {loop_secs / vec_secs:.0f}x")
print("results match:", np.array_equal(loop_result, vec_result))
`,
    examples: [
      {
        title: "np.where for binary branching",
        explanation: "Replace if/else inside a loop with one call.",
        code: `import numpy as np

scores = np.array([55, 80, 92, 47, 73, 90])
grades = np.where(scores >= 70, "pass", "fail")
print(grades)
print("pass count:", (scores >= 70).sum())`,
      },
      {
        title: "np.select for multi-branch tiering",
        explanation: "Three or more buckets. Conditions list, choices list, default fallback.",
        code: `import numpy as np

prices = np.array([5, 25, 50, 120, 999])
tier = np.select(
    [prices < 10, prices < 50, prices < 200],
    ["cheap", "mid", "premium"],
    default="luxury",
)
print(list(zip(prices, tier)))`,
      },
      {
        title: "Vectorization gets harder with stateful loops",
        explanation: "Some sequences (running totals, cumulative ops) need a vectorized primitive, not just elementwise math.",
        code: `import numpy as np

daily = np.array([10, -3, 7, 4, -2, 8])

# Cumulative balance
balance = np.cumsum(daily)
print("balance trajectory:", balance)

# Rolling max so far
running_max = np.maximum.accumulate(daily)
print("running max:", running_max)`,
      },
    ],
    challenges: [
      {
        id: "m8l4c1",
        prompt: "Given temps = np.array([-5, 12, -3, 20, 0, 8, -10, 15]), replace every negative value with 0 using np.where (no loops). Print 'positive_only: [...]' showing the resulting array.",
        hint: "np.where(temps < 0, 0, temps)",
        validateFn: `return /positive_only:\\s*\\[\\s*0\\s+12\\s+0\\s+20\\s+0\\s+8\\s+0\\s+15\\s*\\]/i.test(output)`,
        solution: `import numpy as np
temps = np.array([-5, 12, -3, 20, 0, 8, -10, 15])
positive_only = np.where(temps < 0, 0, temps)
print(f"positive_only: {positive_only}")`,
      },
      {
        id: "m8l4c2",
        prompt: "Categorize purchase amounts = np.array([3, 18, 55, 130, 240, 800]) into 'small' (<20), 'medium' (<100), 'large' (<500), or 'enterprise' (>=500). Print 'tiers:' followed by the resulting array on the next line.",
        hint: "np.select with three conditions, default='enterprise'",
        validateFn: `return /tiers:/i.test(output) && /small/.test(output) && /medium/.test(output) && /large/.test(output) && /enterprise/.test(output)`,
        solution: `import numpy as np
amounts = np.array([3, 18, 55, 130, 240, 800])
tiers = np.select(
    [amounts < 20, amounts < 100, amounts < 500],
    ["small", "medium", "large"],
    default="enterprise",
)
print("tiers:")
print(tiers)`,
      },
    ],
  },
  {
    module: "NumPy Foundations",
    moduleSlug: "numpy-foundations",
    lessonNumber: 40,
    slug: "numpy-pandas-crossover",
    title: "NumPy ↔ pandas crossover",
    badge: "practice",
    theory: `
## pandas is built on numpy

Pandas exists to add labels (index, columns) and convenience (groupby, merge) on top of NumPy. The math is still NumPy. Dropping to it gives you speed and breaks you out of any quirks pandas adds.

\`\`\`python
import pandas as pd
import numpy as np

s = pd.Series([1.0, 2.0, 3.0])
s.to_numpy()        # array([1., 2., 3.])
s.values            # older API, same thing
np.asarray(s)       # works on Series or DataFrame
\`\`\`

## mixed workflow

\`\`\`python
# Pandas for loading and joining
df = pd.read_csv("sales.csv")
df = df.merge(products, on="sku")

# NumPy for the actual math
arr = df[["price", "quantity"]].to_numpy()
revenue = (arr[:, 0] * arr[:, 1]).sum()

# Back to pandas to label the result
df["revenue"] = arr[:, 0] * arr[:, 1]
\`\`\`

The crossover isn't a one-way trip. You move down to NumPy for speed, then back up to pandas for everything else.
`,
    starterCode: `import pandas as pd
import numpy as np

df = pd.DataFrame({
    "product": ["A", "B", "C", "D"],
    "price":   [10.0, 25.0, 7.5, 100.0],
    "qty":     [4, 2, 10, 1],
})

# Drop down to numpy for the math
arr = df[["price", "qty"]].to_numpy()
revenue = arr[:, 0] * arr[:, 1]

# Bring the result back up to pandas with a label
df["revenue"] = revenue
df["pct_of_total"] = revenue / revenue.sum() * 100

print(df)
print(f"\\ntotal revenue: {revenue.sum():.2f}")
print(f"dtype of pct_of_total column: {df['pct_of_total'].dtype}")
`,
    examples: [
      {
        title: "Converting in both directions",
        explanation: "Series → array with to_numpy(); array → Series by constructor.",
        code: `import pandas as pd
import numpy as np

s = pd.Series([100, 200, 300], name="revenue")
arr = s.to_numpy()
print("array:", arr, type(arr).__name__)

back = pd.Series(arr * 2, name="revenue_doubled")
print(back)`,
      },
      {
        title: "Where dropping to NumPy actually helps",
        explanation: "Heavy elementwise math on one column. Convert once, do the math, write back.",
        code: `import pandas as pd
import numpy as np

df = pd.DataFrame({"x": np.arange(1_000_000, dtype=float)})

# Pandas style
df["pandas_way"] = df["x"] ** 2 + 1

# NumPy style: one conversion, then pure C math
x = df["x"].to_numpy()
df["numpy_way"] = x ** 2 + 1

print("identical results:", np.allclose(df["pandas_way"], df["numpy_way"]))
print("first 3 rows:")
print(df.head(3))`,
      },
      {
        title: "Mixing the two for a real calc",
        explanation: "Pandas for the join and the labels, NumPy for the math.",
        code: `import pandas as pd
import numpy as np

orders = pd.DataFrame({
    "order_id": [1, 2, 3, 4],
    "sku": ["A", "B", "A", "C"],
    "qty": [3, 1, 5, 2],
})
catalog = pd.DataFrame({
    "sku": ["A", "B", "C"],
    "price": [10.0, 50.0, 7.5],
})

joined = orders.merge(catalog, on="sku")              # pandas
arr = joined[["price", "qty"]].to_numpy()             # leave pandas
line_total = arr[:, 0] * arr[:, 1]                    # numpy math
joined["line_total"] = line_total                     # back to pandas

print(joined)
print(f"\\norder grand total: {line_total.sum():.2f}")`,
      },
    ],
    challenges: [
      {
        id: "m8l5c1",
        prompt: "Given df = pd.DataFrame({'x': [1, 2, 3, 4, 5]}), convert the 'x' column to a NumPy array, square every value, and print 'sum of squares: 55'.",
        hint: "df['x'].to_numpy() ** 2, then .sum()",
        validateFn: `return /sum\\s+of\\s+squares:\\s*55\\b/.test(output)`,
        solution: `import pandas as pd
import numpy as np
df = pd.DataFrame({"x": [1, 2, 3, 4, 5]})
arr = df["x"].to_numpy()
print(f"sum of squares: {(arr ** 2).sum()}")`,
      },
      {
        id: "m8l5c2",
        prompt: "Given df = pd.DataFrame({'price': [10, 20, 30], 'qty': [4, 5, 6]}), compute revenue = price * qty using a single NumPy operation on df[['price', 'qty']].to_numpy(), assign it back as a new column 'revenue', and print the DataFrame followed by 'total: 320' on a new line.",
        hint: "to_numpy() returns a 2D array; multiply column 0 by column 1; assign back",
        validateFn: `return output.includes("revenue") && /total:\\s*320\\b/.test(output)`,
        solution: `import pandas as pd
import numpy as np
df = pd.DataFrame({"price": [10, 20, 30], "qty": [4, 5, 6]})
arr = df[["price", "qty"]].to_numpy()
df["revenue"] = arr[:, 0] * arr[:, 1]
print(df)
print(f"total: {df['revenue'].sum()}")`,
      },
    ],
  },
];
