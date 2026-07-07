import { NextResponse } from "next/server"
import { getAllPegawai } from "@/lib/db/getAllPegawai"
import { createPegawai } from "@/lib/db/createPegawai"
import { pegawaiSchema } from "@/lib/schema/pegawaiSchema"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const q = searchParams.get("q") ?? undefined
  const data = await getAllPegawai(q)
  return NextResponse.json(data)
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const parsed = pegawaiSchema.safeParse(body)

    if (!parsed.success) {
      return NextResponse.json(
        { errors: parsed.error.issues },
        { status: 400 }
      )
    }

    const pegawai = await createPegawai(parsed.data)
    return NextResponse.json(pegawai, { status: 201 })
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Terjadi kesalahan"
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
