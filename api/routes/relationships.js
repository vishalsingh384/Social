import express from 'express';
import { getRel, addRel, deleteRel} from '../controllers/relationship.js';

const router=express.Router();

router.get("/",getRel);
router.post("/",addRel);
router.delete("/",deleteRel);


export default router;