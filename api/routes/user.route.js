import express from 'express';
import { test } from '../controllers/user.controller.js';
import { varifyToken } from '../utils/varifyUser.js';
import { updateUser } from '../controllers/user.controller.js';

const router = express.Router();

router.get('/',test);
router.post('/update/:id',varifyToken,updateUser);

export default router;