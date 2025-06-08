import express from 'express';
import dotenv from 'dotenv';
import postRoutes from './routes/post-routes';
import { AppDataSource } from './auth';

dotenv.config();
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(postRoutes);

// Connect to DB
AppDataSource.initialize().then(() => {
  console.log('Database connection established');
  app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
  });
}).catch((err) => {
  console.error('Database initialization failed:', err);
});

// import express from 'express';
// import { Pool } from 'pg';
// import dotenv from 'dotenv';

// dotenv.config(); // Load DB credentials from .env

// const app = express();
// const port = process.env.PORT || 3000;

// // Create a connection pool using environment variables
// const pool = new Pool({
//   user: process.env.DB_USER,
//   host: process.env.DB_HOST,
//   database: process.env.DB_NAME,
//   password: process.env.DB_PASSWORD,
//   port: parseInt(process.env.DB_PORT || '5432', 10),
// });

// // Example route
// app.get('/', async (req, res) => {
//   try {
//     const result = await pool.query('SELECT NOW()');
//     res.json({ message: 'API running!', server_time: result.rows[0].now });
//   } catch (err) {
//     console.error('Error querying DB:', err);
//     res.status(500).json({ error: 'Database not reachable' });
//   }
// });

// app.listen(port, () => {
//   console.log(`Server running at http://localhost:${port}`);
// });
