import  {Request, Response} from 'express';
import {MulterRequest} from "../interfaces/MulterRequest";
import mongoDbService from '../containers/BookContainers';


class BooksController {

  async getBooks (req: Request, res: Response)  {
    const data = await mongoDbService.getBooks();
    res.render('index', {
      title: 'Главная',
      books: data
    });
  }

  async getBook (req: Request, res: Response)  {
    const {id} = req.params;
    const book = await mongoDbService.getBook(id);
    if (book) {
      res.render('view', {
        title: 'Главная',
        book
      });
    } else {
      res.status(404).redirect('error/404');
    }
  }

  createBookGet (req: Request, res: Response) {
    res.render('create', {
      title: 'Главная',
      book: [],
    });
  }

  async createBookPost (req: MulterRequest, res: Response) {
    const {title, description, authors, favorite, fileCover, fileName} = req.body;
    let fileBook = '';
    if (req.file) {
      fileBook = req.file.path;
    }
    const book = await mongoDbService.createBook({
      id: "",
      title,
      description,
      authors,
      favorite,
      fileCover,
      fileName,
      fileBook
    });
    res.status(200).redirect('/')
  }

  async updateBookGet (req: Request, res: Response) {
    const {title, description, authors, favorite, fileCover, fileName} = req.body;
    const {id} = req.params;
    const book = await mongoDbService.getBook(id);
    if (book) {
      res.render('update', {
        title: book.title,
        book: book,
      });
    } else {
      res.status(404).redirect('error/404');
    }
  }

  async updateBookPost (req: MulterRequest, res: Response) {
    const {id} = req.params;
    const findBook = await mongoDbService.getBook(id);
    let fileBook = '';
    if (req.file) {
      fileBook = req.file.path;
    } else {
      fileBook = findBook.fileBook
    }
    const updateData = {
      ...req.body,
      fileBook
    }
    const book = await mongoDbService.updateBook(id, updateData);
    if (book) {
      res.status(200).redirect(`/books/update/${id}`);
    } else {
      res.status(404).redirect('error/404');
    }
  }

  async deleteBook (req: Request, res: Response) {
    const {id} = req.params;
    await mongoDbService.deleteBook(id)
    res.status(200).redirect('/');
  }
}

const controller = new BooksController();
export default controller;
