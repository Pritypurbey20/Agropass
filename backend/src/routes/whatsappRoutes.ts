import express from 'express';
import whatsappController from '../controllers/whatsappController';


const router: any = express.Router();

router.get('/webhook', whatsappController.verifyWebHook);

router.post('/webhook', whatsappController.webHook);

router.post('/surveyMessage', whatsappController.sendMsgSurvey);

export default router;