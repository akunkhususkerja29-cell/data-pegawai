import { prisma } from "../prisma"
import type { PegawaiInput } from "../schema/pegawaiSchema"

export async function createPegawai(data: PegawaiInput) {
  return prisma.pegawai.create({
    data: {
      nip: data.nip,
      nama: data.nama,
      jabatan: data.jabatan,
      golongan: data.golongan,
      unitBagian: data.unitBagian,
      alamat: data.alamat || null,
      telepon: data.telepon || null,
      email: data.email || null,
      tanggalMasuk: new Date(data.tanggalMasuk),
      status: data.status,
    },
  })
}
