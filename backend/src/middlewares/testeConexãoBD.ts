import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function testDatabaseConnection() {
  try {
    const alunos = await prisma.login.findMany(); // Isso consulta todos os usuários na tabela 'Login'.
    console.log('Usuários encontrados:', alunos);
  } catch (error) {
    console.error('Erro na conexão com o banco de dados:', error);
  } finally {
    await prisma.$disconnect();
  }
}

testDatabaseConnection();
