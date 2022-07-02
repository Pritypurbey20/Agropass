import express from 'express';
import utilsController from '../controllers/utilsController';

const router: any = express.Router();

router.get('/findDuplicate/:model', utilsController.findDuplicate);

export default router;