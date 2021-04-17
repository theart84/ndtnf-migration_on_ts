const {Router} = require('express');
import BooksControllerAPI from '../controllers/BooksControllerAPI';
import fileMiddleware from '../middleware/file';
const router = Router();

router.get('/books', BooksControllerAPI.getBooks); // роут для получения всех книг
router.get('/books/:id', BooksControllerAPI.getBook); // роут для получения книги по id
router.post('/books', BooksControllerAPI.createBook); // роут для создания книги
router.put('/books/:id', fileMiddleware.single('filebook'), BooksControllerAPI.updateBook); // роут для редактирования книги
router.delete('/books/:id', BooksControllerAPI.deleteBook); // роут для удаления книги

export default router;
