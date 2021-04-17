import  {Request, Response} from 'express';
import {MulterRequest} from "../interfaces/MulterRequest";
import mongoDbService from '../containers/BookContainers';

class BooksController {
  async getBooks(req: Request, res: Response) {
    const data = await mongoDbService.getBooks();
    res.status(200).json({
      success: true,
      quantity: data.length,
      data,
    });
  }

  async getBook(req: Request, res: Response) {
    const {id} = req.params;
    const book = await mongoDbService.getBook(id);
    if (book) {
      res.status(200).json({
        success: true,
        data: book,
      });
    } else {
      res.status(404).json({
        success: false,
        message: 'Book not found',
      });
    }
  }

  async createBook(req: Request, res: Response) {
    const book = await mongoDbService.createBook(req.body);
    res.status(201).json({
      success: true,
      data: book,
    });

  }

  async updateBook(req: MulterRequest, res: Response) {
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
      res.status(200).json({
        success: true,
        data: book,
      });

      res.status(404).json({
        success: false,
        message: 'Book not found',
      });
    }
  }

  async deleteBook(req: Request, res: Response) {
    const {id} = req.params;
    await mongoDbService.deleteBook(id)
    res.status(200).json({
      success: true,
    });
  }
}

const controller = new BooksController();
export default controller;
