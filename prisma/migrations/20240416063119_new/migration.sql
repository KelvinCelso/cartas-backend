/*
  Warnings:

  - Added the required column `Birth_date` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `LastName` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `firstName` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "UserType" AS ENUM ('CONSULTOR', 'CLIENT');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "Birth_date" TEXT NOT NULL,
ADD COLUMN     "LastName" TEXT NOT NULL,
ADD COLUMN     "bio" TEXT,
ADD COLUMN     "firstName" TEXT NOT NULL,
ADD COLUMN     "type" "UserType" NOT NULL DEFAULT 'CLIENT';
