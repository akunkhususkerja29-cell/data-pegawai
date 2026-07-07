import { PrismaClient } from "../src/generated/prisma/client"
import { PrismaPg } from "@prisma/adapter-pg"

const adapter = new PrismaPg(process.env.DATABASE_URL!)
const prisma = new PrismaClient({ adapter })

const pegawaiData = [
  {
    nip: "198503212010011001",
    nama: "Dr. Ahmad Syahputra, S.H., M.H.",
    jabatan: "Kepala Kantor",
    golongan: "PNS" as const,
    unitBagian: "Subbagian Tata Usaha",
    alamat: "Jl. Merdeka No. 123, Palembang",
    telepon: "0811-234-5678",
    email: "ahmad.syahputra@imigrasi.go.id",
    tanggalMasuk: new Date("2010-01-01"),
    status: "AKTIF" as const,
  },
  {
    nip: "199001012010011002",
    nama: "Siti Rahmawati, S.E.",
    jabatan: "Kepala Subbagian Tata Usaha",
    golongan: "PNS" as const,
    unitBagian: "Subbagian Tata Usaha",
    alamat: "Jl. Sudirman No. 45, Palembang",
    telepon: "0812-345-6789",
    email: "siti.rahmawati@imigrasi.go.id",
    tanggalMasuk: new Date("2010-06-15"),
    status: "AKTIF" as const,
  },
  {
    nip: "199205132014011001",
    nama: "Budi Santoso, A.Md.",
    jabatan: "Analis Keimigrasian",
    golongan: "PNS" as const,
    unitBagian: "Seksi Informasi dan Penindakan Keimigrasian",
    alamat: "Jl. Pahlawan No. 78, Palembang",
    telepon: "0813-456-7890",
    email: "budi.santoso@imigrasi.go.id",
    tanggalMasuk: new Date("2014-03-01"),
    status: "AKTIF" as const,
  },
  {
    nip: "199307212016011001",
    nama: "Dewi Sartika, S.Sos.",
    jabatan: "Pemeriksa Keimigrasian",
    golongan: "PNS" as const,
    unitBagian: "Seksi Lintas Batas dan Dokumen Perjalanan",
    alamat: "Jl. Veteran No. 12, Palembang",
    telepon: "0814-567-8901",
    email: "dewi.sartika@imigrasi.go.id",
    tanggalMasuk: new Date("2016-07-01"),
    status: "AKTIF" as const,
  },
  {
    nip: "199408152018011001",
    nama: "Rudi Hartono",
    jabatan: "Petugas Temeriksaan",
    golongan: "PPPK" as const,
    unitBagian: "Seksi Izin Tinggal dan Status Keimigrasian",
    alamat: "Jl. Rajawali No. 34, Palembang",
    telepon: "0815-678-9012",
    email: "rudi.hartono@imigrasi.go.id",
    tanggalMasuk: new Date("2018-09-01"),
    status: "AKTIF" as const,
  },
  {
    nip: "209012345678901234",
    nama: "Ani Fitriani",
    jabatan: "Staf Administrasi",
    golongan: "CPNS" as const,
    unitBagian: "Subbagian Tata Usaha",
    alamat: "Jl. Kamboja No. 56, Palembang",
    telepon: "0816-789-0123",
    email: "ani.fitriani@imigrasi.go.id",
    tanggalMasuk: new Date("2022-01-10"),
    status: "AKTIF" as const,
  },
  {
    nip: "198712142010011003",
    nama: "Hendra Gunawan, S.H.",
    jabatan: "Kepala Seksi Penindakan Keimigrasian",
    golongan: "PNS" as const,
    unitBagian: "Seksi Penindakan Keimigrasian",
    alamat: "Jl. Diponegoro No. 67, Palembang",
    telepon: "0817-890-1234",
    email: "hendra.gunawan@imigrasi.go.id",
    tanggalMasuk: new Date("2010-11-01"),
    status: "NONAKTIF" as const,
  },
]

async function main() {
  console.log("Seeding database...")

  for (const data of pegawaiData) {
    await prisma.pegawai.upsert({
      where: { nip: data.nip },
      update: data,
      create: data,
    })
  }

  console.log(`Seeded ${pegawaiData.length} pegawai`)
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
