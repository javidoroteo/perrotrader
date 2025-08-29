-- CreateTable
CREATE TABLE "personality_tests" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "sessionId" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "completed" BOOLEAN NOT NULL DEFAULT false,
    "currentBlock" INTEGER NOT NULL DEFAULT 1,
    "planningScore" INTEGER NOT NULL DEFAULT 0,
    "analysisScore" INTEGER NOT NULL DEFAULT 0,
    "autonomyScore" INTEGER NOT NULL DEFAULT 0,
    "ambitionScore" INTEGER NOT NULL DEFAULT 0,
    "archetype" TEXT,
    "archetypeName" TEXT,
    "responses" TEXT,
    CONSTRAINT "personality_tests_sessionId_fkey" FOREIGN KEY ("sessionId") REFERENCES "quiz_sessions" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "personality_tests_sessionId_key" ON "personality_tests"("sessionId");
