/*
  Warnings:

  - You are about to drop the column `birthDate` on the `patients` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_patients" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "address" TEXT,
    "age" INTEGER NOT NULL,
    "email" TEXT,
    "gender" TEXT,
    "observation" TEXT,
    "nationality" TEXT,
    "birth_date" DATETIME,
    "occupation" TEXT,
    "medical_history" TEXT,
    "medications" TEXT,
    "allergies" TEXT,
    "chronic_diseases" TEXT,
    "modality" TEXT,
    "appointment_from" TEXT,
    "appointment_to" TEXT,
    "appointment_day" TEXT,
    "user_id" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "patients_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_patients" ("address", "age", "allergies", "appointment_day", "appointment_from", "appointment_to", "chronic_diseases", "createdAt", "email", "gender", "id", "medical_history", "medications", "modality", "name", "nationality", "observation", "occupation", "updatedAt", "user_id") SELECT "address", "age", "allergies", "appointment_day", "appointment_from", "appointment_to", "chronic_diseases", "createdAt", "email", "gender", "id", "medical_history", "medications", "modality", "name", "nationality", "observation", "occupation", "updatedAt", "user_id" FROM "patients";
DROP TABLE "patients";
ALTER TABLE "new_patients" RENAME TO "patients";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
