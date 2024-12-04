import { Student } from "@src/models/studentSchema";
import StudentService from "@src/services/studentService";
import { Request, Response } from "express";

export default class StudentController {
  private StudentService: StudentService;

  constructor() {
    this.StudentService = new StudentService();
  }

  public createStudent = async (req: Request, res: Response): Promise<void> => {
    try {
      const Student: Student = req.body;
      const newStudent = await this.StudentService.createStudent(Student);
      res.status(201).json(newStudent);
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  };

  public createBatchStudents = async (req: Request, res: Response): Promise<void> => {
    try {
      const students: Student[] = req.body; // Espera-se um array de estudantes
      if (!Array.isArray(students)) {
        res
          .status(400)
          .json({ error: "O corpo da requisição deve ser um array de estudantes" });
        return;
      }

      const createdStudents = await this.StudentService.createStudentsBatch(
        students
      );
      res.status(201).json(createdStudents);
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  };

  public getStudentById = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    try {
      const Student = await this.StudentService.getStudentById(req.params.id);
      if (Student) {
        res.status(200).json(Student);
      } else {
        res.status(404).json({ error: "Student not found" });
      }
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  };

  public getAllStudents = async (
    _req: Request,
    res: Response
  ): Promise<void> => {
    try {
      const Students = await this.StudentService.getAllStudents();
      res.status(200).json(Students);
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  };

  public updateStudent = async (req: Request, res: Response): Promise<void> => {
    try {
      const Student: Partial<Student> = req.body;
      const updatedStudent = await this.StudentService.updateStudent(
        req.params.id,
        Student
      );
      if (updatedStudent) {
        res.status(200).json(updatedStudent);
      } else {
        res.status(404).json({ error: "Student not found" });
      }
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  };

  public deleteStudent = async (req: Request, res: Response): Promise<void> => {
    try {
      const deletedStudent = await this.StudentService.deleteStudent(
        req.params.id
      );
      if (deletedStudent) {
        res.status(200).json({ message: "Student deleted successfully" });
      } else {
        res.status(404).json({ error: "Student not found" });
      }
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  };
}
