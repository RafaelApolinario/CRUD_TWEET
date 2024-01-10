-- AlterTable
ALTER TABLE "tweets" ADD COLUMN     "parent_tweet_id" UUID;

-- AddForeignKey
ALTER TABLE "tweets" ADD CONSTRAINT "tweets_parent_tweet_id_fkey" FOREIGN KEY ("parent_tweet_id") REFERENCES "tweets"("id") ON DELETE SET NULL ON UPDATE CASCADE;
