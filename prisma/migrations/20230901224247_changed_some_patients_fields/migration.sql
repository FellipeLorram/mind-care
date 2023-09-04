/*
  Warnings:

  - You are about to drop the column `appointment_time` on the `patients` table. All the data in the column will be lost.

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
    "birthDate" DATETIME,
    "modality" TEXT NOT NULL,
    "appointment_from" TEXT NOT NULL,
    "appointment_to" TEXT NOT NULL,
    "appointment_day" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "patients_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_patients" ("address", "age", "appointment_day", "appointment_from", "appointment_to", "birthDate", "createdAt", "email", "gender", "id", "modality", "name", "nationality", "observation", "updatedAt", "user_id") SELECT "address", "age", "appointment_day", "appointment_from", "appointment_to", "birthDate", "createdAt", "email", "gender", "id", "modality", "name", "nationality", "observation", "updatedAt", "user_id" FROM "patients";
DROP TABLE "patients";
ALTER TABLE "new_patients" RENAME TO "patients";
CREATE UNIQUE INDEX "patients_email_key" ON "patients"("email");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
