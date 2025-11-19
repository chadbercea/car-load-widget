import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ 
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
})

export const metadata: Metadata = {
  title: "Negative Equity Payment Calculator",
  description: "Calculate monthly payments needed to eliminate negative equity on your vehicle loan",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={inter.variable} suppressHydrationWarning>
      <body className="font-sans" suppressHydrationWarning>{children}</body>
    </html>
  )
}

