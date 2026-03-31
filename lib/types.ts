export type BadgeType = "concept" | "practice" | "challenge";

export interface Example {
  title: string;
  explanation: string;
  code: string;
}

export interface Challenge {
  id: string;
  prompt: string;
  hint: string;
  validateFn: string;
  solution: string;
}

export interface Lesson {
  module: string;
  moduleSlug: string;
  lessonNumber: number;
  slug: string;
  title: string;
  badge: BadgeType;
  theory: string;
  starterCode: string;
  examples: Example[];
  challenges: Challenge[];
}

export interface Module {
  slug: string;
  title: string;
  description: string;
  lessons: Lesson[];
}

export const STARTER_DATA_CODE = `import pandas as pd
import json
import io

# Students dataset
students_csv = """name,grade,score,subject,age
Alice,A,95,Math,20
Bob,B,82,Science,21
Carol,A,91,Math,19
Dave,C,74,English,22
Eve,B,88,Science,20
Frank,A,96,Math,21
Grace,C,71,English,19
Hank,B,85,Science,22"""

students = pd.read_csv(io.StringIO(students_csv))

# Sales dataset
sales_csv = """product,category,price,quantity,date
Widget A,Electronics,29.99,150,2024-01-15
Widget B,Electronics,49.99,80,2024-01-16
Gadget X,Tools,12.50,200,2024-01-15
Gadget Y,Tools,19.99,120,2024-01-17
Item Alpha,Electronics,99.99,45,2024-01-18
Item Beta,Tools,7.50,300,2024-01-19"""

sales = pd.read_csv(io.StringIO(sales_csv))
`;
