import { Router } from 'express';
import exportController from '../controllers/exportController';

export default function exportRoutes(router: Router) {
    router.post('/export/forms-csv', exportController.exportFormsCSV);
}
