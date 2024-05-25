-- CreateEnum
CREATE TYPE "UserRoleOptions" AS ENUM ('ADMIN', 'USER');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "img_url" TEXT,
ADD COLUMN     "role" "UserRoleOptions" NOT NULL DEFAULT 'USER';
