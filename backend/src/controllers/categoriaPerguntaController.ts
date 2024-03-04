import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const cadastrarCategoriaPergunta = async (descricao: string) => {
    try {
        const novaCategoria = await prisma.categoria_pergunta.create({
            data: {
                descricao,
            },
        });

        return novaCategoria;

    } catch (error) {
        console.error('Erro ao cadastrar categoria de pergunta: Controller', error);
        throw new Error('Erro ao cadastrar categoria de pergunta: Controller');
    }
};

export default cadastrarCategoriaPergunta;
