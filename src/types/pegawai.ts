export interface PegawaiData {
  id: string
  nip: string
  nama: string
  jabatan: string
  golongan: "PNS" | "CPNS" | "PPPK"
  unitBagian: string
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
  tanggalMasuk: string
  status: "AKTIF" | "NONAKTIF"
}
