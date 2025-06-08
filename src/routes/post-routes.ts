import { Router } from 'express';
import multer from 'multer';
import path from 'path';
import { createPost } from '../controllers/post-controller';

const router = Router();

// Configure multer storage to save files in the 'files' folder
const storage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    cb(null, path.join(__dirname, '../../files'));
  },
  filename: (_req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + '-' + file.originalname);
  }
});

const upload = multer({ storage });

// POST /api/posts – create a post with optional file upload
router.post('/api/posts', upload.single('file'), createPost);

export default router;
