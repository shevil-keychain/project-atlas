import type { Metadata } from "next"
import { Manrope } from "next/font/google"
import "@level/ui/globals.css"
import "streamdown/styles.css"
import "katex/dist/katex.min.css"

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "AI worker",
  description: "Prototype workspace for orchestrating AI workers",
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
