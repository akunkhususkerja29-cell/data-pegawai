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
      tanggalMasuk: new Date(data.tanggalMasuk),
      status: data.status,
    },
  })
}
