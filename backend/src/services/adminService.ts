import { Admin } from "@src/models/adminSchema";
import AdminRepository from "@src/repository/adminRepository";

export default class AdminService {
  private adminRepository: AdminRepository;

  constructor() {
    this.adminRepository = new AdminRepository();
  }

  async createAdmin(admin: Admin): Promise<Admin> {
    return this.adminRepository.create(admin);
  }

  async getAdminById(id: string): Promise<Admin | null> {
    return this.adminRepository.findById(id);
  }

  async getAdminByUsername(username: string): Promise<Admin | null> {
    return this.adminRepository.findByUsername(username);
  }

  async getAllAdmins(): Promise<Admin[]> {
    return this.adminRepository.findAll();
  }

  async updateAdmin(
    id: string,
    admin: Partial<Admin>
  ): Promise<Admin | null> {
    const existingAdmin = await this.adminRepository.findById(id);
    if (!existingAdmin) {
      return null;
    }

    const updatedAdmin = { ...existingAdmin.toObject(), ...admin };
    return this.adminRepository.update(id, updatedAdmin);
  }

  async deleteAdmin(id: string): Promise<Admin | null> {
    return this.adminRepository.delete(id);
  }
}
