import type { Metadata } from "next"
import { Manrope } from "next/font/google"
import "@level/ui/globals.css"

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "QA Case Assignment",
  description: "QA case assignment prototype",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${manrope.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  )
}
