/*
  Warnings:

  - You are about to drop the `usuarios` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE `usuarios`;

-- CreateTable
CREATE TABLE `tb_login` (
    `cpf` VARCHAR(191) NOT NULL,
    `senhaHash` VARCHAR(191) NOT NULL,
    `ativo` BOOLEAN NOT NULL,
    `administrador` INTEGER NOT NULL,

    PRIMARY KEY (`cpf`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tb_categoria_pergunta` (
    `id_categoria_pergunta` INTEGER NOT NULL AUTO_INCREMENT,
    `descricao` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id_categoria_pergunta`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tb_pergunta` (
    `ID_pergunta` INTEGER NOT NULL AUTO_INCREMENT,
    `pergunta` VARCHAR(191) NOT NULL,
    `statusPergunta` BOOLEAN NOT NULL,
    `id_categoria_pergunta` INTEGER NOT NULL,

    PRIMARY KEY (`ID_pergunta`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `tb_pergunta` ADD CONSTRAINT `tb_pergunta_id_categoria_pergunta_fkey` FOREIGN KEY (`id_categoria_pergunta`) REFERENCES `tb_categoria_pergunta`(`id_categoria_pergunta`) ON DELETE RESTRICT ON UPDATE CASCADE;
