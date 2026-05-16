import type { Module } from "./types";

export const MODULE_METADATA: Omit<Module, "lessons">[] = [
  {
    slug: "python-basics",
    title: "Python Basics",
    description:
      "Variables, data structures, loops, and functions. The stuff you'll use in every script you ever write.",
  },
  {
    slug: "pandas-fundamentals",
    title: "Pandas Fundamentals",
    description:
      "DataFrames, Series, filtering, and sorting. How you actually work with tabular data in Python.",
  },
  {
    slug: "data-cleaning",
    title: "Data Cleaning",
    description:
      "Handle missing data, convert types, clean strings, and prepare messy real-world data for analysis.",
  },
  {
    slug: "grouping-combining",
    title: "Grouping & Combining",
    description:
      "Aggregate data with groupby, merge datasets, and reshape tables with pivot operations.",
  },
  {
    slug: "string-file-ops",
    title: "String & File Ops",
    description:
      "String methods, regular expressions, file I/O, and JSON handling.",
  },
  {
    slug: "web-apis",
    title: "Web & APIs",
    description:
      "Fetch data from APIs, parse JSON responses, and scrape web content with BeautifulSoup.",
  },
  {
    slug: "functions-apply",
    title: "Functions & Apply",
    description:
      "Write lambda functions, use apply and map, and master vectorized operations for performance.",
  },
  {
    slug: "numpy-foundations",
    title: "NumPy Foundations",
    description:
      "Arrays, dtypes, reshape, broadcasting, and vectorization. The math layer under pandas, plus how to drop down to it when you need speed.",
  },
  {
    slug: "game-dev-pygame",
    title: "Game Dev with Pygame",
    description:
      "Build real games with Python. Learn the game loop, movement physics, sprites, collision detection, and complete a Brick Breakaway clone from scratch.",
  },
  {
    slug: "data-manipulation-school",
    title: "Data Manipulation (WCTC)",
    description:
      "String cleaning, number formatting, date parsing, combining DataFrames, and pivot tables. Exactly what the WCTC Python Data Manipulation course covers.",
  },
  {
    slug: "oop-tooling",
    title: "OOP & Tooling",
    description:
      "Classes and objects, type hints and dataclasses, testing your code, and logging and debugging. The Python beyond scripts that real projects need.",
  },
];
