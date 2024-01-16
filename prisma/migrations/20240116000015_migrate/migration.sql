-- DropForeignKey
ALTER TABLE "likes" DROP CONSTRAINT "likes_tweet_id_fkey";

-- AlterTable
ALTER TABLE "likes" ALTER COLUMN "tweet_id" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "likes" ADD CONSTRAINT "likes_tweet_id_fkey" FOREIGN KEY ("tweet_id") REFERENCES "tweets"("id") ON DELETE SET NULL ON UPDATE CASCADE;
