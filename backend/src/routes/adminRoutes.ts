import AdminController from "@src/controllers/adminController";
import isAuthenticated from "@src/utils/middlewares/jwtAuthentication";
import { Router } from "express";

const controller = new AdminController();

export default function adminRoutes(router: Router) {
  router.get("/admin/:id", isAuthenticated, controller.getAdminById);
  router.get("/admin/username/:username", isAuthenticated, controller.getAdminByUsername);
  router.get("/admin", isAuthenticated, controller.getAllAdmins);
  router.post("/admin", isAuthenticated, controller.createAdmin);
  router.put("/admin/:id", isAuthenticated, controller.updateAdmin);
  router.delete("/admin/:id", isAuthenticated, controller.deleteAdmin);
}
