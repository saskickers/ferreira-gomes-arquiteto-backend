/*
  Warnings:

  - Added the required column `createdAt` to the `Imoveis` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fotos` to the `Imoveis` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Imoveis" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "createdAt" TEXT NOT NULL,
    "fotos" TEXT NOT NULL,
    "valor" INTEGER NOT NULL,
    "titulo" TEXT NOT NULL,
    "endereco" TEXT NOT NULL,
    "especif" TEXT NOT NULL,
    "tipo" TEXT NOT NULL,
    "informacoes" TEXT NOT NULL
);
INSERT INTO "new_Imoveis" ("endereco", "especif", "id", "informacoes", "tipo", "titulo", "valor") SELECT "endereco", "especif", "id", "informacoes", "tipo", "titulo", "valor" FROM "Imoveis";
DROP TABLE "Imoveis";
ALTER TABLE "new_Imoveis" RENAME TO "Imoveis";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
