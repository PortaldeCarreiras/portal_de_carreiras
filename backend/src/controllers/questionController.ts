import { Request, Response } from "express";
import { prismaClient } from "..";
import { Questions } from "@prisma/client";

async function register(req: Request, res: Response) {
  const { question } = req.body;
  const { categoryId } = req.params;
  if (!categoryId || isNaN(Number(categoryId)))
    return res.customResponse.error("Categoria não informada");

  const categoryIdAsNumber = Number(categoryId);
  try {
    const data = await prismaClient.questions.create({
      data: {
        question,
        isActive: true,
        id_category: categoryIdAsNumber,
        created_at: new Date(),
      },
    });

    return res.customResponse.success(data);
  } catch (e) {
    return res.customResponse.error();
  }
}

async function getById(req: Request, res: Response) {
  const { id } = req.params;
  if (!id || isNaN(Number(id)))
    return res.customResponse.error("ID não informado");

  const idAsNumber = Number(id);
  try {
    const question = await prismaClient.questions.findFirst({
      where: {
        id: idAsNumber,
      },
    });

    if (!question) return res.customResponse.notFound();

    return res.customResponse.success(question);
  } catch (e) {
    return res.customResponse.error();
  }
}

async function getByCategory(req: Request, res: Response) {
  const { categoryId } = req.params;
  if (!categoryId || isNaN(Number(categoryId)))
    return res.customResponse.error("Categoria não informada");

  const categoryIdAsNumber = Number(categoryId);
  try {
    const questions = await prismaClient.questions.findMany({
      where: {
        id_category: categoryIdAsNumber,
      },
    });

    if (!questions) return res.customResponse.notFound();

    return res.customResponse.success(questions);
  } catch (e) {
    return res.customResponse.error();
  }
}

async function getAll(req: Request, res: Response) {
  try {
    const questions = await prismaClient.questions.findMany();

    if (!questions) return res.customResponse.notFound();

    return res.customResponse.success(questions);
  } catch (e) {
    return res.customResponse.error();
  }
}

async function update(req: Request, res: Response) {
  const body = req.body;
  const { id } = req.params;
  if (!id || isNaN(Number(id)))
    return res.customResponse.error("ID não informado");

  const idAsNumber = Number(id);

  try {
    const question = await prismaClient.questions.findFirst({
      where: {
        id: idAsNumber,
      },
    });

    if (!question) return res.customResponse.notFound();

    const data: Questions = {
      id_category: body.id_category ?? question.id_category,
      question: body.question ?? question.question,
      isActive: body.isActive ?? question.isActive,
      id: idAsNumber,
      created_at: question.created_at,
    };

    const perguntaUpdated = await prismaClient.questions.update({
      where: {
        id: idAsNumber,
      },
      data: data,
    });

    return res.customResponse.success(perguntaUpdated);
  } catch (e) {
    return res.customResponse.error();
  }
}

async function patchStatus(req: Request, res: Response) {
  const { isActive } = req.body;
  const { id } = req.params;
  if (!id || isNaN(Number(id)))
    return res.customResponse.error("ID não informado");

  const idAsNumber = Number(id);

  try {
    const question = await prismaClient.questions.findFirst({
      where: {
        id: idAsNumber,
      },
    });

    if (!question) return res.customResponse.notFound();

    question.isActive = isActive;

    const questionUpdated = await prismaClient.questions.update({
      where: {
        id: idAsNumber,
      },
      data: question,
    });

    return res.customResponse.success(questionUpdated);
  } catch (e) {
    return res.customResponse.error();
  }
}

async function deleteQuestion(req: Request, res: Response) {
  const { id } = req.params;
  if (!id || isNaN(Number(id)))
    return res.customResponse.error("ID não informado");

  const idAsNumber = Number(id);

  try {
    const question = await prismaClient.questions.findFirst({
      where: {
        id: idAsNumber,
      },
    });

    if (!question) return res.customResponse.notFound();

    await prismaClient.questions.delete({
      where: {
        id: idAsNumber,
      },
    });

    return res.customResponse.success(question);
  } catch (e) {
    return res.customResponse.error();
  }
}

export {
  register,
  getById,
  getByCategory,
  getAll,
  update,
  patchStatus,
  deleteQuestion,
};
