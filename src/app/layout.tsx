import type { Metadata } from "next"
import "./globals.css"
import { Header } from "@/components/layout/Header"
import { Navbar } from "@/components/layout/Navbar"

export const metadata: Metadata = {
  title: "Data Pegawai - Kantor Imigrasi Palembang",
  description: "Aplikasi manajemen data pegawai Kantor Imigrasi Palembang",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="id" className="h-full antialiased">
      <body className="flex min-h-full flex-col bg-gray-50">
        <Header />
        <Navbar />
        <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-6 sm:px-6 lg:px-8">
          {children}
        </main>
        <footer className="border-t border-gray-200 bg-white py-4 text-center text-xs text-gray-500">
          &copy; {new Date().getFullYear()} Kantor Imigrasi Palembang
        </footer>
      </body>
    </html>
  )
}
