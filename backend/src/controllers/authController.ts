import bcrypt from "bcrypt";
import { Request, Response } from "express";
import StudentService from "@src/services/studentService";
import AdminService from "@src/services/adminService"; // Novo serviço para administradores
import authenticate from "@src/utils/helpers/authenticate";

export default class AuthController {
  private studentService: StudentService;
  private adminService: AdminService;

  constructor() {
    this.studentService = new StudentService();
    this.adminService = new AdminService(); // Inicializar o serviço de administradores
  }

  // Login para estudantes
  public studentLogin = async (req: Request, res: Response) => {
    const { cpf, password } = req.body;
    const loginErrorMessage = "Usuário ou senha incorreto";

    try {
      const student = await this.studentService.getStudentByCpf(cpf);

      if (!student) return res.status(400).json({ error: loginErrorMessage });

      const isPasswordCorrect = await bcrypt.compare(password, student.senha);
      if (!isPasswordCorrect)
        return res.status(400).json({ error: loginErrorMessage });

      const model = {
        documentos: { cpf: cpf },
        nome: student.nome,
        id: student._id,
        role: "student",
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

  // Login para administradores
  public adminLogin = async (req: Request, res: Response) => {
    const { username, password } = req.body;
    const loginErrorMessage = "Usuário ou senha incorreto";

    try {
      const admin = await this.adminService.getAdminByUsername(username);

      if (!admin) return res.status(400).json({ error: loginErrorMessage });

      const isPasswordCorrect = await bcrypt.compare(password, admin.senha);
      if (!isPasswordCorrect)
        return res.status(400).json({ error: loginErrorMessage });

      const model = {
        username: admin.username,
        id: admin._id,
        role: "admin",
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
