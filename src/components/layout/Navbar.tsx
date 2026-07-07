import Link from "next/link"

export function Navbar() {
  return (
    <nav className="border-b border-gray-200 bg-white">
      <div className="mx-auto flex max-w-7xl items-center gap-6 px-4 py-2 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="text-sm font-medium text-gray-600 transition hover:text-blue-600"
        >
          Daftar Pegawai
        </Link>
        <Link
          href="/tambah"
          className="text-sm font-medium text-gray-600 transition hover:text-blue-600"
        >
          Tambah Pegawai
        </Link>
      </div>
    </nav>
  )
}
