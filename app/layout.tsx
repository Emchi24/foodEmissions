import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Food Emissions Calculator',
  description: 'Created with v0Measure how many greenhouse gases your beef consumption causes each week',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
