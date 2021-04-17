const {Router} = require('express');
import BooksController from '../controllers/BooksController';
import fileMiddleware from '../middleware/file';
const router = Router();

router.get('/', BooksController.getBooks) // роут для главной страницы
router.get('/books/view/:id', BooksController.getBook); // роут для просмотра книги по id
router.get('/books/create', BooksController.createBookGet); // роут для получения страницы для создания книги
router.post('/books/create', fileMiddleware.single('filebook'), BooksController.createBookPost); // роут для отправки запроса на создание книги
router.get('/books/update/:id', BooksController.updateBookGet); // роут для получения страницы для редактирования книги
router.post('/books/update/:id', fileMiddleware.single('filebook'), BooksController.updateBookPost); // роут для отправки запроса на редактирование книги
router.post('/books/delete/:id', BooksController.deleteBook); // роут для удаления книги

export default router;
