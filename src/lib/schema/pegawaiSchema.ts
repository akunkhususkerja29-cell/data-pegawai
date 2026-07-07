import { z } from "zod"

export const pegawaiSchema = z.object({
  nip: z
    .string()
    .min(1, "NIP harus diisi")
    .regex(/^\d+$/, "NIP hanya boleh berisi angka"),
  nama: z.string().min(1, "Nama harus diisi"),
  jabatan: z.string().min(1, "Jabatan harus diisi"),
  golongan: z.enum(["PNS", "PPPK", "HONORER"]),
  unitBagian: z.string().min(1, "Unit/Bagian harus diisi"),
  alamat: z.string().optional().default(""),
  telepon: z.string().optional().default(""),
  email: z.string().email("Format email tidak valid").optional().or(z.literal("")),
  tanggalMasuk: z.string().min(1, "Tanggal masuk harus diisi"),
  status: z.enum(["AKTIF", "NONAKTIF"]).default("AKTIF"),
})

export type PegawaiInput = z.infer<typeof pegawaiSchema>
