import { Request, Response } from "express";
import { prismaClient } from "..";
import { Categories } from "@prisma/client";

async function register(req: Request, res: Response) {
  const { description } = req.body;

  try {
    const questionCategory = await prismaClient.categories.create({
      data: {
        description,
        created_at: new Date(),
      },
    });

    return res.customResponse.success(questionCategory);
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
    const questionCategory = await prismaClient.categories.findFirst({
      where: {
        id: idAsNumber,
      },
    });

    if (!questionCategory) return res.customResponse.notFound();

    return res.customResponse.success(questionCategory);
  } catch (e) {
    return res.customResponse.error();
  }
}

async function getAll(req: Request, res: Response) {
  try {
    const questionCategories = await prismaClient.categories.findMany();

    if (!questionCategories) return res.customResponse.notFound();

    return res.customResponse.success(questionCategories);
  } catch (e) {
    return res.customResponse.error();
  }
}

async function update(req: Request, res: Response) {
  const { description } = req.body;
  const { id } = req.params;
  if (!id || isNaN(Number(id)))
    return res.customResponse.error("ID não informado");

  const idAsNumber = Number(id);

  try {
    const questionCategory = await prismaClient.categories.findFirst({
      where: {
        id: idAsNumber,
      },
    });

    if (!questionCategory) return res.customResponse.notFound();

    const data: Categories = {
      id: idAsNumber,
      description,
      created_at: questionCategory.created_at,
    };

    const questionCategoryUpdated = await prismaClient.categories.update({
      where: {
        id: idAsNumber,
      },
      data: data,
    });

    return res.customResponse.success(questionCategoryUpdated);
  } catch (e) {
    return res.customResponse.error();
  }
}

async function deleteQuestionCategory(req: Request, res: Response) {
  const { id } = req.params;
  if (!id || isNaN(Number(id)))
    return res.customResponse.error("ID não informado");

  const idAsNumber = Number(id);

  try {
    const questionCategory = await prismaClient.categories.findFirst({
      where: {
        id: idAsNumber,
      },
    });

    if (!questionCategory) return res.customResponse.notFound();

    await prismaClient.categories.delete({
      where: {
        id: idAsNumber,
      },
    });

    return res.customResponse.success(questionCategory);
  } catch (e) {
    return res.customResponse.error();
  }
}

export { register, getById, getAll, update, deleteQuestionCategory };
