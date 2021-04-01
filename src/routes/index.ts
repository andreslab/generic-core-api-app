import { Router } from 'express';
import { indexController } from "../controller/indexController";
const router: Router = Router();

router.post('/payment', indexController.processPayment);
router.post('/verify', indexController.verifyCheck);

export default router;