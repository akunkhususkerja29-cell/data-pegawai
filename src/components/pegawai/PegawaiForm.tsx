"use client"

import { useRouter } from "next/navigation"
import { useState } from "react"
import { Input } from "../ui/Input"
import { Select } from "../ui/Select"
import { Button } from "../ui/Button"
import { GOLONGAN_OPTIONS, STATUS_OPTIONS } from "@/constants/golongan"
import { UNIT_BAGIAN_OPTIONS } from "@/constants/unitBagian"
import type { PegawaiFormData } from "@/types/pegawai"

interface PegawaiFormProps {
  initialData?: PegawaiFormData
  pegawaiId?: string
}

const defaultForm: PegawaiFormData = {
  nip: "",
  nama: "",
  jabatan: "",
  golongan: "PNS",
  unitBagian: "",
  alamat: "",
  telepon: "",
  email: "",
  tanggalMasuk: "",
  status: "AKTIF",
}

export function PegawaiForm({ initialData, pegawaiId }: PegawaiFormProps) {
  const router = useRouter()
  const [form, setForm] = useState<PegawaiFormData>(initialData ?? defaultForm)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isLoading, setIsLoading] = useState(false)

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
    if (errors[name]) {
      setErrors((prev) => {
        const next = { ...prev }
        delete next[name]
        return next
      })
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setIsLoading(true)
    setErrors({})

    try {
      const method = pegawaiId ? "PUT" : "POST"
      const url = pegawaiId ? `/api/pegawai/${pegawaiId}` : "/api/pegawai"

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      })

      const result = await res.json()

      if (!res.ok) {
        if (result.errors) {
          const fieldErrors: Record<string, string> = {}
          for (const err of result.errors) {
            if (err.path?.[0]) {
              fieldErrors[err.path[0]] = err.message
            }
          }
          setErrors(fieldErrors)
        } else {
          alert(result.error || "Terjadi kesalahan")
        }
        return
      }

      router.push("/")
      router.refresh()
    } catch {
      alert("Gagal menyimpan data")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2">
        <Input
          label="NIP"
          name="nip"
          value={form.nip}
          onChange={handleChange}
          error={errors.nip}
          placeholder="Contoh: 199001012010011001"
        />
        <Input
          label="Nama Lengkap"
          name="nama"
          value={form.nama}
          onChange={handleChange}
          error={errors.nama}
          placeholder="Nama lengkap pegawai"
        />
        <Input
          label="Jabatan"
          name="jabatan"
          value={form.jabatan}
          onChange={handleChange}
          error={errors.jabatan}
          placeholder="Contoh: Kepala Subbagian TU"
        />
        <Select
          label="Golongan"
          name="golongan"
          value={form.golongan}
          onChange={handleChange}
          options={GOLONGAN_OPTIONS.map((o) => ({ value: o.value, label: o.label }))}
          error={errors.golongan}
        />
        <Select
          label="Unit/Bagian"
          name="unitBagian"
          value={form.unitBagian}
          onChange={handleChange}
          options={UNIT_BAGIAN_OPTIONS.map((u) => ({ value: u, label: u }))}
          placeholder="Pilih unit"
          error={errors.unitBagian}
        />
        <Input
          label="Tanggal Masuk (TMT)"
          name="tanggalMasuk"
          type="date"
          value={form.tanggalMasuk}
          onChange={handleChange}
          error={errors.tanggalMasuk}
        />
        <Select
          label="Status"
          name="status"
          value={form.status}
          onChange={handleChange}
          options={STATUS_OPTIONS.map((o) => ({ value: o.value, label: o.label }))}
          error={errors.status}
        />
        <Input
          label="Email"
          name="email"
          type="email"
          value={form.email}
          onChange={handleChange}
          error={errors.email}
          placeholder="pegawai@imigrasi.go.id"
        />
        <Input
          label="Telepon"
          name="telepon"
          value={form.telepon}
          onChange={handleChange}
          placeholder="Contoh: 0812-3456-7890"
        />
        <div className="md:col-span-2">
          <div className="flex flex-col gap-1">
            <label htmlFor="alamat" className="text-sm font-medium text-gray-700">
              Alamat
            </label>
            <textarea
              id="alamat"
              name="alamat"
              value={form.alamat}
              onChange={handleChange}
              rows={3}
              className="rounded-lg border border-gray-300 px-3 py-2 text-sm transition focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Alamat lengkap"
            />
          </div>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <Button type="submit" isLoading={isLoading}>
          {pegawaiId ? "Simpan Perubahan" : "Tambah Pegawai"}
        </Button>
        <Button
          type="button"
          variant="secondary"
          onClick={() => router.push("/")}
        >
          Batal
        </Button>
      </div>
    </form>
  )
}
