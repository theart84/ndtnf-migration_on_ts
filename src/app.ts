import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import loggerMiddleware from './middleware/logger';
import errorMiddleware from './middleware/error';
import booksRouter from './routes/books';
import booksRouterAPI from './routes/booksAPI';

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.set('view engine', 'ejs');
app.set('views', './src/views');
app.use(loggerMiddleware);
app.use('/api', booksRouterAPI);
app.use('/', booksRouter);
app.use(errorMiddleware);

export default app;
