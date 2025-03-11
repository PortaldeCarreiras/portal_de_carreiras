import StudentModel, { Student } from "../models/studentSchema";
import hashPassword from "../utils/helpers/hashPassword";

export default class StudentRepository {
  async create(student: Student): Promise<Student> {
    const senha = student.documentos
      ? student.documentos.cpf.toString()
      : "user";
      student.senha = await hashPassword(student.senha);

    const createdStudent = new StudentModel(student);
    return createdStudent.save();
  }

  // Novo método para criar múltiplos estudantes em lote
  async createBatch(students: Student[]): Promise<Student[]> {
    // Adiciona a senha para cada estudante e aplica hash
    const studentsWithHashedPasswords = await Promise.all(
        students.map(async (student) => {
            student.senha = await hashPassword(student.documentos?.cpf.toString() || "user");
            return student;
        })
    );

    // Usa o método insertMany para salvar em lote
    const createdStudents = await StudentModel.insertMany(studentsWithHashedPasswords);
    return createdStudents;
  }

  async findById(id: string): Promise<Student | null> {
    return StudentModel.findById(id).exec();
  }

  async findByCpf(cpf: string): Promise<Student | null> {
    return StudentModel.findOne({ "documentos.cpf": parseInt(cpf) }).exec();
  }

  async findAll(): Promise<Student[]> {
    return StudentModel.find().exec();
  }

  async update(id: string, student: Partial<Student>): Promise<Student | null> {
    return StudentModel.findByIdAndUpdate(id, student, { new: true }).exec();
  }

  async delete(id: string): Promise<Student | null> {
    return StudentModel.findByIdAndDelete(id).exec();
  }
}
