import express from 'express';
import cors from 'cors';
import router from './app/routes';

import notFound from './app/middleware/NotFound';
import errorHandler from './app/middleware/globalErrorHandler';

const app = express();

app.use(express.json());
app.use(cors());
app.use('/api/v1', router);
app.use(errorHandler);
app.use('*', notFound);

export default app;
