import mongoose from 'mongoose';
import app from './app';
require('dotenv').config();
const port = process.env.PORT || 3000;



async function start() {
  try {
    await mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PWD}@cluster0.x5rxy.mongodb.net/${process.env.DB_NAME}`, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false
    }, () => {
      console.log('Connected to DB');
    });
    app.listen(port);
  } catch (err) {
    console.log(err);
  }
}

start();
