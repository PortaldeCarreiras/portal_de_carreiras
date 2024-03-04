import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

export async function realizarLogin(cpf: string, senha: string) {
    try {
        // Verifica se o usuário existe no banco de dados através do CPF
        const usuario = await prisma.login.findUnique({
            where: { cpf },
        });

        if (!usuario) {
            return { sucesso: false, mensagem: 'Usuário não encontrado' };
        }

        // Verifica se o usuário está ativo
        if (!usuario.ativo) {
            return { sucesso: false, mensagem: 'Usuário desativado' };
        }

        // Verifica se a senha está correta
        const senhaCorreta = await bcrypt.compare(senha, usuario.senhaHash);

        if (!senhaCorreta) {
            return { sucesso: false, mensagem: 'Senha incorreta' };
        }

        // Retorna as informações do usuário
        const { cpf: usuarioCpf, administrador } = usuario;
        return { sucesso: true, usuario: { cpf: usuarioCpf, administrador } };

    } catch (erro) {
        console.error('Erro ao realizar login:', erro);
        return { sucesso: false, mensagem: 'Erro interno do servidor' };
    }
}
