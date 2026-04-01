"use client";

import { useCallback, useRef, useEffect, useMemo } from "react";

interface CodeEditorProps {
  code: string;
  onChange: (value: string) => void;
  onRun: () => void;
  disabled?: boolean;
}

// Python syntax highlighting - escapes HTML first for safety
function highlightPythonCode(code: string): string {
  // Escape HTML first to prevent XSS
  let highlighted = code
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

  // Multi-line strings (triple quotes)
  highlighted = highlighted.replace(
    /("""[\s\S]*?"""|'''[\s\S]*?''')/g,
    '<span class="token-string">$1</span>'
  );

  // Single-line strings (double and single quoted)
  highlighted = highlighted.replace(
    /(["'])((?:\\.|(?!\1)[^\\])*?)\1/g,
    '<span class="token-string">$1$2$1</span>'
  );

  // Comments
  highlighted = highlighted.replace(
    /(#[^\n]*)/g,
    '<span class="token-comment">$1</span>'
  );

  // Keywords
  highlighted = highlighted.replace(
    /\b(import|from|as|def|class|return|if|else|elif|for|while|in|not|and|or|is|None|True|False|try|except|finally|with|lambda|yield|pass|break|continue|raise|assert|global|nonlocal|del|async|await)\b/g,
    '<span class="token-keyword">$1</span>'
  );

  // Built-in functions
  highlighted = highlighted.replace(
    /\b(print|len|range|str|int|float|list|dict|set|tuple|type|isinstance|sorted|enumerate|zip|map|filter|sum|min|max|abs|round|open|input|any|all|next|iter|format|repr|hash|id|dir|vars|locals|globals|hasattr|getattr|setattr|delattr|callable|super|object|bool|bytes|bytearray|memoryview|slice|property|staticmethod|classmethod)\b(?=\s*\()/g,
    '<span class="token-builtin">$1</span>'
  );

  // Methods after dot
  highlighted = highlighted.replace(
    /\.([a-zA-Z_][a-zA-Z0-9_]*)(?=\s*\()/g,
    '.<span class="token-method">$1</span>'
  );

  // Numbers
  highlighted = highlighted.replace(
    /\b(\d+\.?\d*(?:e[+-]?\d+)?)\b/gi,
    '<span class="token-number">$1</span>'
  );

  // Decorators
  highlighted = highlighted.replace(
    /(@[a-zA-Z_][a-zA-Z0-9_]*)/g,
    '<span class="token-decorator">$1</span>'
  );

  // Function definitions
  highlighted = highlighted.replace(
    /\b(def)\s+([a-zA-Z_][a-zA-Z0-9_]*)/g,
    '<span class="token-keyword">$1</span> <span class="token-function-def">$2</span>'
  );

  // Class definitions
  highlighted = highlighted.replace(
    /\b(class)\s+([a-zA-Z_][a-zA-Z0-9_]*)/g,
    '<span class="token-keyword">$1</span> <span class="token-class-def">$2</span>'
  );

  return highlighted;
}

export function CodeEditor({
  code,
  onChange,
  onRun,
  disabled = false,
}: CodeEditorProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const highlightRef = useRef<HTMLDivElement>(null);
  const lineNumbersRef = useRef<HTMLDivElement>(null);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
      if ((e.shiftKey || e.ctrlKey || e.metaKey) && e.key === "Enter") {
        e.preventDefault();
        onRun();
        return;
      }

      if (e.key === "Tab") {
        e.preventDefault();
        const target = e.target as HTMLTextAreaElement;
        const start = target.selectionStart;
        const end = target.selectionEnd;
        const value = target.value;

        if (e.shiftKey) {
          const lineStart = value.lastIndexOf("\n", start - 1) + 1;
          const lineContent = value.slice(lineStart, start);
          const spacesToRemove = lineContent.match(/^ {1,4}/)?.[0].length || 0;
          if (spacesToRemove > 0) {
            const newValue = value.substring(0, lineStart) + value.substring(lineStart + spacesToRemove);
            onChange(newValue);
            setTimeout(() => {
              target.selectionStart = target.selectionEnd = start - spacesToRemove;
            }, 0);
          }
        } else {
          const newValue = value.substring(0, start) + "    " + value.substring(end);
          onChange(newValue);
          setTimeout(() => {
            target.selectionStart = target.selectionEnd = start + 4;
          }, 0);
        }
      }

      const pairs: Record<string, string> = {
        "(": ")",
        "[": "]",
        "{": "}",
        '"': '"',
        "'": "'",
      };

      if (pairs[e.key]) {
        const target = e.target as HTMLTextAreaElement;
        const start = target.selectionStart;
        const end = target.selectionEnd;
        const value = target.value;

        if (start === end) {
          e.preventDefault();
          const closingChar = pairs[e.key];
          const newValue = value.substring(0, start) + e.key + closingChar + value.substring(end);
          onChange(newValue);
          setTimeout(() => {
            target.selectionStart = target.selectionEnd = start + 1;
          }, 0);
        }
      }

      if ([")", "]", "}", '"', "'"].includes(e.key)) {
        const target = e.target as HTMLTextAreaElement;
        const start = target.selectionStart;
        const value = target.value;
        if (value[start] === e.key) {
          e.preventDefault();
          target.selectionStart = target.selectionEnd = start + 1;
        }
      }

      if (e.key === "Enter" && !e.shiftKey && !e.ctrlKey && !e.metaKey) {
        const target = e.target as HTMLTextAreaElement;
        const start = target.selectionStart;
        const value = target.value;

        const lineStart = value.lastIndexOf("\n", start - 1) + 1;
        const lineContent = value.slice(lineStart, start);
        const currentIndent = lineContent.match(/^[ ]*/)?.[0] || "";

        const trimmedLine = lineContent.trimEnd();
        const needsExtraIndent = trimmedLine.endsWith(":");

        e.preventDefault();
        const newIndent = needsExtraIndent ? currentIndent + "    " : currentIndent;
        const newValue = value.substring(0, start) + "\n" + newIndent + value.substring(start);
        onChange(newValue);
        setTimeout(() => {
          target.selectionStart = target.selectionEnd = start + 1 + newIndent.length;
        }, 0);
      }
    },
    [onRun, onChange]
  );

  const syncScroll = useCallback(() => {
    const textarea = textareaRef.current;
    const highlight = highlightRef.current;
    const lineNumbers = lineNumbersRef.current;

    if (textarea) {
      if (highlight) {
        highlight.scrollTop = textarea.scrollTop;
        highlight.scrollLeft = textarea.scrollLeft;
      }
      if (lineNumbers) {
        lineNumbers.scrollTop = textarea.scrollTop;
      }
    }
  }, []);

  useEffect(() => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    textarea.addEventListener("scroll", syncScroll);
    return () => textarea.removeEventListener("scroll", syncScroll);
  }, [syncScroll]);

  const lineNumbers = useMemo(() => {
    const count = code.split("\n").length;
    return Array.from({ length: count }, (_, i) => i + 1);
  }, [code]);

  const highlightedCode = useMemo(() => highlightPythonCode(code), [code]);

  return (
    <div className="code-editor relative h-full rounded-lg overflow-hidden border border-border bg-[#1e1e1e]">
      <div className="flex h-full">
        <div
          ref={lineNumbersRef}
          className="line-numbers flex-shrink-0 py-4 px-2 text-right select-none overflow-hidden text-muted-foreground/60 text-sm font-mono border-r border-border/50 bg-[#1a1a1f]"
          style={{ width: "3.5rem" }}
        >
          {lineNumbers.map((num) => (
            <div key={num} className="leading-6 h-6">
              {num}
            </div>
          ))}
        </div>

        <div className="flex-1 relative overflow-hidden">
          <div
            ref={highlightRef}
            className="absolute inset-0 p-4 overflow-hidden pointer-events-none font-mono text-sm leading-6 whitespace-pre-wrap break-words"
            style={{ fontFamily: "var(--font-geist-mono), monospace", tabSize: 4 }}
            aria-hidden="true"
            dangerouslySetInnerHTML={{ __html: highlightedCode + "\n" }}
          />

          <textarea
            ref={textareaRef}
            value={code}
            onChange={(e) => onChange(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={disabled}
            spellCheck={false}
            autoCapitalize="off"
            autoCorrect="off"
            className="absolute inset-0 w-full h-full resize-none p-4 bg-transparent font-mono text-sm leading-6 outline-none disabled:opacity-50 caret-accent"
            style={{
              fontFamily: "var(--font-geist-mono), monospace",
              tabSize: 4,
              color: "transparent",
              caretColor: "var(--accent)",
            }}
          />
        </div>
      </div>

      {disabled && (
        <div className="absolute inset-0 bg-background/80 backdrop-blur-sm flex flex-col items-center justify-center z-10">
          <div className="relative mb-3">
            <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-accent/30 to-purple-500/30 flex items-center justify-center border border-accent/20">
              <span className="text-2xl">🐍</span>
            </div>
            <svg
              className="absolute inset-0 w-14 h-14 animate-spin"
              style={{ animationDuration: "2s" }}
              viewBox="0 0 56 56"
            >
              <circle
                cx="28"
                cy="28"
                r="24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeDasharray="100 50"
                strokeLinecap="round"
                className="text-accent"
              />
            </svg>
          </div>
          <span className="text-sm font-medium text-foreground">Loading Python</span>
          <span className="text-xs text-muted-foreground">Setting up pandas & numpy...</span>
        </div>
      )}
    </div>
  );
}
