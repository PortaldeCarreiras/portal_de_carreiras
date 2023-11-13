import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function criarAluno() {
    const user = await prisma.alunos.create({
        data: {
            nome: 'João',
            sobrenome: 'Silva',
            email: 'joao@example.com',
            senha: 'senha',
            data_nascimento: new Date('1990-01-15'),
            cpf: 123456789
        },
    });
    console.log('Usuário criado:', user);
}

criarAluno()
    .catch((error) => {
        throw error;
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
