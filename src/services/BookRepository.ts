import Book from '../models/Book'
import { injectable } from "inversify";
import {IBook} from '../interfaces/Book';
import {IBookRepository} from '../interfaces/BookRepository';


@injectable()
export default class BookRepository implements IBookRepository {
    async createBook(data: IBook): Promise<IBook> {
        const book = new Book(data);
        await book.save();
        return book;
    }

    async getBook(id: string): Promise<IBook> {
        return await Book.findById(id);
    }

    async getBooks(): Promise<IBook[]> {
        return await Book.find();
    }

    async updateBook(id: string, data: any): Promise<IBook> {
        return await Book.findByIdAndUpdate(id, data)
    }

    async deleteBook(id: string): Promise<void> {
        await Book.deleteOne({_id: id})
    }
}
