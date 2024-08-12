import express from 'express';
import { getUser,updateUser } from '../controllers/user.js';

const router=express.Router();

router.get("/:id", getUser);
router.put("/", updateUser);

export default router;