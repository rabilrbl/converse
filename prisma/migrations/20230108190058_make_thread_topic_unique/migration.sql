/*
  Warnings:

  - A unique constraint covering the columns `[topic]` on the table `Thread` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Thread_topic_key" ON "Thread"("topic");
