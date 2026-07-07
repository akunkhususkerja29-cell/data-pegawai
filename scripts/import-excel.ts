import "dotenv/config"
import { PrismaClient } from "../src/generated/prisma/client"
import { PrismaPg } from "@prisma/adapter-pg"
import * as XLSX from "xlsx"

const adapter = new PrismaPg(process.env.DATABASE_URL!)
const prisma = new PrismaClient({ adapter })

const STATUS_MAP: Record<string, "PNS" | "CPNS" | "PPPK" | "HONORER"> = {
  PNS: "PNS",
  CPNS: "CPNS",
  PPPK: "PPPK",
  HONORER: "HONORER",
}

const JK_MAP: Record<string, "L" | "P"> = {
  L: "L",
  P: "P",
}

async function main() {
  const filePath = process.argv[2]
  if (!filePath) {
    console.error("Usage: npx tsx scripts/import-excel.ts <path-to-xlsx>")
    process.exit(1)
  }

  const wb = XLSX.readFile(filePath)
  const sheet = wb.Sheets[wb.SheetNames[0]]
  const rows = XLSX.utils.sheet_to_json(sheet, { defval: "" }) as Record<string, string>[]

  console.log(`Found ${rows.length} rows in Excel`)

  let imported = 0
  let skipped = 0

  for (const row of rows) {
    const nip = String(row["NIP"]).trim()
    if (!nip || nip.length < 5) {
      skipped++
      continue
    }

    const golongan = STATUS_MAP[row["STATUS"]?.trim().toUpperCase()] || "PNS"
    const jenisKelamin = JK_MAP[row["L/P"]?.trim().toUpperCase()] || "L"

    await prisma.pegawai.upsert({
      where: { nip },
      update: {
        nama: String(row["NAMA"] ?? "").trim(),
        jabatan: String(row["JABATAN"] ?? "").trim(),
        golRuang: String(row["GOL. RUANG"] ?? "").trim(),
        golongan,
        jenisKelamin,
        eselonisasi: String(row["ESELONISASI"] ?? "").trim() || null,
      },
      create: {
        nip,
        nama: String(row["NAMA"] ?? "").trim(),
        jabatan: String(row["JABATAN"] ?? "").trim(),
        golRuang: String(row["GOL. RUANG"] ?? "").trim(),
        golongan,
        jenisKelamin,
        eselonisasi: String(row["ESELONISASI"] ?? "").trim() || null,
        tanggalMasuk: new Date(),
      },
    })

    imported++
    console.log(`  [${imported}] ${nip} - ${row["NAMA"]}`)
  }

  console.log(`\nDone! Imported: ${imported}, Skipped: ${skipped}`)
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
