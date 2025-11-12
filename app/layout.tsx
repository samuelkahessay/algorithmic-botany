import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Biological Modelling Visualizer - L-Systems",
  description: "Interactive L-system editor and visualizer for creating fractals, plants, and trees using Lindenmayer systems",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
