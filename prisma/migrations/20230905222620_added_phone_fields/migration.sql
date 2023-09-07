/*
  Warnings:

  - Added the required column `refers_to` to the `phones` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_phones" (
    "number" TEXT NOT NULL,
    "refers_to" TEXT NOT NULL,
    "patient_id" TEXT NOT NULL,
    CONSTRAINT "phones_patient_id_fkey" FOREIGN KEY ("patient_id") REFERENCES "patients" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_phones" ("number", "patient_id") SELECT "number", "patient_id" FROM "phones";
DROP TABLE "phones";
ALTER TABLE "new_phones" RENAME TO "phones";
CREATE UNIQUE INDEX "phones_number_key" ON "phones"("number");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
