import mongoose, {Schema, Document} from 'mongoose';
import {IBook} from '../interfaces/Book';


const bookSchema = new Schema({
  title: String,
  description: String,
  authors: [String],
  favorite: String,
  fileCover: String,
  fileName: String,
  fileBook: String
}, { timestamps: true})

const bookModel = mongoose.model<IBook & Document>('Book', bookSchema);

export default bookModel;
