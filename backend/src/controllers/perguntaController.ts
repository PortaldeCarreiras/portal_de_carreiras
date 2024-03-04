import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const cadastrarPergunta = async (
    pergunta: string,
    statusPergunta: boolean,
    id_categoria_pergunta: number
) => {
    try {
        const novaPergunta = await prisma.pergunta.create({
            data: {
                pergunta,
                statusPergunta,
                id_categoria_pergunta,
            },
        });

        return novaPergunta;

    } catch (error) {
        console.error('Erro ao cadastrar pergunta:', error);
        throw new Error('Erro ao cadastrar pergunta.');
    }
};

export default cadastrarPergunta;
