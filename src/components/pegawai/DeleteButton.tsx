"use client"

import { useRouter } from "next/navigation"
import { useState } from "react"
import { Button } from "../ui/Button"

interface DeleteButtonProps {
  id: string
  nama: string
}

export function DeleteButton({ id, nama }: DeleteButtonProps) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  async function handleDelete() {
    if (!confirm(`Yakin ingin menghapus data ${nama}?`)) return

    setIsLoading(true)
    try {
      const res = await fetch(`/api/pegawai/${id}`, { method: "DELETE" })
      if (!res.ok) throw new Error("Gagal menghapus")
      router.refresh()
    } catch {
      alert("Gagal menghapus data")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Button
      variant="danger"
      onClick={handleDelete}
      isLoading={isLoading}
      className="px-2 py-1 text-xs"
    >
      Hapus
    </Button>
  )
}
