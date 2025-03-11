import AdminModel, { Admin } from "../models/adminSchema";
import hashPassword from "../utils/helpers/hashPassword";

export default class AdminRepository {
  async create(admin: Admin): Promise<Admin> {
    // Hash da senha antes de salvar o administrador
    admin.senha = await hashPassword(admin.senha);

    const createdAdmin = new AdminModel(admin);
    return createdAdmin.save();
  }

  async findById(id: string): Promise<Admin | null> {
    return AdminModel.findById(id).exec();
  }

  async findByUsername(username: string): Promise<Admin | null> {
    return AdminModel.findOne({ username }).exec();
  }

  async findAll(): Promise<Admin[]> {
    return AdminModel.find().exec();
  }

  async update(id: string, admin: Partial<Admin>): Promise<Admin | null> {
    // Hash da nova senha, se estiver sendo atualizada
    if (admin.senha) {
      admin.senha = await hashPassword(admin.senha);
    }

    return AdminModel.findByIdAndUpdate(id, admin, { new: true }).exec();
  }

  async delete(id: string): Promise<Admin | null> {
    return AdminModel.findByIdAndDelete(id).exec();
  }
}
