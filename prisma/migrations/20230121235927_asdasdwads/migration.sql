/*
  Warnings:

  - You are about to drop the `Imovel` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Imovel";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "Imoveis" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "valor" INTEGER NOT NULL,
    "titulo" TEXT NOT NULL,
    "endereco" TEXT NOT NULL,
    "especif" TEXT NOT NULL,
    "tipo" TEXT NOT NULL,
    "informacoes" TEXT NOT NULL
);
