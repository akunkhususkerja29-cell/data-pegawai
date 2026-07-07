import "dotenv/config"
import { PrismaClient } from "../src/generated/prisma/client"
import { PrismaPg } from "@prisma/adapter-pg"

const adapter = new PrismaPg(process.env.DATABASE_URL!)
const prisma = new PrismaClient({ adapter })

async function main() {
  const total = await prisma.pegawai.count()
  console.log(`Current records: ${total}`)

  const result = await prisma.pegawai.deleteMany({})
  console.log(`Deleted: ${result.count}`)

  const remaining = await prisma.pegawai.count()
  console.log(`Remaining: ${remaining}`)
}

main().finally(() => prisma.$disconnect())
