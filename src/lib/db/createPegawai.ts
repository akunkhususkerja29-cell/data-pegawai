import { prisma } from "../prisma"
import type { PegawaiInput } from "../schema/pegawaiSchema"

export async function createPegawai(data: PegawaiInput) {
  return prisma.pegawai.create({
    data: {
      nip: data.nip,
      nama: data.nama,
      jabatan: data.jabatan,
      golRuang: data.golRuang,
      golongan: data.golongan,
      jenisKelamin: data.jenisKelamin,
      eselonisasi: data.eselonisasi || null,
      unitBagian: data.unitBagian || null,
      tanggalMasuk: new Date(data.tanggalMasuk),
      status: data.status,
    },
  })
}
