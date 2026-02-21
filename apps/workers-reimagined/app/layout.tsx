import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "@level/ui/globals.css";
import { AppShell } from "./shell";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Workers Reimagined",
  description: "Level AI Workers Reimagined prototype",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${manrope.variable} font-sans antialiased`}>
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
