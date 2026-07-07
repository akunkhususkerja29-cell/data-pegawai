import { notFound } from "next/navigation"
import { getPegawaiById } from "@/lib/db/getPegawaiById"
import { PegawaiForm } from "@/components/pegawai/PegawaiForm"
import type { PegawaiFormData } from "@/types/pegawai"

interface PageProps {
  params: Promise<{ id: string }>
}

function formatDate(date: Date): string {
  return date.toISOString().split("T")[0]
}

export default async function EditPage({ params }: PageProps) {
  const { id } = await params
  const pegawai = await getPegawaiById(id)

  if (!pegawai) {
    notFound()
  }

  const initialData: PegawaiFormData = {
    nip: pegawai.nip,
    nama: pegawai.nama,
    jabatan: pegawai.jabatan,
    golRuang: pegawai.golRuang,
    golongan: pegawai.golongan,
    jenisKelamin: pegawai.jenisKelamin,
    eselonisasi: pegawai.eselonisasi ?? "",
    unitBagian: pegawai.unitBagian ?? "",
    tanggalMasuk: formatDate(pegawai.tanggalMasuk),
    status: pegawai.status,
  }

  return (
    <div className="mx-auto max-w-3xl">
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-900">
          Edit Data Pegawai
        </h2>
        <p className="mt-1 text-sm text-gray-500">
          Edit data pegawai: {pegawai.nama}
        </p>
      </div>
      <div className="rounded-xl border border-gray-200 bg-white p-6">
        <PegawaiForm initialData={initialData} pegawaiId={id} />
      </div>
    </div>
  )
}
