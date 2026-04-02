"use client";

import { useMemo } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import type { Components } from "react-markdown";

interface TheoryContentProps {
  content: string;
}

// Parse special markers in theory content
function parseTheoryContent(content: string): {
  mainContent: string;
  keyConceptCards: Array<{ title: string; description: string }>;
  syntaxCards: Array<{ syntax: string; description: string }>;
  whyMatters: string | null;
} {
  let mainContent = content;
  const keyConceptCards: Array<{ title: string; description: string }> = [];
  const syntaxCards: Array<{ syntax: string; description: string }> = [];
  let whyMatters: string | null = null;

  // Extract KEY: markers for key concepts
  const keyConceptRegex = /KEY:\s*(.+?)\s*-\s*(.+?)(?=\n|$)/gi;
  let match;
  while ((match = keyConceptRegex.exec(content)) !== null) {
    keyConceptCards.push({ title: match[1].trim(), description: match[2].trim() });
  }
  mainContent = mainContent.replace(keyConceptRegex, "");

  // Extract WHY: markers for "why this matters"
  const whyRegex = /WHY:\s*(.+?)(?=\n\n|$)/gi;
  const whyMatch = whyRegex.exec(content);
  if (whyMatch) {
    whyMatters = whyMatch[1].trim();
    mainContent = mainContent.replace(whyRegex, "");
  }

  // Extract SYNTAX: markers for syntax cards
  const syntaxRegex = /SYNTAX:\s*`([^`]+)`\s*-\s*(.+?)(?=\n|$)/gi;
  while ((match = syntaxRegex.exec(content)) !== null) {
    syntaxCards.push({ syntax: match[1].trim(), description: match[2].trim() });
  }
  mainContent = mainContent.replace(syntaxRegex, "");

  return { mainContent: mainContent.trim(), keyConceptCards, syntaxCards, whyMatters };
}

// Extract key concepts from the content automatically
function extractKeyConceptsFromContent(content: string): Array<{ title: string; description: string }> {
  const concepts: Array<{ title: string; description: string }> = [];

  // Look for bold terms followed by explanations
  const boldPatternRegex = /\*\*([^*]+)\*\*[:\s]+([^.\n]+[.]?)/g;
  let match;
  while ((match = boldPatternRegex.exec(content)) !== null) {
    const title = match[1].trim();
    const desc = match[2].trim();
    // Only add if it looks like a concept (not too long, descriptive)
    if (title.length < 50 && desc.length > 10 && desc.length < 200) {
      concepts.push({ title, description: desc });
    }
  }

  return concepts.slice(0, 3); // Max 3 key concepts
}

// Extract syntax examples from code blocks
function extractSyntaxFromContent(content: string): Array<{ syntax: string; description: string }> {
  const syntaxItems: Array<{ syntax: string; description: string }> = [];

  // Look for inline code with comments
  const inlineCodeRegex = /`([^`]+)`\s*(?:#|\/\/)\s*([^\n]+)/g;
  let match;
  while ((match = inlineCodeRegex.exec(content)) !== null) {
    syntaxItems.push({ syntax: match[1].trim(), description: match[2].trim() });
  }

  return syntaxItems.slice(0, 4); // Max 4 syntax items
}

// Token types for syntax highlighting
type TokenType = "keyword" | "builtin" | "string" | "comment" | "number" | "method" | "plain";

interface Token {
  type: TokenType;
  value: string;
}

// Tokenize Python code without overlap issues
function tokenizePython(code: string): Token[] {
  const tokens: Token[] = [];
  let remaining = code;

  const KEYWORDS = new Set([
    "import", "from", "as", "def", "class", "return", "if", "else", "elif",
    "for", "while", "in", "not", "and", "or", "is", "None", "True", "False",
    "try", "except", "finally", "with", "lambda", "yield", "pass", "break",
    "continue", "raise", "assert", "global", "nonlocal", "del", "await", "async"
  ]);

  const BUILTINS = new Set([
    "print", "len", "range", "str", "int", "float", "list", "dict", "set",
    "tuple", "type", "isinstance", "sorted", "enumerate", "zip", "map",
    "filter", "sum", "min", "max", "abs", "round", "open", "input", "bool",
    "bytes", "bytearray", "callable", "chr", "ord", "hex", "bin", "oct",
    "repr", "hash", "id", "dir", "vars", "getattr", "setattr", "hasattr",
    "iter", "next", "reversed", "slice", "any", "all", "format"
  ]);

  while (remaining.length > 0) {
    let matched = false;

    // Match comments first (highest priority)
    const commentMatch = remaining.match(/^#.*/);
    if (commentMatch) {
      tokens.push({ type: "comment", value: commentMatch[0] });
      remaining = remaining.slice(commentMatch[0].length);
      matched = true;
      continue;
    }

    // Match triple-quoted strings
    const tripleDoubleMatch = remaining.match(/^"""[\s\S]*?"""/);
    if (tripleDoubleMatch) {
      tokens.push({ type: "string", value: tripleDoubleMatch[0] });
      remaining = remaining.slice(tripleDoubleMatch[0].length);
      matched = true;
      continue;
    }
    const tripleSingleMatch = remaining.match(/^'''[\s\S]*?'''/);
    if (tripleSingleMatch) {
      tokens.push({ type: "string", value: tripleSingleMatch[0] });
      remaining = remaining.slice(tripleSingleMatch[0].length);
      matched = true;
      continue;
    }

    // Match single/double quoted strings
    const stringMatch = remaining.match(/^(["'])((?:\\.|(?!\1)[^\\])*?)\1/);
    if (stringMatch) {
      tokens.push({ type: "string", value: stringMatch[0] });
      remaining = remaining.slice(stringMatch[0].length);
      matched = true;
      continue;
    }

    // Match numbers
    const numberMatch = remaining.match(/^\d+\.?\d*(?:[eE][+-]?\d+)?/);
    if (numberMatch) {
      tokens.push({ type: "number", value: numberMatch[0] });
      remaining = remaining.slice(numberMatch[0].length);
      matched = true;
      continue;
    }

    // Match method calls after dot
    const methodMatch = remaining.match(/^\.([a-zA-Z_][a-zA-Z0-9_]*)(?=\()/);
    if (methodMatch) {
      tokens.push({ type: "plain", value: "." });
      tokens.push({ type: "method", value: methodMatch[1] });
      remaining = remaining.slice(methodMatch[0].length);
      matched = true;
      continue;
    }

    // Match identifiers (keywords, builtins, or plain)
    const identMatch = remaining.match(/^[a-zA-Z_][a-zA-Z0-9_]*/);
    if (identMatch) {
      const word = identMatch[0];
      let type: TokenType = "plain";

      if (KEYWORDS.has(word)) {
        type = "keyword";
      } else if (BUILTINS.has(word)) {
        // Check if followed by opening paren for builtin
        const afterIdent = remaining.slice(word.length);
        if (afterIdent.match(/^\s*\(/)) {
          type = "builtin";
        }
      }

      tokens.push({ type, value: word });
      remaining = remaining.slice(word.length);
      matched = true;
      continue;
    }

    // Match any other single character
    if (!matched) {
      tokens.push({ type: "plain", value: remaining[0] });
      remaining = remaining.slice(1);
    }
  }

  return tokens;
}

// Escape HTML special characters
function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

// Custom code block component with syntax highlighting
function CodeBlock({ children, className }: { children: React.ReactNode; className?: string }) {
  const code = String(children).replace(/\n$/, "");
  const language = className?.replace(/language-/, "") || "python";

  const highlightedCode = useMemo(() => {
    if (language !== "python") return escapeHtml(code);

    const tokens = tokenizePython(code);
    return tokens.map(token => {
      const escaped = escapeHtml(token.value);
      if (token.type === "plain") return escaped;
      return `<span class="token-${token.type}">${escaped}</span>`;
    }).join("");
  }, [code, language]);

  return (
    <pre className="code-block">
      <code dangerouslySetInnerHTML={{ __html: highlightedCode }} />
    </pre>
  );
}

// Callout component for important information
function Callout({ type, title, children }: { type: "key" | "tip" | "warning" | "note"; title?: string; children: React.ReactNode }) {
  const config = {
    key: { icon: "💡", bg: "bg-amber-500/10", border: "border-amber-500/30", title: title || "Key Concept", titleColor: "text-amber-400" },
    tip: { icon: "✨", bg: "bg-accent/10", border: "border-accent/30", title: title || "Pro Tip", titleColor: "text-accent" },
    warning: { icon: "⚠️", bg: "bg-orange-500/10", border: "border-orange-500/30", title: title || "Watch Out", titleColor: "text-orange-400" },
    note: { icon: "📝", bg: "bg-blue-500/10", border: "border-blue-500/30", title: title || "Note", titleColor: "text-blue-400" },
  };

  const { icon, bg, border, title: defaultTitle, titleColor } = config[type];

  return (
    <div className={`callout ${bg} ${border} border rounded-lg p-4 my-4`}>
      <div className={`flex items-center gap-2 font-semibold ${titleColor} mb-2`}>
        <span>{icon}</span>
        <span>{defaultTitle}</span>
      </div>
      <div className="text-foreground/90 text-sm">{children}</div>
    </div>
  );
}

// Key Concept Card component
function KeyConceptCard({ title, description }: { title: string; description: string }) {
  return (
    <div className="key-concept-card flex items-start gap-3 p-4 rounded-lg bg-gradient-to-r from-amber-500/10 to-amber-500/5 border border-amber-500/20">
      <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-amber-500/20 flex items-center justify-center text-amber-400">
        💡
      </div>
      <div>
        <div className="font-semibold text-amber-400 text-sm">{title}</div>
        <div className="text-foreground/80 text-sm mt-1">{description}</div>
      </div>
    </div>
  );
}

// Syntax Reference Card component
function SyntaxReferenceCard({ items }: { items: Array<{ syntax: string; description: string }> }) {
  if (items.length === 0) return null;

  return (
    <div className="syntax-card rounded-lg border border-accent/20 bg-accent/5 overflow-hidden my-6">
      <div className="px-4 py-2 bg-accent/10 border-b border-accent/20 flex items-center gap-2">
        <span className="text-accent">📋</span>
        <span className="font-semibold text-accent text-sm">Quick Syntax Reference</span>
      </div>
      <div className="divide-y divide-border/50">
        {items.map((item, index) => (
          <div key={index} className="px-4 py-3 flex items-start gap-4">
            <code className="flex-shrink-0 px-2 py-1 rounded bg-card text-accent font-mono text-sm">
              {item.syntax}
            </code>
            <span className="text-muted-foreground text-sm pt-0.5">{item.description}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// Why This Matters component
function WhyThisMatters({ content }: { content: string }) {
  return (
    <div className="why-matters rounded-lg border border-success/20 bg-success/5 p-4 my-6">
      <div className="flex items-center gap-2 mb-2">
        <span className="text-success">🎯</span>
        <span className="font-semibold text-success text-sm">Why This Matters</span>
      </div>
      <p className="text-foreground/80 text-sm">{content}</p>
    </div>
  );
}

// Learning Objectives component
export function LearningObjectives({ objectives }: { objectives: string[] }) {
  return (
    <div className="learning-objectives rounded-lg border border-border bg-card/50 p-4 mb-6">
      <div className="flex items-center gap-2 mb-3">
        <span className="text-accent">🎯</span>
        <span className="font-semibold text-foreground text-sm">What You Will Learn</span>
      </div>
      <ul className="space-y-2">
        {objectives.map((objective, index) => (
          <li key={index} className="flex items-start gap-2 text-sm text-muted-foreground">
            <span className="text-accent mt-0.5">•</span>
            <span>{objective}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

// What You Learned summary component
export function WhatYouLearned({ points }: { points: string[] }) {
  return (
    <div className="what-learned rounded-lg border border-success/20 bg-success/5 p-4 mt-6">
      <div className="flex items-center gap-2 mb-3">
        <span className="text-success">✅</span>
        <span className="font-semibold text-success text-sm">What You Learned</span>
      </div>
      <ul className="space-y-2">
        {points.map((point, index) => (
          <li key={index} className="flex items-start gap-2 text-sm text-foreground/80">
            <span className="text-success mt-0.5">✓</span>
            <span>{point}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function TheoryContent({ content }: TheoryContentProps) {
  const { mainContent, keyConceptCards, syntaxCards, whyMatters } = useMemo(
    () => parseTheoryContent(content),
    [content]
  );

  // Auto-extract concepts if none were explicitly marked
  const autoKeyConcepts = useMemo(() => {
    if (keyConceptCards.length > 0) return [];
    return extractKeyConceptsFromContent(content);
  }, [content, keyConceptCards.length]);

  // Auto-extract syntax if none were explicitly marked
  const autoSyntax = useMemo(() => {
    if (syntaxCards.length > 0) return syntaxCards;
    return extractSyntaxFromContent(content);
  }, [content, syntaxCards]);

  // Generate learning objectives from headings
  const learningObjectives = useMemo(() => {
    const headings = content.match(/^##\s+(.+)$/gm) || [];
    return headings
      .map(h => h.replace(/^##\s+/, ""))
      .filter(h => !h.toLowerCase().includes("example") && h.length < 60)
      .slice(0, 4);
  }, [content]);

  // Custom components for ReactMarkdown
  const components: Components = {
    code: ({ children, className, ...props }) => {
      const isInline = !className;
      if (isInline) {
        return <code className="inline-code" {...props}>{children}</code>;
      }
      return <CodeBlock className={className}>{children}</CodeBlock>;
    },
    pre: ({ children }) => <>{children}</>,
    h2: ({ children }) => (
      <h2 className="theory-heading text-xl font-semibold text-foreground mt-8 mb-4 flex items-center gap-2">
        <span className="w-1 h-6 bg-accent rounded-full" />
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-lg font-medium text-foreground mt-6 mb-3">{children}</h3>
    ),
    p: ({ children }) => {
      // Check if paragraph starts with special markers
      const text = String(children);
      if (text.startsWith("💡 Key:") || text.startsWith("Key:")) {
        return (
          <Callout type="key">
            {text.replace(/^(💡 )?Key:\s*/i, "")}
          </Callout>
        );
      }
      if (text.startsWith("⚠️ Warning:") || text.startsWith("Warning:")) {
        return (
          <Callout type="warning">
            {text.replace(/^(⚠️ )?Warning:\s*/i, "")}
          </Callout>
        );
      }
      if (text.startsWith("✨ Tip:") || text.startsWith("Tip:")) {
        return (
          <Callout type="tip">
            {text.replace(/^(✨ )?Tip:\s*/i, "")}
          </Callout>
        );
      }
      return <p className="text-foreground/90 leading-relaxed mb-4">{children}</p>;
    },
    ul: ({ children }) => (
      <ul className="theory-list space-y-2 mb-4 ml-1">{children}</ul>
    ),
    ol: ({ children }) => (
      <ol className="theory-list-numbered space-y-2 mb-4 ml-1">{children}</ol>
    ),
    li: ({ children }) => (
      <li className="flex items-start gap-3 text-foreground/90">
        <span className="flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-xs bg-border text-muted-foreground">
          •
        </span>
        <span className="pt-0.5">{children}</span>
      </li>
    ),
    strong: ({ children }) => (
      <strong className="font-semibold text-foreground">{children}</strong>
    ),
    blockquote: ({ children }) => (
      <blockquote className="border-l-3 border-accent pl-4 py-2 my-4 bg-accent/5 rounded-r-lg">
        {children}
      </blockquote>
    ),
  };

  const allKeyConcepts = keyConceptCards.length > 0 ? keyConceptCards : autoKeyConcepts;

  return (
    <div className="theory-content">
      {/* Learning Objectives */}
      {learningObjectives.length > 0 && (
        <LearningObjectives objectives={learningObjectives} />
      )}

      {/* Why This Matters */}
      {whyMatters && <WhyThisMatters content={whyMatters} />}

      {/* Key Concept Cards */}
      {allKeyConcepts.length > 0 && (
        <div className="key-concepts-section mb-6 space-y-3">
          {allKeyConcepts.map((concept, index) => (
            <KeyConceptCard key={index} title={concept.title} description={concept.description} />
          ))}
        </div>
      )}

      {/* Main Content */}
      <div className="prose prose-invert max-w-none">
        <ReactMarkdown remarkPlugins={[remarkGfm]} components={components}>
          {mainContent}
        </ReactMarkdown>
      </div>

      {/* Syntax Reference Card */}
      {autoSyntax.length > 0 && <SyntaxReferenceCard items={autoSyntax} />}
    </div>
  );
}

export default TheoryContent;
