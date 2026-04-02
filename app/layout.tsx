import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
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
  authors: [{ name: "Python Mastery" }],
  openGraph: {
    title: "Python Mastery | Interactive Python Learning",
    description:
      "Master Python through interactive lessons with real code execution in your browser.",
    type: "website",
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
        {children}
      </body>
    </html>
  );
}
