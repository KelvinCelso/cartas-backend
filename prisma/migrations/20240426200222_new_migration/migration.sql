-- AlterTable
ALTER TABLE "message" ADD COLUMN     "roomId" TEXT;

-- CreateTable
CREATE TABLE "Room" (
    "id" TEXT NOT NULL,
    "clientId" TEXT NOT NULL,
    "consultorId" TEXT NOT NULL,
    "expiry" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Room_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Room_clientId_consultorId_key" ON "Room"("clientId", "consultorId");

-- AddForeignKey
ALTER TABLE "message" ADD CONSTRAINT "message_roomId_fkey" FOREIGN KEY ("roomId") REFERENCES "Room"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Room" ADD CONSTRAINT "Room_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Room" ADD CONSTRAINT "Room_consultorId_fkey" FOREIGN KEY ("consultorId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
