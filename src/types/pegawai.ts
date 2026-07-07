export interface PegawaiData {
  id: string
  nip: string
  nama: string
  jabatan: string
  golongan: "PNS" | "CPNS" | "PPPK"
  unitBagian: string
  alamat: string | null
  telepon: string | null
  email: string | null
  tanggalMasuk: Date
  status: "AKTIF" | "NONAKTIF"
  createdAt: Date
  updatedAt: Date
}

export interface PegawaiFormData {
  nip: string
  nama: string
  jabatan: string
  golongan: "PNS" | "CPNS" | "PPPK"
  unitBagian: string
  alamat: string
  telepon: string
  email: string
  tanggalMasuk: string
  status: "AKTIF" | "NONAKTIF"
}
