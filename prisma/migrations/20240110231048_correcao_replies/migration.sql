/*
  Warnings:

  - You are about to drop the column `parent_tweet_id` on the `tweets` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "tweets" DROP CONSTRAINT "tweets_parent_tweet_id_fkey";

-- AlterTable
ALTER TABLE "tweets" DROP COLUMN "parent_tweet_id",
ADD COLUMN     "tweetsId" UUID;

-- AddForeignKey
ALTER TABLE "tweets" ADD CONSTRAINT "tweets_tweetsId_fkey" FOREIGN KEY ("tweetsId") REFERENCES "tweets"("id") ON DELETE SET NULL ON UPDATE CASCADE;
