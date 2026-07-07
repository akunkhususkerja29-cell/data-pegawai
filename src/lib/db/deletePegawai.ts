import { prisma } from "../prisma"

export async function deletePegawai(id: string) {
  return prisma.pegawai.delete({ where: { id } })
}
