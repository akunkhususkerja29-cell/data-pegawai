-- CreateEnum
CREATE TYPE "Golongan" AS ENUM ('PNS', 'PPPK', 'HONORER');

-- CreateEnum
CREATE TYPE "StatusPegawai" AS ENUM ('AKTIF', 'NONAKTIF');

-- CreateTable
CREATE TABLE "pegawai" (
    "id" TEXT NOT NULL,
    "nip" TEXT NOT NULL,
    "nama" TEXT NOT NULL,
    "jabatan" TEXT NOT NULL,
    "golongan" "Golongan" NOT NULL,
    "unitBagian" TEXT NOT NULL,
    "alamat" TEXT,
    "telepon" TEXT,
    "email" TEXT,
    "tanggal_masuk" TIMESTAMP(3) NOT NULL,
    "status" "StatusPegawai" NOT NULL DEFAULT 'AKTIF',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "pegawai_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "pegawai_nip_key" ON "pegawai"("nip");
