import type { Metadata } from "next";
import { ClickTracker } from "@/components/ClickTracker";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://damato-python.vercel.app"),
  title: "Python Mastery | Interactive Python Learning",
  description:
    "Master Python through interactive lessons. Write real code in your browser with instant feedback. Learn variables, pandas, data cleaning, APIs, and more.",
  keywords: [
    "Python",
    "learn Python",
    "interactive Python",
    "pandas tutorial",
    "Python tutorial",
    "coding bootcamp",
    "data science",
  ],
  authors: [{ name: "Nicholas D'Amato" }],
  openGraph: {
    title: "Python Mastery | Interactive Python Learning",
    description:
      "Master Python through interactive lessons with real code execution in your browser via Pyodide.",
    type: "website",
    url: "https://damato-python.vercel.app",
  },
  twitter: {
    card: "summary_large_image",
    title: "Python Mastery | Interactive Python Learning",
    description:
      "Master Python through interactive lessons with real code execution in your browser via Pyodide.",
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
        <ClickTracker />
        {children}
      </body>
    </html>
  );
}
