import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "西域文献史料汇集",
  description: "Inner Asian Historical Sources and Scholarship Database",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
