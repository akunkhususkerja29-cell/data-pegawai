/*
  Warnings:

  - You are about to drop the column `alamat` on the `pegawai` table. All the data in the column will be lost.
  - You are about to drop the column `email` on the `pegawai` table. All the data in the column will be lost.
  - You are about to drop the column `telepon` on the `pegawai` table. All the data in the column will be lost.
  - Added the required column `golRuang` to the `pegawai` table without a default value. This is not possible if the table is not empty.
  - Added the required column `jenis_kelamin` to the `pegawai` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "JenisKelamin" AS ENUM ('L', 'P');

-- AlterEnum
ALTER TYPE "Golongan" ADD VALUE 'CPNS';

-- AlterTable
ALTER TABLE "pegawai" DROP COLUMN "alamat",
DROP COLUMN "email",
DROP COLUMN "telepon",
ADD COLUMN     "eselonisasi" TEXT,
ADD COLUMN     "golRuang" TEXT NOT NULL,
ADD COLUMN     "jenis_kelamin" "JenisKelamin" NOT NULL,
ALTER COLUMN "unitBagian" DROP NOT NULL,
ALTER COLUMN "tanggal_masuk" SET DEFAULT CURRENT_TIMESTAMP;
