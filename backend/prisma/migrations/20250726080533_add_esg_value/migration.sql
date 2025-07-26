-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_quiz_sessions" (
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
    "esgValue" INTEGER NOT NULL DEFAULT 0,
    "riskProfile" TEXT,
    "portfolioData" TEXT
);
INSERT INTO "new_quiz_sessions" ("createdAt", "cryptoScore", "currentQuestionId", "emergencyFund", "experienceScore", "expiresAt", "id", "isCompleted", "portfolioData", "riskProfile", "timeValue", "totalScore", "updatedAt") SELECT "createdAt", "cryptoScore", "currentQuestionId", "emergencyFund", "experienceScore", "expiresAt", "id", "isCompleted", "portfolioData", "riskProfile", "timeValue", "totalScore", "updatedAt" FROM "quiz_sessions";
DROP TABLE "quiz_sessions";
ALTER TABLE "new_quiz_sessions" RENAME TO "quiz_sessions";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
