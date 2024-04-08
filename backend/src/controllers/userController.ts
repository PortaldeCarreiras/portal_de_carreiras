import { Request, Response } from "express";
import hashPassword from "../helpers/hashPassword";
import { prismaClient } from "..";
import { Users } from "@prisma/client";
import {
  checkExistingUserByCPF,
  checkExistingUserByEmail,
} from "../services/usersService";
import { unmask } from "../helpers/stringHelper";

async function register(req: Request, res: Response) {
  const { name, email, cpf, password, isAdmin } = req.body;

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
        isAdmin,
      },
    });

    user.password = "";

    return res.customResponse.success(user);
  } catch (e) {
    return res.customResponse.error();
  }
}

async function getById(req: Request, res: Response) {
  const { id } = req.params;
  if (!id || isNaN(Number(id)))
    return res.customResponse.error("Id não informado");

  const idAsNumber = Number(id);
  try {
    const user = await prismaClient.users.findFirst({
      where: {
        id: idAsNumber,
      },
    });

    if (!user) return res.customResponse.notFound();

    const { password, ...usr } = user;

    return res.customResponse.success(usr);
  } catch (e) {
    return res.customResponse.error();
  }
}

async function getAll(req: Request, res: Response) {
  try {
    const users = await prismaClient.users.findMany();

    if (!users) return res.customResponse.notFound();

    const result = users.map((u: Users) => {
      const { password, ...data } = u;
      return data;
    });

    return res.customResponse.success(result);
  } catch (e) {
    return res.customResponse.error();
  }
}

async function update(req: Request, res: Response) {
  const body = req.body;
  const { id } = req.params;
  if (!id || isNaN(Number(id)))
    return res.customResponse.error("Id não informado");

  const idAsNumber = Number(id);
  try {
    const user = await prismaClient.users.findFirst({
      where: {
        id: idAsNumber,
      },
    });

    if (!user) return res.customResponse.notFound();

    if (body.email) {
      const checkExistingUserEmail =
        body.email !== user.email &&
        (await checkExistingUserByEmail(body.email));
      if (checkExistingUserEmail)
        return res.customResponse.error("User with this email already exists");
    }
    if (body.cpf) {
      const checkExistingUserCPF =
        body.cpf !== user.cpf && (await checkExistingUserByCPF(body.cpf));
      if (checkExistingUserCPF)
        return res.customResponse.error("User with this cpf already exists");
    }

    const data: Users = {
      name: body.name ?? user.name,
      email: body.email ?? user.email,
      cpf: body.cpf ? unmask(body.cpf) : user.cpf,
      isActive: body.isActive ?? body.isActive,
      isAdmin: body.isAdmin ?? body.isAdmin,
      created_at: user.created_at,
      password: body.senha ? await hashPassword(body.senha) : user.password,
      id: user.id,
    };

    const userUpdated = await prismaClient.users.update({
      where: {
        id: idAsNumber,
      },
      data: data,
    });

    const { password, ...usr } = userUpdated;

    return res.customResponse.success(usr);
  } catch (e) {
    return res.customResponse.error();
  }
}

async function patchPassword(req: Request, res: Response) {
  const { password } = req.body;
  const { id } = req.params;
  if (!id || isNaN(Number(id)))
    return res.customResponse.error("Id não informado");

  const idAsNumber = Number(id);
  try {
    const user = await prismaClient.users.findFirst({
      where: {
        id: idAsNumber,
      },
    });

    if (!user) return res.customResponse.notFound();

    user.password = await hashPassword(password);

    const userUpdated = await prismaClient.users.update({
      where: {
        id: idAsNumber,
      },
      data: user,
    });

    userUpdated.password = "";

    return res.customResponse.success(userUpdated);
  } catch (e) {
    return res.customResponse.error();
  }
}

async function patchStatus(req: Request, res: Response) {
  const { isActive } = req.body;
  const { id } = req.params;
  if (!id || isNaN(Number(id)))
    return res.customResponse.error("Id não informado");

  const idAsNumber = Number(id);
  try {
    const user = await prismaClient.users.findFirst({
      where: {
        id: idAsNumber,
      },
    });

    if (!user) return res.customResponse.notFound();

    user.isActive = isActive;

    const userUpdated = await prismaClient.users.update({
      where: {
        id: idAsNumber,
      },
      data: user,
    });

    const { password, ...usr } = userUpdated;

    return res.customResponse.success(usr);
  } catch (e) {
    return res.customResponse.error();
  }
}

async function deleteUser(req: Request, res: Response) {
  const { id } = req.params;
  if (!id || isNaN(Number(id)))
    return res.customResponse.error("Id não informado");

  const idAsNumber = Number(id);
  try {
    const user = await prismaClient.users.findFirst({
      where: {
        id: idAsNumber,
      },
    });

    if (!user) return res.customResponse.notFound();

    await prismaClient.users.delete({
      where: {
        id: idAsNumber,
      },
    });

    const { password, ...usr } = user;

    return res.customResponse.success(usr);
  } catch (e) {
    return res.customResponse.error();
  }
}

export {
  register,
  getById,
  getAll,
  update,
  patchPassword,
  patchStatus,
  deleteUser,
};
