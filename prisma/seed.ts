import "dotenv/config"
import { PrismaClient } from "../src/generated/prisma/client"
import { PrismaPg } from "@prisma/adapter-pg"

const adapter = new PrismaPg(process.env.DATABASE_URL!)
const prisma = new PrismaClient({ adapter })

const pegawaiData = [
  {
    nip: "197903272001121002",
    nama: "KHAIRIL MIRZA, S.H., M.H",
    jabatan: "KEPALA KANTOR",
    golRuang: "IV/a",
    golongan: "PNS" as const,
    jenisKelamin: "L" as const,
    eselonisasi: "III.a",
    tanggalMasuk: new Date("2001-12-01"),
    status: "AKTIF" as const,
  },
  {
    nip: "197605062003121002",
    nama: "MACHMUDI, S.E., M.H.",
    jabatan: "KEPALA SEKSI INTELIJEN DAN PENINDAKAN KEIMIGRASIAN",
    golRuang: "IV/a",
    golongan: "PNS" as const,
    jenisKelamin: "L" as const,
    eselonisasi: "IV.a",
    tanggalMasuk: new Date("2003-12-01"),
    status: "AKTIF" as const,
  },
  {
    nip: "198307062001121001",
    nama: "INDOLAS RAFFLESIA, S.H., M.H.",
    jabatan: "KEPALA SEKSI LALU LINTAS KEIMIGRASIAN",
    golRuang: "IV/a",
    golongan: "PNS" as const,
    jenisKelamin: "L" as const,
    eselonisasi: "IV.a",
    tanggalMasuk: new Date("2001-12-01"),
    status: "AKTIF" as const,
  },
  {
    nip: "197705242001121001",
    nama: "NOVIARMAN, A.Md., S.E., M.Si.",
    jabatan: "KEPALA SEKSI IZIN TINGGAL DAN STATUS KEIMIGRASIAN",
    golRuang: "IV/a",
    golongan: "PNS" as const,
    jenisKelamin: "L" as const,
    eselonisasi: "IV.a",
    tanggalMasuk: new Date("2001-12-01"),
    status: "AKTIF" as const,
  },
  {
    nip: "198007062005121001",
    nama: "AGUS SETIAWAN, S.Ag.",
    jabatan: "KEPALA SUBBAGIAN TATA USAHA",
    golRuang: "III/d",
    golongan: "PNS" as const,
    jenisKelamin: "L" as const,
    eselonisasi: "IV.a",
    tanggalMasuk: new Date("2005-12-01"),
    status: "AKTIF" as const,
  },
  {
    nip: "197208281998112001",
    nama: "HJ. NURMAWATI, S.E., M.Pd.",
    jabatan: "KEPALA SEKSI TEKNOLOGI INFORMASI DAN KOMUNIKASI KEIMIGRASIAN",
    golRuang: "III/d",
    golongan: "PNS" as const,
    jenisKelamin: "P" as const,
    eselonisasi: "IV.a",
    tanggalMasuk: new Date("1998-11-01"),
    status: "AKTIF" as const,
  },
  {
    nip: "198306062005122001",
    nama: "SURYA LESTARI, A.Md.",
    jabatan: "KEPALA SUBSEKSI IZIN TINGGAL KEIMIGRASIAN",
    golRuang: "III/c",
    golongan: "PNS" as const,
    jenisKelamin: "P" as const,
    eselonisasi: "IV.a",
    tanggalMasuk: new Date("2005-12-01"),
    status: "AKTIF" as const,
  },
  {
    nip: "198404202005122001",
    nama: "DEVI EKA SARI, S.H.",
    jabatan: "KEPALA SUBSEKSI STATUS KEIMIGRASIAN",
    golRuang: "III/c",
    golongan: "PNS" as const,
    jenisKelamin: "P" as const,
    eselonisasi: "IV.a",
    tanggalMasuk: new Date("2005-12-01"),
    status: "AKTIF" as const,
  },
  {
    nip: "198510212005121001",
    nama: "M. RIAN HIDAYAT, S.H.",
    jabatan: "KEPALA SUBSEKSI PEMERIKSAAN KEIMIGRASIAN",
    golRuang: "III/c",
    golongan: "PNS" as const,
    jenisKelamin: "L" as const,
    eselonisasi: "IV.a",
    tanggalMasuk: new Date("2005-12-01"),
    status: "AKTIF" as const,
  },
  {
    nip: "198709182006121001",
    nama: "WISNU WIMBO SATRIO, S.Sos.",
    jabatan: "KEPALA URUSAN KEPEGAWAIAN",
    golRuang: "III/c",
    golongan: "PNS" as const,
    jenisKelamin: "L" as const,
    eselonisasi: "V",
    tanggalMasuk: new Date("2006-12-01"),
    status: "AKTIF" as const,
  },
  {
    nip: "198611152006122001",
    nama: "ANI ELVINA, S.H.",
    jabatan: "KEPALA URUSAN KEUANGAN",
    golRuang: "III/c",
    golongan: "PNS" as const,
    jenisKelamin: "P" as const,
    eselonisasi: "V",
    tanggalMasuk: new Date("2006-12-01"),
    status: "AKTIF" as const,
  },
  {
    nip: "198707152006122001",
    nama: "MAYA SARI, S.E.",
    jabatan: "KEPALA URUSAN UMUM",
    golRuang: "III/c",
    golongan: "PNS" as const,
    jenisKelamin: "P" as const,
    eselonisasi: "V",
    tanggalMasuk: new Date("2006-12-01"),
    status: "AKTIF" as const,
  },
  {
    nip: "198303252006121001",
    nama: "T. ARIF FADILLAH, S.Kom.",
    jabatan: "KEPALA SUBSEKSI TEKNOLOGI INFORMASI KEIMIGRASIAN",
    golRuang: "III/b",
    golongan: "PNS" as const,
    jenisKelamin: "L" as const,
    eselonisasi: "V",
    tanggalMasuk: new Date("2006-12-01"),
    status: "AKTIF" as const,
  },
  {
    nip: "198510082006122001",
    nama: "ROHMAH, S.H.",
    jabatan: "KEPALA SUBSEKSI INTELIJEN KEIMIGRASIAN",
    golRuang: "III/b",
    golongan: "PNS" as const,
    jenisKelamin: "P" as const,
    eselonisasi: "V",
    tanggalMasuk: new Date("2006-12-01"),
    status: "AKTIF" as const,
  },
  {
    nip: "199104172010011001",
    nama: "DERRY FITRAH, S.H.",
    jabatan: "KEPALA SUBSEKSI PENINDAKAN KEIMIGRASIAN",
    golRuang: "III/b",
    golongan: "PNS" as const,
    jenisKelamin: "L" as const,
    eselonisasi: "V",
    tanggalMasuk: new Date("2010-01-01"),
    status: "AKTIF" as const,
  },
  {
    nip: "199009042010122001",
    nama: "LIA SEPTIANA, S.H.",
    jabatan: "KEPALA SUBSEKSI INFORMASI DAN KOMUNIKASI KEIMIGRASIAN",
    golRuang: "III/b",
    golongan: "PNS" as const,
    jenisKelamin: "P" as const,
    eselonisasi: "V",
    tanggalMasuk: new Date("2010-12-01"),
    status: "AKTIF" as const,
  },
  {
    nip: "199803092022011001",
    nama: "YENDY VICKY ARDIYANTO, S.Tr.Im.",
    jabatan: "KEPALA SUBSEKSI PELAYANAN DOKUMEN PERJALANAN",
    golRuang: "III/b",
    golongan: "PNS" as const,
    jenisKelamin: "L" as const,
    eselonisasi: "V",
    tanggalMasuk: new Date("2022-01-01"),
    status: "AKTIF" as const,
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
