import express from 'express';
import bodyParser from 'body-parser';
import categoryRoutes from './routes/category.routes';
import errorHandler from './middlewares/errorHandler';
import { initializeDatabase } from './config/database';

const app = express();

app.use(bodyParser.json());

app.use('/api', categoryRoutes);

app.use(errorHandler);

initializeDatabase();

export default app;
