import express from 'express';
import { getComment, postComment } from '../controllers/comment.js';

const router=express.Router();

router.get("/", getComment);
router.post("/", postComment);

export default router;