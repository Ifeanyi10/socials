import express from 'express';
import dotenv from 'dotenv';
import postRoutes from './routes/post-routes';
import commentRoutes from './routes/comment-routes';
import { AppDataSource } from './auth';

dotenv.config();
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(postRoutes);
app.use(commentRoutes);

// Health check route
app.get('/', (_req, res) => {
  res.json({ message: 'Server is runnings.' });
});

// Connect to DB
if (process.env.NODE_ENV !== 'test') {
  AppDataSource.initialize().then(() => {
    console.log('Database connection established');
    app.listen(port, () => {
      console.log(`Server running at http://localhost:${port}`);
    });
  }).catch((err) => {
    console.error('Database initialization failed:', err);
  });
}

export { app, AppDataSource };
