import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

const cadastrarUsuario = async (
    cpf: string,
    senha: string,
    administrador: number
) => {
    try {
        // Gere um salt para a criptografia
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(senha, saltRounds);

        const novoUsuario = await prisma.login.create({
            data: {
                cpf,
                senhaHash: hashedPassword,
                ativo: true,
                administrador,
            },
        });

        return novoUsuario;

    } catch (error) {
        console.error('Erro ao cadastrar usuário:', error);
        throw error;
    }
};

export default cadastrarUsuario;
