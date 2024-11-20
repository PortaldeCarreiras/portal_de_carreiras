import { Admin } from "@src/models/adminSchema";
import AdminService from "@src/services/adminService";
import { Request, Response } from "express";

export default class AdminController {
  private adminService: AdminService;

  constructor() {
    this.adminService = new AdminService();
  }

  public createAdmin = async (req: Request, res: Response): Promise<void> => {
    try {
      const admin: Admin = req.body;
      const newAdmin = await this.adminService.createAdmin(admin);
      res.status(201).json(newAdmin);
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  };

  public getAdminById = async (req: Request, res: Response): Promise<void> => {
    try {
      const admin = await this.adminService.getAdminById(req.params.id);
      if (admin) {
        res.status(200).json(admin);
      } else {
        res.status(404).json({ error: "Admin not found" });
      }
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  };

  public getAdminByUsername = async (req: Request, res: Response): Promise<void> => {
    try {
      const { username } = req.params;
      const admin = await this.adminService.getAdminByUsername(username);
      if (admin) {
        res.status(200).json(admin);
      } else {
        res.status(404).json({ error: "Admin not found" });
      }
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  };

  public getAllAdmins = async (_req: Request, res: Response): Promise<void> => {
    try {
      const admins = await this.adminService.getAllAdmins();
      res.status(200).json(admins);
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  };

  public updateAdmin = async (req: Request, res: Response): Promise<void> => {
    try {
      const admin: Partial<Admin> = req.body;
      const updatedAdmin = await this.adminService.updateAdmin(req.params.id, admin);
      if (updatedAdmin) {
        res.status(200).json(updatedAdmin);
      } else {
        res.status(404).json({ error: "Admin not found" });
      }
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  };

  public deleteAdmin = async (req: Request, res: Response): Promise<void> => {
    try {
      const deletedAdmin = await this.adminService.deleteAdmin(req.params.id);
      if (deletedAdmin) {
        res.status(200).json({ message: "Admin deleted successfully" });
      } else {
        res.status(404).json({ error: "Admin not found" });
      }
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  };
}
