import { NextFunction, Request, Response } from "express";
import Joi, { ObjectSchema } from "joi";
import { UnprocessableEntity } from "../helpers/httpResponses";
import { checkCPF } from "../helpers/stringHelper";

function jsonValidation(schema: ObjectSchema) {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.validateAsync(req.body);

      next();
    } catch (error: any) {
      const details = error.details;
      let errorMessage = "";
      if (details && details.length > 0) {
        details.forEach(
          (i: any) => (errorMessage += i.message.replaceAll(`"`, "") + ", ")
        );
      }
      return UnprocessableEntity(res, errorMessage);
    }
  };
}

function joiCPFValidator(value: string, helpers: any) {
  if (!checkCPF(value)) return helpers.error("any.invalid");
  return value;
}

const Schemas = {
  user: {
    create: Joi.object({
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      cpf: Joi.string().custom(joiCPFValidator, "CPF validator").required(),
      password: Joi.string().required(),
      isAdmin: Joi.boolean().required(),
    }),
    update: Joi.object({
      name: Joi.string().optional(),
      email: Joi.string().email().optional(),
      cpf: Joi.string().custom(joiCPFValidator, "CPF validator").optional(),
      password: Joi.string().optional(),
      isActive: Joi.boolean().optional(),
      isAdmin: Joi.boolean().optional(),
    }),
    updatePassword: Joi.object({
      password: Joi.string().required(),
    }),
    updateStatus: Joi.object({
      isActive: Joi.boolean().required(),
    }),
  },
  question: {
    create: Joi.object({
      question: Joi.string().required(),
    }),
    update: Joi.object({
      question: Joi.string().optional(),
      id_category: Joi.number().optional(),
      isActive: Joi.boolean().optional(),
    }),
    updateStatus: Joi.object({
      isActive: Joi.boolean().required(),
    }),
  },
  questionCategory: {
    create: Joi.object({
      description: Joi.string().required(),
    }),
    update: Joi.object({
      description: Joi.string().required(),
    }),
  },
  auth: {
    login: Joi.object({
      cpf: Joi.string().required(),
      password: Joi.string().required(),
    }),
    register: Joi.object({
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      cpf: Joi.string().custom(joiCPFValidator, "CPF validator").required(),
      password: Joi.string().required(),
    }),
  },
};

export { jsonValidation, Schemas };
