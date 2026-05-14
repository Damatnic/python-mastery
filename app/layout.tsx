import type { Metadata } from "next";
import { ClickTracker } from "@/components/ClickTracker";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://damato-python.vercel.app"),
  title: "Python Mastery | Interactive Python Learning",
  description:
    "Write real Python and pandas code in your browser. 51 interactive lessons covering variables, data cleaning, APIs, and game development. No install required.",
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
      "Write real Python and pandas code in your browser. 51 interactive lessons, instant feedback, no install required.",
    type: "website",
    url: "https://damato-python.vercel.app",
  },
  twitter: {
    card: "summary_large_image",
    title: "Python Mastery | Interactive Python Learning",
    description:
      "Write real Python and pandas code in your browser. 51 interactive lessons, instant feedback, no install required.",
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
