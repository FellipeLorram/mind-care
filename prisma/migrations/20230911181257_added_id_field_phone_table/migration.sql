/*
  Warnings:

  - The required column `id` was added to the `phones` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_phones" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "number" TEXT NOT NULL,
    "refers_to" TEXT NOT NULL,
    "patient_id" TEXT NOT NULL,
    CONSTRAINT "phones_patient_id_fkey" FOREIGN KEY ("patient_id") REFERENCES "patients" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_phones" ("number", "patient_id", "refers_to") SELECT "number", "patient_id", "refers_to" FROM "phones";
DROP TABLE "phones";
ALTER TABLE "new_phones" RENAME TO "phones";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
