import express from 'express';
import { PrismaClient } from '@prisma/client';
import { realizarLogin } from './controllers/loginController';
import cadastrarUsuario from './controllers/userController';
import cadastrarPergunta from './controllers/perguntaController';
import cadastrarCategoriaPergunta from './controllers/categoriaPerguntaController';

const prisma = new PrismaClient();
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');

const port = 3001; // Escolha a porta que deseja usar
app.use(bodyParser.json());

// Configuração do cors
app.use(cors());

// Login
app.post('/login', async (req, res) => {
  const { cpf, senha } = req.body;

  const resultadoLogin = await realizarLogin(cpf, senha);

  if (resultadoLogin.sucesso) {
    res.json({ sucesso: true, usuario: resultadoLogin.usuario });

  } else {
    res.status(401).json({ sucesso: false, mensagem: resultadoLogin.mensagem });
  }
});

// Cadastro de usuário
app.post('/cadastro', async (req, res) => {
  const { cpf, senha, administrador } = req.body;

  try {
    const novoUsuario = await cadastrarUsuario(cpf, senha, administrador);
    res.status(201).json({ sucesso: true, usuario: novoUsuario });

  } catch (error) {
    res.status(500).json({ sucesso: false, mensagem: 'Erro ao cadastrar usuário.' });
  }
});

// Cadastro de categoria de pergunta
app.post('/cadastro-categoria-pergunta', async (req, res) => {
  const { descricao } = req.body;

  try {
    const novaCategoria = await cadastrarCategoriaPergunta(descricao);
    res.status(201).json({ sucesso: true, categoria: novaCategoria });

  } catch (error) {
    console.error('Erro ao cadastrar categoria de pergunta: Route', error);
    res.status(500).json({ sucesso: false, mensagem: 'Erro ao cadastrar categoria de pergunta: Route' });
  }
});

// Cadastro de pergunta
app.post('/cadastro-pergunta', async (req, res) => {
  const { pergunta, statusPergunta, id_categoria_pergunta } = req.body;

  try {
    // Verifica se a categoria da pergunta existe, senão, cria
    if (id_categoria_pergunta) {
      const categoriaExistente = await prisma.categoria_pergunta.findUnique({
        where: {
          id_categoria_pergunta,
        },
      });

      if (!categoriaExistente) {
        await cadastrarCategoriaPergunta('Categoria Padrão');
      }
    }

    const novaPergunta = await cadastrarPergunta(pergunta, statusPergunta, id_categoria_pergunta);
    res.status(201).json({ sucesso: true, pergunta: novaPergunta });

  } catch (error) {
    console.error('Erro ao cadastrar pergunta:', error);
    res.status(500).json({ sucesso: false, mensagem: 'Erro ao cadastrar pergunta.' });
  }
});

// Obter todas as perguntas de uma categoria
app.get('/perguntas-por-categoria/:id_categoria_pergunta', async (req, res) => {
  const { id_categoria_pergunta } = req.params;

  try {
    const perguntas = await prisma.pergunta.findMany({
      where: {
        id_categoria_pergunta: parseInt(id_categoria_pergunta),
      },
    });

    res.status(200).json({ sucesso: true, perguntas });
  } catch (error) {
    console.error('Erro ao obter perguntas por categoria:', error);
    res.status(500).json({ sucesso: false, mensagem: 'Erro ao obter perguntas por categoria.' });
  }
});

// Inicia o servidor
app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
