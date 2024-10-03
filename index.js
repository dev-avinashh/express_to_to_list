import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import morgan from 'morgan';
import dotenv from 'dotenv';
import routes from './routes/routes.js';
import { connectDatabase } from './config/db.config.js';
import { handleError } from './middlewares/errorHandler.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8000;
const ENV = process.env.NODE_ENV || 'development';

// Middleware
app.use(express.json());
app.use(cors({ origin: ENV === 'production' ? process.env.ALLOWED_ORIGINS : '*' })); 
app.use(helmet()); 
app.use(compression()); 
app.use(morgan('tiny'));

app.use('/api/todo', routes);

app.get('/', (req, res) => {
  res.send('Server is running.');
});

// Error Handling
app.use(handleError);

connectDatabase()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Database connection failed:', err);
  });

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM received. Shutting down gracefully...');
  app.close(() => {
    console.log('Server closed');
    process.exit(0);
  });
});
