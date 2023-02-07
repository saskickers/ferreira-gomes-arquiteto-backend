/*
  Warnings:

  - You are about to drop the column `endereco` on the `Imoveis` table. All the data in the column will be lost.
  - You are about to drop the column `especif` on the `Imoveis` table. All the data in the column will be lost.
  - You are about to drop the column `informacoes` on the `Imoveis` table. All the data in the column will be lost.
  - Added the required column `bairro` to the `Imoveis` table without a default value. This is not possible if the table is not empty.
  - Added the required column `condicao` to the `Imoveis` table without a default value. This is not possible if the table is not empty.
  - Added the required column `finalidade` to the `Imoveis` table without a default value. This is not possible if the table is not empty.
  - Added the required column `rua` to the `Imoveis` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Imoveis" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "createdAt" TEXT NOT NULL,
    "condicao" TEXT NOT NULL,
    "finalidade" TEXT NOT NULL,
    "tipo" TEXT NOT NULL,
    "bairro" TEXT NOT NULL,
    "rua" TEXT NOT NULL,
    "titulo" TEXT NOT NULL,
    "fotos" TEXT NOT NULL,
    "areaConstruida" TEXT,
    "areaTotal" TEXT,
    "caracteristicas" TEXT,
    "descricao" TEXT,
    "infoAdicionais" TEXT,
    "quartos" TEXT,
    "garagem" INTEGER,
    "salaEstar" INTEGER,
    "salaTv" INTEGER,
    "suite" INTEGER,
    "iptu" INTEGER,
    "condominio" TEXT,
    "valor" INTEGER
);
INSERT INTO "new_Imoveis" ("createdAt", "fotos", "id", "tipo", "titulo", "valor") SELECT "createdAt", "fotos", "id", "tipo", "titulo", "valor" FROM "Imoveis";
DROP TABLE "Imoveis";
ALTER TABLE "new_Imoveis" RENAME TO "Imoveis";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
