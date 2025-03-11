import AdminController from "../controllers/adminController";
import isAuthenticated from "../utils/middlewares/jwtAuthentication";
import { Router } from "express";

const controller = new AdminController();

export default function adminRoutes(router: Router) {
  router.get("/admin/:id",  controller.getAdminById);
  router.get("/admin/username/:username",  controller.getAdminByUsername);
  router.get("/admin",  controller.getAllAdmins);
  router.post("/admin",  controller.createAdmin);
  router.put("/admin/:id",  controller.updateAdmin);
  router.delete("/admin/:id",  controller.deleteAdmin);
}
