import { prisma } from "../prisma"
import type { PegawaiInput } from "../schema/pegawaiSchema"

export async function updatePegawai(id: string, data: PegawaiInput) {
  return prisma.pegawai.update({
    where: { id },
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
