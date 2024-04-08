import bcrypt from "bcrypt";
import { Request, Response } from "express";
import { prismaClient } from "..";
import authenticate from "../helpers/authenticate";
import hashPassword from "../helpers/hashPassword";
import {
  checkExistingUserByCPF,
  checkExistingUserByEmail,
} from "../services/usersService";
import { unmask } from "../helpers/stringHelper";

async function login(req: Request, res: Response) {
  const { cpf, password } = req.body;
  const loginErrorMessage = "Usuário ou senha incorreto";

  try {
    const user = await prismaClient.users.findFirst({
      where: { cpf },
    });

    if (!user) return res.customResponse.error(loginErrorMessage);
    if (!user.isActive) return res.customResponse.error("Usuário desativado");

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) res.customResponse.error(loginErrorMessage);

    const token = await authenticate(user);
    if (!token)
      return res.customResponse.error("Erro ao obter token de acesso");

    res.setHeader("Authorization", `Bearer ${token}`);

    user.password = "";

    return res.customResponse.success({ user, token });
  } catch (e) {
    return res.customResponse.error();
  }
}

async function register(req: Request, res: Response) {
  const { name, email, cpf, password } = req.body;

  try {
    const checkExistingUserEmail = await checkExistingUserByEmail(email);
    if (checkExistingUserEmail)
      return res.customResponse.error("User with this email already exists");

    const checkExistingUserCPF = await checkExistingUserByCPF(cpf);
    if (checkExistingUserCPF)
      return res.customResponse.error("User with this cpf already exists");

    const passwordHashed = await hashPassword(password);

    const user = await prismaClient.users.create({
      data: {
        created_at: new Date(),
        name,
        email,
        cpf: unmask(cpf),
        password: passwordHashed,
        isActive: true,
        isAdmin: false,
      },
    });

    user.password = "";

    return res.customResponse.success(user);
  } catch (e) {
    console.log(e);
    return res.customResponse.error();
  }
}

export { login, register };
