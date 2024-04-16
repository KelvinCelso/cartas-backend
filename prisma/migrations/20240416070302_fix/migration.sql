/*
  Warnings:

  - You are about to drop the column `Birth_date` on the `User` table. All the data in the column will be lost.
  - Added the required column `birth_date` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "Birth_date",
ADD COLUMN     "birth_date" TEXT NOT NULL;
