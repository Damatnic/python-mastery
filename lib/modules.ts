import type { Module } from "./types";

export const MODULE_METADATA: Omit<Module, "lessons">[] = [
  {
    slug: "python-basics",
    title: "Python Basics",
    description:
      "Master the fundamentals: variables, data structures, loops, and functions. Build a solid foundation for everything that follows.",
  },
  {
    slug: "pandas-fundamentals",
    title: "Pandas Fundamentals",
    description:
      "Learn to work with DataFrames and Series. Select, filter, and transform data like a pro.",
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
      "Master string manipulation, regular expressions, file I/O, and JSON handling.",
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
    slug: "game-dev-pygame",
    title: "Game Dev with Pygame",
    description:
      "Build real games with Python. Learn the game loop, movement physics, sprites, collision detection, and complete a Brick Breakaway clone from scratch.",
  },
];
