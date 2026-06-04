import type { Metadata } from "next";
import "./globals.css";
import CommandPalette from "@/components/CommandPalette";

export const metadata: Metadata = {
  metadataBase: new URL("https://damato-python.vercel.app"),
  title: "python-mastery",
  description:
    "Personal Python and pandas practice. Lessons I built while learning, kept here so I can come back to them. Runs in the browser via Pyodide.",
  authors: [{ name: "Nicholas D'Amato" }],
  robots: { index: false, follow: false },
  openGraph: {
    title: "python-mastery",
    description: "Personal Python and pandas practice. Runs in the browser via Pyodide.",
    type: "website",
    url: "https://damato-python.vercel.app",
  },
  twitter: {
    card: "summary",
    title: "python-mastery",
    description: "Personal Python and pandas practice. Runs in the browser via Pyodide.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className="min-h-screen bg-background text-foreground antialiased font-sans">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[100] focus:rounded focus:border focus:border-accent focus:bg-background focus:px-3 focus:py-1.5 focus:font-mono focus:text-xs focus:text-accent"
        >
          skip to content
        </a>
        {children}
        <CommandPalette />
      </body>
    </html>
  );
}
