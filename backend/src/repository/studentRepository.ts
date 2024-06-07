import StudentModel, { Student } from "@src/models/studentSchema";
import hashPassword from "@src/utils/helpers/hashPassword";

export default class StudentRepository {
  async create(student: Student): Promise<Student> {
    const senha = student.documentos
      ? student.documentos.cpf.toString()
      : "user";
    student.senha = await hashPassword(senha);

    const createdStudent = new StudentModel(student);
    return createdStudent.save();
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
