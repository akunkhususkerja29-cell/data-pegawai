export interface PegawaiData {
  id: string
  nip: string
  nama: string
  jabatan: string
  golRuang: string
  golongan: "PNS" | "CPNS" | "PPPK" | "HONORER"
  jenisKelamin: "L" | "P"
  eselonisasi: string | null
  unitBagian: string | null
  tanggalMasuk: Date
  status: "AKTIF" | "NONAKTIF"
  createdAt: Date
  updatedAt: Date
}

export interface PegawaiFormData {
  nip: string
  nama: string
  jabatan: string
  golRuang: string
  golongan: "PNS" | "CPNS" | "PPPK" | "HONORER"
  jenisKelamin: "L" | "P"
  eselonisasi: string
  unitBagian: string
  tanggalMasuk: string
  status: "AKTIF" | "NONAKTIF"
}
