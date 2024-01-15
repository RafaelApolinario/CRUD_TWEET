-- AlterTable
ALTER TABLE "likes" ADD COLUMN     "replyId" UUID;

-- AddForeignKey
ALTER TABLE "likes" ADD CONSTRAINT "likes_replyId_fkey" FOREIGN KEY ("replyId") REFERENCES "replies"("id") ON DELETE SET NULL ON UPDATE CASCADE;
