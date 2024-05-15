-- CreateTable
CREATE TABLE "Upvoter" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "commentId" TEXT NOT NULL,

    CONSTRAINT "Upvoter_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Upvoter_userId_commentId_key" ON "Upvoter"("userId", "commentId");

-- AddForeignKey
ALTER TABLE "Upvoter" ADD CONSTRAINT "Upvoter_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Upvoter" ADD CONSTRAINT "Upvoter_commentId_fkey" FOREIGN KEY ("commentId") REFERENCES "Comment"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
