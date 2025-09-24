import { Router } from 'express';
import FormsController from '@src/controllers/formsController';

const controller = new FormsController();

export default function formRoutes(router: Router) {
    router.get('/forms', controller.getAllForms);
    router.get('/forms/:id', controller.getFormById);
    router.post('/forms', controller.createForm);
    router.put('/forms/:id', controller.updateForm);
}