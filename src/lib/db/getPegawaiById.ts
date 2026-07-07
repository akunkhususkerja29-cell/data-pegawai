import { prisma } from "../prisma"

export async function getPegawaiById(id: string) {
  return prisma.pegawai.findUnique({ where: { id } })
}
