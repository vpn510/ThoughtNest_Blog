import express from 'express'
import {handleAddComment} from '../controllers/comment.js';


const router = express.Router();

router.post('/:blogId', handleAddComment);

export default router;