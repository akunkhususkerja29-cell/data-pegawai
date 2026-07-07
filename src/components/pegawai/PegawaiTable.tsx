import Link from "next/link"
import { Table } from "../ui/Table"
import { TableRow, Td } from "../ui/TableRow"
import { StatusBadge } from "./StatusBadge"
import { EmptyState } from "./EmptyState"
import { DeleteButton } from "./DeleteButton"
import type { PegawaiData } from "@/types/pegawai"

interface PegawaiTableProps {
  data: PegawaiData[]
}

export function PegawaiTable({ data }: PegawaiTableProps) {
  if (data.length === 0) {
    return <EmptyState />
  }

  return (
    <Table
      headers={[
        "No",
        "NIP",
        "Nama",
        "Jabatan",
        "Golongan",
        "Unit/Bagian",
        "Status",
        "Aksi",
      ]}
    >
      {data.map((pegawai, index) => (
        <TableRow key={pegawai.id}>
          <Td className="text-gray-500">{index + 1}</Td>
          <Td className="font-mono text-gray-900">{pegawai.nip}</Td>
          <Td className="font-medium text-gray-900">{pegawai.nama}</Td>
          <Td>{pegawai.jabatan}</Td>
          <Td>
            <span className="rounded bg-gray-100 px-2 py-0.5 text-xs font-medium text-gray-600">
              {pegawai.golongan}
            </span>
          </Td>
          <Td className="max-w-[200px] truncate">{pegawai.unitBagian}</Td>
          <Td>
            <StatusBadge status={pegawai.status} />
          </Td>
          <Td>
            <div className="flex items-center gap-2">
              <Link
                href={`/edit/${pegawai.id}`}
                className="rounded px-2 py-1 text-xs font-medium text-blue-600 transition hover:bg-blue-50"
              >
                Edit
              </Link>
              <DeleteButton id={pegawai.id} nama={pegawai.nama} />
            </div>
          </Td>
        </TableRow>
      ))}
    </Table>
  )
}
