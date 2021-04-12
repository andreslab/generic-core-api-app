import { Router } from 'express';
import { indexController } from "../controller/indexController";
import { upload, uploadFileController } from "../controller/uploadFileController";
const router: Router = Router();

router.post('/payment', indexController.processPayment);
router.post('/verify', indexController.verifyCheck);
router.post('/upload', upload.single('productImage'), uploadFileController.uploadFile);

export default router;