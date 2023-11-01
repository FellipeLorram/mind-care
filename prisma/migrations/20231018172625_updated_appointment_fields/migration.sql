/*
  Warnings:

  - You are about to drop the column `appointment_day` on the `appointments` table. All the data in the column will be lost.
  - You are about to drop the column `appointment_from` on the `appointments` table. All the data in the column will be lost.
  - You are about to drop the column `appointment_to` on the `appointments` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_appointments" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "patient_id" TEXT NOT NULL,
    "appointment_time" DATETIME NOT NULL,
    "modality" TEXT,
    "duration" INTEGER,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "appointments_patient_id_fkey" FOREIGN KEY ("patient_id") REFERENCES "patients" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_appointments" ("appointment_time", "createdAt", "id", "modality", "patient_id", "updatedAt") SELECT "appointment_time", "createdAt", "id", "modality", "patient_id", "updatedAt" FROM "appointments";
DROP TABLE "appointments";
ALTER TABLE "new_appointments" RENAME TO "appointments";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
