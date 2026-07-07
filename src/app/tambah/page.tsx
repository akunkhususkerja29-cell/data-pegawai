import { PegawaiForm } from "@/components/pegawai/PegawaiForm"

export default function TambahPage() {
  return (
    <div className="mx-auto max-w-3xl">
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-900">
          Tambah Pegawai Baru
        </h2>
        <p className="mt-1 text-sm text-gray-500">
          Isi form di bawah untuk menambahkan data pegawai baru
        </p>
      </div>
      <div className="rounded-xl border border-gray-200 bg-white p-6">
        <PegawaiForm />
      </div>
    </div>
  )
}
