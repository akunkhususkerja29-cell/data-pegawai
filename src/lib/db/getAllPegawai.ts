import { prisma } from "../prisma"

export async function getAllPegawai(search?: string) {
  const where = search
    ? {
        OR: [
          { nama: { contains: search, mode: "insensitive" as const } },
          { nip: { contains: search, mode: "insensitive" as const } },
          { golRuang: { contains: search, mode: "insensitive" as const } },
          { jabatan: { contains: search, mode: "insensitive" as const } },
        ],
      }
    : undefined

  return prisma.pegawai.findMany({
    where,
    orderBy: { createdAt: "desc" },
  })
}
