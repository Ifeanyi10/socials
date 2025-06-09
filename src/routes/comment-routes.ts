import { Router } from 'express';
import { createComment, replyToComment } from '../controllers/comment-controller';

const router = Router();

router.post('/api/comments', createComment);
router.post('/api/comments/reply', replyToComment);

export default router;
