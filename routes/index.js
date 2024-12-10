import { Router } from 'express';
import AppController from '../controllers/AppController';
import FilesController from '../controllers/FilesController';

const router = Router();

router.get('/status', AppController.getStatus);
router.get('/stats', AppController.getStats);
router.post('/files', FilesController.postUpload);

export default router;
