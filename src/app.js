import express from 'express';
import morgan from 'morgan';

import globalErrorHandler from './controllers/errorController.js';
import AppError from './utils/appError.js';

import UserRoute from './routes/userRoutes.js';

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.get('/', (req, res) => {
  res.status(200).json({
    status: 'success',
    message: 'Welcome to the API',
    info: {
      creator: 'James Noria',
      organization: 'UDH'
    }
  });
});

app.use('/api/v1/users', UserRoute);

app.all('*', (req, res, next) => {
  next(
    new AppError(`La ruta ${req.originalUrl} no existe en este servidor`, 404)
  );
});

app.use(globalErrorHandler);

export default app;
