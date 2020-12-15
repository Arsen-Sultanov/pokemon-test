import mongoose from 'mongoose';
import { server } from 'config';

try {
  mongoose.connect(server.db.fullUrl(), {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
  });
  mongoose.Promise = Promise;
  mongoose.connection.on('open', () => {
    console.log('mongo connected');
  });
  mongoose.connection.on('error', error => {
    console.log('mongo error');
    console.error(error);
  });
} catch (error) {
  console.log(error);
}

export const mongoConnection = mongoose.connection;
