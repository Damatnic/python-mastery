import type { Lesson } from "../types";

// The absolute-beginner on-ramp. Assumes nothing: no prior coding, no idea what
// a variable is. Three short, hands-on lessons that get a first-timer running
// real code in the first minute. Keep everything tiny, warm, and concrete.

export const lessonsModuleStartHere: Lesson[] = [
  {
    module: "Start Here",
    moduleSlug: "start-here",
    lessonNumber: 1,
    slug: "how-this-works",
    title: "Your First Line of Code",
    badge: "concept",
    theory: `
Welcome. If you have never written a single line of code, you are in exactly the
right place. We start from zero.

Code is just instructions you write for the computer to follow. You type the
instructions, you press a button, and the computer does what you said. That is
the whole game.

The most basic instruction in Python is \`print\`. It means "show this on the
screen." You put what you want to show inside the parentheses and quotes.

\`\`\`python
print("hello")
\`\`\`

When you run that, the computer shows:

\`\`\`
hello
\`\`\`

That text it shows back is called the **output**. You write code, you run it,
you read the output. You will do that thousands of times.

💡 Key: the box where you type is the editor. The **Run** button (or Cmd+Enter)
makes your code go. The panel below it shows the output.

✨ Tip: the quotes matter. \`print("hello")\` shows the word hello. The quotes
tell Python "this is plain text, do not try to understand it, just show it."

You are about to run your first program. It is a small thing, but everyone who
writes code for a living started exactly here.
`,
    starterCode: `print("hello")
`,
    examples: [
      {
        title: "print shows text",
        explanation: "Whatever is inside the quotes gets shown on screen",
        code: `print("good morning")`,
      },
      {
        title: "you can print a number too",
        explanation: "Numbers do not need quotes",
        code: `print(7)`,
      },
    ],
    challenges: [
      {
        id: "sh1c1",
        prompt:
          "See the words 'your name here' in the editor below? Replace them with your actual name (keep the quotes), then press Run. The output should show your name.",
        hint: "Type your name between the quotes, like print(\"Sam\"), then click Run.",
        validateFn: `return output.trim().length > 0 && !output.toLowerCase().includes("your name here")`,
        solution: `print("Sam")`,
      },
      {
        id: "sh1c2",
        prompt:
          "Now make Python show a number. Print the number 42 (numbers do not need quotes). The output should contain 42.",
        hint: "print(42)",
        validateFn: `return output.includes("42")`,
        solution: `print(42)`,
      },
    ],
  },
  {
    module: "Start Here",
    moduleSlug: "start-here",
    lessonNumber: 2,
    slug: "variables-intro",
    title: "Variables Are Labeled Boxes",
    badge: "concept",
    theory: `
You just showed text and a number. Next you need a way to **remember** things.
That is what a variable is.

Picture a box with a label on it. You put a value in the box and write a name on
the label. Later, when you say the name, the computer hands you what is inside.

\`\`\`python
name = "Sam"
print(name)
\`\`\`

Read the \`=\` as "put this in the box." So \`name = "Sam"\` means "put the text
Sam in a box labeled name." Then \`print(name)\` shows what is in that box: Sam.

Notice \`print(name)\` has no quotes around name. That is on purpose. Quotes mean
plain text, so \`print("name")\` would show the word name. Without quotes, Python
goes and looks in the box.

\`\`\`python
score = 100
print(score)   # shows 100
print("score") # shows the word score
\`\`\`

💡 Key: \`=\` does not mean "equals" like in math. It means "store this value
under this name." You can change what is in the box later by storing something
new.

📝 Note: a name can be almost anything (\`age\`, \`total\`, \`first_name\`). Pick
names that say what is inside. Future you will thank you.
`,
    starterCode: `name = "Sam"
print(name)
`,
    examples: [
      {
        title: "store a value, then use it",
        explanation: "The name on the box gives you back what is inside",
        code: `color = "blue"
print(color)`,
      },
      {
        title: "change what is in the box",
        explanation: "Storing a new value replaces the old one",
        code: `count = 1
count = 5
print(count)`,
      },
    ],
    challenges: [
      {
        id: "sh2c1",
        prompt:
          "Make a variable called age that holds the number 10, then print it. The output should contain 10.",
        hint: "age = 10 on one line, then print(age) on the next.",
        validateFn: `return output.includes("10")`,
        solution: `age = 10
print(age)`,
      },
      {
        id: "sh2c2",
        prompt:
          "Store the number 100 in a variable called score, then print it. The output should contain 100.",
        hint: "score = 100, then print(score). No quotes on the number or the name.",
        validateFn: `return output.includes("100")`,
        solution: `score = 100
print(score)`,
      },
    ],
  },
  {
    module: "Start Here",
    moduleSlug: "start-here",
    lessonNumber: 3,
    slug: "how-to-learn-here",
    title: "How to Learn Here",
    badge: "concept",
    theory: `
You have written real code. Here is how to use this site so it actually sticks.

Each lesson has the same shape:

- **Theory** explains the idea in plain words (you are reading it now).
- **Examples** show it working. Read them, then change a number and run them to
  see what happens. Breaking things on purpose is how you learn.
- **Challenges** make you write it yourself. This is where the learning happens.
  Reading code feels easy and fools you. Writing it from memory is what builds
  the skill.

💡 Key: the site brings finished lessons back later for a quick review, spaced
out over days. That spacing is not busywork. It is the single most reliable way
known to move something from "I saw it once" to "I just know it."

When you get stuck, and you will, work it in this order:

1. Read the error message. It is not yelling at you, it is telling you what went
   wrong and on which line.
2. Re-read the prompt. Half of all stuck moments are a misread instruction.
3. Open the hint.
4. Ask the tutor (the dock at the bottom right). It will not hand you the answer,
   it asks the question that gets you unstuck.

⚠️ Warning: do not just reveal the solution and move on. You will feel like you
learned it. You did not. Struggle for a minute first. The struggle is the point.

✨ Tip: short and often beats long and rare. Fifteen minutes a day will take you
further than one big cram session a week.

That is everything. Do the next challenge, then head to Python Basics.
`,
    starterCode: `# Try it: store a goal and print it.
goal = "learn Python"
print(goal)
`,
    examples: [
      {
        title: "you already know enough to do this",
        explanation: "A variable holding text, then printed. Nothing new here.",
        code: `plan = "practice every day"
print(plan)`,
      },
    ],
    challenges: [
      {
        id: "sh3c1",
        prompt:
          "Last one. Store any short message in a variable called note, then print it. Anything works. The output just needs to show your message.",
        hint: "note = \"let's go\", then print(note).",
        validateFn: `return output.trim().length > 0 && !output.includes("# Try it")`,
        solution: `note = "let's go"
print(note)`,
      },
    ],
  },
];
