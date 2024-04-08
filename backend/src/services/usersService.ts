import { Users } from "@prisma/client";
import { prismaClient } from "..";

async function checkExistingUserByEmail(email: string) {
  const existingUserEmail = await prismaClient.users.findFirst({
    where: {
      email,
    },
  });

  return !!existingUserEmail;
}

async function checkExistingUserByCPF(cpf: string) {
  const existingUserCPF = await prismaClient.users.findFirst({
    where: {
      cpf,
    },
  });

  return !!existingUserCPF;
}

export { checkExistingUserByEmail, checkExistingUserByCPF };
