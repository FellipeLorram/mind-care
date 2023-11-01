/*
  Warnings:

  - You are about to drop the column `Note` on the `appointments` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_appointments" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "patient_id" TEXT NOT NULL,
    "modality" TEXT,
    "duration" INTEGER,
    "communication_effectiveness" INTEGER,
    "engagement_level" INTEGER,
    "progress" INTEGER,
    "session_outcome" INTEGER,
    "treatment_adherence" INTEGER,
    "note" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "appointments_patient_id_fkey" FOREIGN KEY ("patient_id") REFERENCES "patients" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_appointments" ("communication_effectiveness", "createdAt", "duration", "engagement_level", "id", "modality", "patient_id", "progress", "session_outcome", "treatment_adherence", "updatedAt") SELECT "communication_effectiveness", "createdAt", "duration", "engagement_level", "id", "modality", "patient_id", "progress", "session_outcome", "treatment_adherence", "updatedAt" FROM "appointments";
DROP TABLE "appointments";
ALTER TABLE "new_appointments" RENAME TO "appointments";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
