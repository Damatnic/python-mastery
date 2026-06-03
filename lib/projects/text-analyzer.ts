import type { Project } from "../types";

// An open-ended "build it yourself" capstone. Unlike the guided projects, the
// starter code only loads the data and states the goal. You write the logic
// however you like; the check only looks at the result, not how you got there.
// This is the closest thing here to building from scratch.
const SAMPLE_TEXT = `python is fun and python is powerful and python is everywhere these days`;

export const textAnalyzerProject: Project = {
  slug: "text-analyzer",
  title: "Build It Yourself: Text Analyzer",
  description:
    "No guided steps with the answer pre-filled. You get a goal and the data, and you write the code your own way. That is a lot closer to how real programming works. Pure Python, no pandas.",
  difficulty: "beginner-intermediate",
  estimatedTime: "20 min",
  dataset: SAMPLE_TEXT,
  datasetName: "A sentence",
  datasetDescription: "One short line of text to analyze. The same skills scale to a whole book.",
  steps: [
    {
      id: "ta-step-1",
      title: "Count the words",
      description: `Your goal: print the total number of words in the text, in the form \`total words: N\`.

There is no starter solution. Think it through: how do you turn a sentence into a list of words, and how do you count a list? You have everything you need from Python Basics.

**Goal:** print exactly \`total words: 13\` (work out the 13 with code, do not just type it).`,
      starterCode: `text = "python is fun and python is powerful and python is everywhere these days"

# Your code here.
# Hint to get unstuck is below if you need it, but try first.
`,
      hints: [
        "text.split() turns the sentence into a list of words.",
        "len(...) counts how many items are in a list.",
        "print(f\"total words: {len(text.split())}\")",
      ],
      validateFn: `return output.includes("total words: 13")`,
    },
    {
      id: "ta-step-2",
      title: "Count the unique words",
      description: `Now print how many *different* words there are, in the form \`unique words: N\`. Repeats only count once.

**Goal:** print \`unique words: 8\`.`,
      starterCode: `text = "python is fun and python is powerful and python is everywhere these days"

# Your code here.
`,
      hints: [
        "A set automatically drops duplicates.",
        "set(text.split()) is the set of distinct words.",
        "print(f\"unique words: {len(set(text.split()))}\")",
      ],
      validateFn: `return output.includes("unique words: 8")`,
    },
    {
      id: "ta-step-3",
      title: "Find the most common word",
      description: `Finally, print the single most common word, in the form \`most common: WORD\`.

**Goal:** print \`most common: python\`. (Two words tie at three each; the one that appears first wins, which is how Counter breaks ties.)`,
      starterCode: `text = "python is fun and python is powerful and python is everywhere these days"

# Your code here.
`,
      hints: [
        "collections.Counter tallies a list for you.",
        "Counter(text.split()).most_common(1) returns [(word, count)].",
        "from collections import Counter; then grab [0][0] for the word.",
      ],
      validateFn: `return output.includes("most common: python")`,
    },
  ],
};
