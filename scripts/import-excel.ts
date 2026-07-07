import "dotenv/config"
import { PrismaClient } from "../src/generated/prisma/client"
import { PrismaPg } from "@prisma/adapter-pg"
import * as XLSX from "xlsx"

const adapter = new PrismaPg(process.env.DATABASE_URL!)
const prisma = new PrismaClient({ adapter })

function parseJK(val: string): "L" | "P" {
  const v = val?.trim().toUpperCase()
  return v === "P" ? "P" : "L"
}

async function importSheet(
  rows: Record<string, string>[],
  sheetName: string,
  opts: {
    nipKey: string
    golRuangKey: string
    golongan: "PNS" | "PPPK"
    statusKey?: string
  }
) {
  let imported = 0
  let skipped = 0

  for (const row of rows) {
    const nip = String(row[opts.nipKey] ?? "").trim()
    if (!nip || nip.length < 5) {
      skipped++
      continue
    }

    const esel = String(row["ESELONISASI"] ?? "").trim() || undefined
    const unit = String(row["SUBBAGIAN/SEKSI"] ?? "").trim() || undefined

    const data = {
      nip,
      nama: String(row["NAMA"] ?? "").trim(),
      jabatan: String(row["JABATAN"] ?? "").trim(),
      golRuang: String(row[opts.golRuangKey] ?? "").trim(),
      golongan: opts.golongan,
      jenisKelamin: parseJK(String(row["L/P"] ?? "")),
      eselonisasi: esel,
      unitBagian: unit,
      tanggalMasuk: new Date(),
      status: "AKTIF" as const,
    }

    await prisma.pegawai.upsert({ where: { nip }, update: data, create: data })

    imported++
    console.log(`  [${sheetName}] ${nip} - ${data.nama}`)
  }

  return { imported, skipped }
}

function getRows(wb: XLSX.WorkBook, sheetName: string) {
  const sheet = wb.Sheets[sheetName]
  if (!sheet) return []
  return XLSX.utils.sheet_to_json(sheet, { defval: "" }) as Record<string, string>[]
}

async function main() {
  const filePath = process.argv[2]
  if (!filePath) {
    console.error("Usage: npx tsx scripts/import-excel.ts <path-to-xlsx>")
    process.exit(1)
  }

  const wb = XLSX.readFile(filePath)
  let total = 0

  // Struktural (NIP, ESELONISASI)
  const struktural = getRows(wb, "Struktural")
  if (struktural.length > 0) {
    console.log(`\n=== Sheet: Struktural (${struktural.length} rows) ===`)
    const r = await importSheet(struktural, "Struktural", {
      nipKey: "NIP",
      golRuangKey: "GOL. RUANG",
      golongan: "PNS",
    })
    total += r.imported
  }

  // PNS (NIP, unitBagian, jenisJabatan)
  const pns = getRows(wb, "PNS")
  if (pns.length > 0) {
    console.log(`\n=== Sheet: PNS (${pns.length} rows) ===`)
    const r = await importSheet(pns, "PNS", {
      nipKey: "NIP",
      golRuangKey: "GOL. RUANG",
      golongan: "PNS",
    })
    total += r.imported
  }

  // PPPK (NIPPPK, GOLONGAN berbeda)
  const pppk = getRows(wb, "PPPK")
  if (pppk.length > 0) {
    console.log(`\n=== Sheet: PPPK (${pppk.length} rows) ===`)
    const r = await importSheet(pppk, "PPPK", {
      nipKey: "NIPPPK",
      golRuangKey: "GOLONGAN",
      golongan: "PPPK",
    })
    total += r.imported
  }

  console.log(`\n=== Selesai! Total imported: ${total} ===`)
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
