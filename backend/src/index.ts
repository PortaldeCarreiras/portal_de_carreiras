import express from 'express';
import { PrismaClient } from '@prisma/client';
import { realizarLogin } from './controllers/loginController';
import cadastrarUsuario from './controllers/userController';

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

// Cadastro
app.post('/cadastro', async (req, res) => {
  const { cpf, senha, nome, administrador } = req.body;

  try {
    const novoUsuario = await cadastrarUsuario(cpf, senha, nome, administrador);
    res.status(201).json({ sucesso: true, usuario: novoUsuario });
  } catch (error) {
    res.status(500).json({ sucesso: false, mensagem: 'Erro ao cadastrar usuário.' });
  }
});

// Inicia o servidor
app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
