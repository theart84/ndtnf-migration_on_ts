import {IBook} from "./Book";

export interface IBookRepository {
  createBook(book: IBook): Promise<IBook>

  getBook(id: string): Promise<IBook>

  getBooks(): Promise<IBook[]>

  updateBook(id: string, data: any): Promise<IBook>

  deleteBook(id: string): Promise<void>
}
