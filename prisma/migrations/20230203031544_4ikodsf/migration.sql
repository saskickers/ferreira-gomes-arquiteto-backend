/*
  Warnings:

  - You are about to alter the column `quartos` on the `Imoveis` table. The data in that column could be lost. The data in that column will be cast from `String` to `Int`.

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
    "quartos" INTEGER,
    "garagem" INTEGER,
    "salaEstar" INTEGER,
    "salaTv" INTEGER,
    "suite" INTEGER,
    "iptu" TEXT,
    "condominio" TEXT,
    "valor" INTEGER
);
INSERT INTO "new_Imoveis" ("areaConstruida", "areaTotal", "bairro", "caracteristicas", "condicao", "condominio", "createdAt", "descricao", "finalidade", "fotos", "garagem", "id", "infoAdicionais", "iptu", "quartos", "rua", "salaEstar", "salaTv", "suite", "tipo", "titulo", "valor") SELECT "areaConstruida", "areaTotal", "bairro", "caracteristicas", "condicao", "condominio", "createdAt", "descricao", "finalidade", "fotos", "garagem", "id", "infoAdicionais", "iptu", "quartos", "rua", "salaEstar", "salaTv", "suite", "tipo", "titulo", "valor" FROM "Imoveis";
DROP TABLE "Imoveis";
ALTER TABLE "new_Imoveis" RENAME TO "Imoveis";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
