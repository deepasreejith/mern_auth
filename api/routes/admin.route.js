import express from 'express';
import { test } from '../controllers/admin.controller.js';
import { users,deleteUser,updateUser,data,addUser } from '../controllers/admin.controller.js';
import { varifyToken } from '../utils/varifyUser.js';

const router = express.Router();

router.get('/admin',test);
router.get('/dashboard',users);
router.delete('/admin-delete/:id',deleteUser);
router.post('/update/:id',updateUser);
router.get('/fetchData/:id',data);
router.post('/add-user',addUser);

export default router;