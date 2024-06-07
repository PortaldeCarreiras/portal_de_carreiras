import { Student } from "@src/models/studentSchema";
import StudentRepository from "@src/repository/studentRepository";

export default class StudentService {
  private studentRepository: StudentRepository;

  constructor() {
    this.studentRepository = new StudentRepository();
  }

  async createStudent(student: Student): Promise<Student> {
    return this.studentRepository.create(student);
  }

  async getStudentById(id: string): Promise<Student | null> {
    return this.studentRepository.findById(id);
  }

  async getStudentByCpf(cpf: string): Promise<Student | null> {
    return this.studentRepository.findByCpf(cpf);
  }

  async getAllStudents(): Promise<Student[]> {
    return this.studentRepository.findAll();
  }

  async updateStudent(
    id: string,
    student: Partial<Student>
  ): Promise<Student | null> {
    const existingStudent = await this.studentRepository.findById(id);
    if (!existingStudent) {
      return null;
    }

    const updatedStudent = { ...existingStudent.toObject(), ...student };
    return this.studentRepository.update(id, updatedStudent);
  }

  async deleteStudent(id: string): Promise<Student | null> {
    return this.studentRepository.delete(id);
  }
}
