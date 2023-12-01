import express from 'express';
import { signin,signout } from '../controllers/adminAuth.controller.js';


const router = express.Router();


router.post('/admin-signin',signin)

router.get('/admin-signout',signout)



export default router;