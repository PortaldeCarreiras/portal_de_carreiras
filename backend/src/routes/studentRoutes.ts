import StudentController from "../controllers/studentController";
import isAuthenticated from "../utils/middlewares/jwtAuthentication";
import { Router } from "express";

const controller = new StudentController();

export default function studentRoutes(router: Router) {
  router.get("/student/:id", controller.getStudentById);
  router.get("/student", controller.getAllStudents);
  router.post("/student", controller.createStudent);
  router.post("/students/batch", controller.createBatchStudents);
  router.put("/student/:id", controller.updateStudent);
  router.delete("/student/:id", controller.deleteStudent);
}
