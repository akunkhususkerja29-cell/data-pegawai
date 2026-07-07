import Link from "next/link"
import { Suspense } from "react"
import { getAllPegawai } from "@/lib/db/getAllPegawai"
import { PegawaiTable } from "@/components/pegawai/PegawaiTable"
import { SearchBar } from "@/components/pegawai/SearchBar"

interface PageProps {
  searchParams: Promise<{ q?: string }>
}

export default async function HomePage({ searchParams }: PageProps) {
  const { q } = await searchParams
  const data = await getAllPegawai(q)

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-xl font-semibold text-gray-900">
            Daftar Pegawai
          </h2>
          <p className="mt-1 text-sm text-gray-500">
            Total {data.length} pegawai
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Suspense>
            <SearchBar />
          </Suspense>
          <Link
            href="/tambah"
            className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-700"
          >
            <svg
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 4v16m8-8H4"
              />
            </svg>
            Tambah Pegawai
          </Link>
        </div>
      </div>

      <PegawaiTable data={data} />
    </div>
  )
}
