import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";

interface CustomResponse {
  unauthorized: (message?: string) => Response<any, Record<string, any>>;
  unprocessableEntity: (message?: string) => Response<any, Record<string, any>>;
  error: (message?: string) => Response<any, Record<string, any>>;
  success: (data?: any) => Response<any, Record<string, any>>;
  notFound: (message?: string) => Response<any, Record<string, any>>;
}

declare global {
  namespace Express {
    interface Response {
      customResponse: CustomResponse;
    }
  }
}

function createCustomResponse(res: Response): CustomResponse {
  return {
    unauthorized(message: string = "Usuário não autenticado") {
      return res.status(StatusCodes.UNAUTHORIZED).send({ error: message });
    },
    unprocessableEntity(message: string = "Dados inválidos") {
      return res
        .status(StatusCodes.UNPROCESSABLE_ENTITY)
        .send({ error: message });
    },
    error(message: string = "Não foi possível processar essa ação") {
      return res.status(StatusCodes.BAD_REQUEST).send({ error: message });
    },
    success(data: any) {
      return res.status(StatusCodes.OK).send({ data });
    },
    notFound(message: string = "Dado não encontrado") {
      return res.status(StatusCodes.NOT_FOUND).send({ error: message });
    },
  };
}

function customResponseMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  res.customResponse = createCustomResponse(res);
  next();
}

export { customResponseMiddleware };
