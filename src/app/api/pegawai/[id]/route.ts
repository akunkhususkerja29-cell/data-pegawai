import { NextResponse } from "next/server"
import { getPegawaiById } from "@/lib/db/getPegawaiById"
import { updatePegawai } from "@/lib/db/updatePegawai"
import { deletePegawai } from "@/lib/db/deletePegawai"
import { pegawaiSchema } from "@/lib/schema/pegawaiSchema"

interface RouteParams {
  params: Promise<{ id: string }>
}

export async function GET(_request: Request, { params }: RouteParams) {
  const { id } = await params
  const pegawai = await getPegawaiById(id)

  if (!pegawai) {
    return NextResponse.json(
      { error: "Data pegawai tidak ditemukan" },
      { status: 404 }
    )
  }

  return NextResponse.json(pegawai)
}

export async function PUT(request: Request, { params }: RouteParams) {
  const { id } = await params

  try {
    const body = await request.json()
    const parsed = pegawaiSchema.safeParse(body)

    if (!parsed.success) {
      return NextResponse.json(
        { errors: parsed.error.issues },
        { status: 400 }
      )
    }

    const pegawai = await updatePegawai(id, parsed.data)
    return NextResponse.json(pegawai)
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Terjadi kesalahan"
    return NextResponse.json({ error: message }, { status: 500 })
  }
}

export async function DELETE(_request: Request, { params }: RouteParams) {
  const { id } = await params

  try {
    await deletePegawai(id)
    return NextResponse.json({ message: "Berhasil dihapus" })
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Terjadi kesalahan"
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
