-- CreateTable
CREATE TABLE "Imovel" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "valor" INTEGER NOT NULL,
    "titulo" TEXT NOT NULL,
    "endereco" TEXT NOT NULL,
    "especif" TEXT NOT NULL,
    "tipo" TEXT NOT NULL,
    "informacoes" TEXT NOT NULL
);
