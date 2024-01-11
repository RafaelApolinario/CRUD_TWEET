/*
  Warnings:

  - You are about to drop the column `tweetsId` on the `tweets` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "tweets" DROP CONSTRAINT "tweets_tweetsId_fkey";

-- AlterTable
ALTER TABLE "tweets" DROP COLUMN "tweetsId";

-- CreateTable
CREATE TABLE "replies" (
    "id" UUID NOT NULL,
    "content" VARCHAR(400) NOT NULL,
    "tweetsId" UUID,
    "usuariosId" UUID,
    "criado_em" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "atualizado_em" TIMESTAMP NOT NULL,

    CONSTRAINT "replies_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "replies" ADD CONSTRAINT "replies_tweetsId_fkey" FOREIGN KEY ("tweetsId") REFERENCES "tweets"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "replies" ADD CONSTRAINT "replies_usuariosId_fkey" FOREIGN KEY ("usuariosId") REFERENCES "usuarios"("id") ON DELETE SET NULL ON UPDATE CASCADE;
