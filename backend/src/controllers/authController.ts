import bcrypt from "bcrypt";
import { Request, Response } from "express";
import StudentService from "@src/services/studentService";
import authenticate from "@src/utils/helpers/authenticate";
import { Student } from "@src/models/studentSchema";

export default class AuthController {
  private studentService: StudentService;

  constructor() {
    this.studentService = new StudentService();
  }

  public login = async (req: Request, res: Response) => {
    const { cpf, password } = req.body;
    const loginErrorMessage = "Usuário ou senha incorreto";

    try {
      const student = await this.studentService.getStudentByCpf(cpf);

      if (!student) return res.status(400).json({ error: loginErrorMessage });

      const isPasswordCorrect = await bcrypt.compare(password, student.senha);
      if (!isPasswordCorrect)
        return res.status(400).json({ error: loginErrorMessage });

      const model = {
        documentos: {
          cpf: cpf,
        },
        nome: student.nome,
        id: student._id,
      };

      const token = await authenticate(model);
      if (!token)
        return res.status(400).json({ error: "Erro ao obter token de acesso" });

      res.setHeader("Authorization", `Bearer ${token}`);

      return res.status(201).json({ model, token });
    } catch (e: any) {
      return res.status(500).json({ error: e.message });
    }
  };
}
