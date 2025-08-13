-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_quiz_answers" (
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
    "pensionFund" INTEGER NOT NULL DEFAULT 0,
    "dividend" INTEGER NOT NULL DEFAULT 0,
    "esgValue" INTEGER NOT NULL DEFAULT 0,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "quiz_answers_sessionId_fkey" FOREIGN KEY ("sessionId") REFERENCES "quiz_sessions" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_quiz_answers" ("answerIndex", "answerText", "conoPoints", "createdAt", "cryptoExposure", "emergencyFund", "esgValue", "exPoints", "id", "points", "questionId", "sessionId", "timeValue") SELECT "answerIndex", "answerText", "conoPoints", "createdAt", "cryptoExposure", "emergencyFund", "esgValue", "exPoints", "id", "points", "questionId", "sessionId", "timeValue" FROM "quiz_answers";
DROP TABLE "quiz_answers";
ALTER TABLE "new_quiz_answers" RENAME TO "quiz_answers";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
