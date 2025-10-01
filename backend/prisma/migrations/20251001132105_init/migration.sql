-- CreateTable
CREATE TABLE "quiz_sessions" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "currentQuestionId" INTEGER,
    "isCompleted" BOOLEAN NOT NULL DEFAULT false,
    "totalScore" INTEGER NOT NULL DEFAULT 0,
    "experienceScore" INTEGER NOT NULL DEFAULT 0,
    "cryptoScore" INTEGER NOT NULL DEFAULT 0,
    "timeValue" INTEGER NOT NULL DEFAULT 0,
    "emergencyFund" INTEGER NOT NULL DEFAULT 0,
    "esgValue" INTEGER NOT NULL DEFAULT 0,
    "pensionFund" INTEGER NOT NULL DEFAULT 0,
    "dividend" INTEGER NOT NULL DEFAULT 0,
    "age" INTEGER NOT NULL DEFAULT 0,
    "gold" INTEGER NOT NULL DEFAULT 0,
    "buyHouse" INTEGER NOT NULL DEFAULT 0,
    "childrenEducation" INTEGER NOT NULL DEFAULT 0,
    "wealthGrowth" INTEGER NOT NULL DEFAULT 0,
    "riskProfile" TEXT,
    "portfolioData" TEXT,
    "email" TEXT,

    CONSTRAINT "quiz_sessions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "quiz_answers" (
    "id" TEXT NOT NULL,
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
    "pensionFund" INTEGER NOT NULL DEFAULT 0,
    "dividend" INTEGER NOT NULL DEFAULT 0,
    "childrenEducation" INTEGER NOT NULL DEFAULT 0,
    "wealthGrowth" INTEGER NOT NULL DEFAULT 0,
    "buyHouse" INTEGER NOT NULL DEFAULT 0,
    "esgValue" INTEGER NOT NULL DEFAULT 0,
    "age" INTEGER NOT NULL DEFAULT 0,
    "gold" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "quiz_answers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "personality_tests" (
    "id" TEXT NOT NULL,
    "sessionId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "completed" BOOLEAN NOT NULL DEFAULT false,
    "currentBlock" INTEGER NOT NULL DEFAULT 1,
    "planningScore" INTEGER NOT NULL DEFAULT 0,
    "analysisScore" INTEGER NOT NULL DEFAULT 0,
    "autonomyScore" INTEGER NOT NULL DEFAULT 0,
    "ambitionScore" INTEGER NOT NULL DEFAULT 0,
    "archetype" TEXT,
    "archetypeName" TEXT,
    "responses" TEXT,

    CONSTRAINT "personality_tests_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "quiz_stats" (
    "id" TEXT NOT NULL,
    "completedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "riskProfile" TEXT NOT NULL,
    "finalScore" INTEGER NOT NULL,
    "ageRange" TEXT,
    "patrimonyRange" TEXT,
    "monthlyIncome" TEXT,

    CONSTRAINT "quiz_stats_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "personality_tests_sessionId_key" ON "personality_tests"("sessionId");

-- AddForeignKey
ALTER TABLE "quiz_answers" ADD CONSTRAINT "quiz_answers_sessionId_fkey" FOREIGN KEY ("sessionId") REFERENCES "quiz_sessions"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "personality_tests" ADD CONSTRAINT "personality_tests_sessionId_fkey" FOREIGN KEY ("sessionId") REFERENCES "quiz_sessions"("id") ON DELETE CASCADE ON UPDATE CASCADE;
