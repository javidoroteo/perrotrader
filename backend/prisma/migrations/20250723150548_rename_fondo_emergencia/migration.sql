-- CreateTable
CREATE TABLE "quiz_sessions" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "expiresAt" DATETIME NOT NULL,
    "currentQuestionId" INTEGER,
    "isCompleted" BOOLEAN NOT NULL DEFAULT false,
    "totalScore" INTEGER NOT NULL DEFAULT 0,
    "experienceScore" INTEGER NOT NULL DEFAULT 0,
    "cryptoScore" INTEGER NOT NULL DEFAULT 0,
    "timeValue" INTEGER NOT NULL DEFAULT 0,
    "emergencyFund" INTEGER NOT NULL DEFAULT 0,
    "riskProfile" TEXT,
    "portfolioData" TEXT
);

-- CreateTable
CREATE TABLE "quiz_answers" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "sessionId" TEXT NOT NULL,
    "questionId" INTEGER NOT NULL,
    "answerIndex" INTEGER NOT NULL,
    "answerText" TEXT NOT NULL,
    "points" INTEGER NOT NULL DEFAULT 0,
    "conoPoints" INTEGER NOT NULL DEFAULT 0,
    "exPoints" INTEGER NOT NULL DEFAULT 0,
    "cryptoExposure" INTEGER NOT NULL DEFAULT 0,
    "timeValue" INTEGER NOT NULL DEFAULT 0,
    "emergencyFund" INTEGER NOT NULL DEFAULT 0,
    "esgValue" INTEGER NOT NULL DEFAULT 0,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "quiz_answers_sessionId_fkey" FOREIGN KEY ("sessionId") REFERENCES "quiz_sessions" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "quiz_stats" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "completedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "riskProfile" TEXT NOT NULL,
    "finalScore" INTEGER NOT NULL,
    "ageRange" TEXT,
    "patrimonyRange" TEXT,
    "monthlyIncome" TEXT
);
