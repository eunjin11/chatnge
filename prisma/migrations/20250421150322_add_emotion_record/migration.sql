-- CreateTable
CREATE TABLE "emotion_records" (
    "id" SERIAL NOT NULL,
    "userEmail" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "emotion" TEXT NOT NULL,
    "reason" TEXT,
    "feeling" TEXT,
    "detailedEmotions" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "aiSummary" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "emotion_records_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "emotion_records" ADD CONSTRAINT "emotion_records_userEmail_fkey" FOREIGN KEY ("userEmail") REFERENCES "users"("email") ON DELETE RESTRICT ON UPDATE CASCADE;
