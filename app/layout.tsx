import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import Link from "next/link"
import { Coffee } from "lucide-react"
import type React from "react"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Coffee Rater",
  description: "Rate your favorite coffees",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="flex flex-col min-h-screen">
          <header className="border-b">
            <nav className="container mx-auto flex items-center h-14 px-4">
              <Link href="/" className="flex items-center gap-2 font-semibold">
                <Coffee className="h-5 w-5" />
                Coffee Rater
              </Link>
              <div className="ml-8 space-x-6">
                <Link href="/" className="text-sm hover:text-primary">
                  Dashboard
                </Link>
                <Link href="/rate" className="text-sm hover:text-primary">
                  Rate
                </Link>
              </div>
            </nav>
          </header>
          <main className="flex-grow container mx-auto py-8 px-4">{children}</main>
        </div>
      </body>
    </html>
  )
}

