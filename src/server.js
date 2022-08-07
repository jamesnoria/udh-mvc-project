import app from './app.js';
import mongoose from 'mongoose';

const PORT = process.env.PORT || 5000;
const DB_LOCAL = process.env.MONGODB_LOCAL;
const DB = process.env.MONGODB_ATLAS.replace(
  '<PASSWORD>',
  process.env.DB_PASSWORD
);

if (process.env.NODE_ENV === 'development') {
  mongoose
    .connect(DB_LOCAL)
    .then(() => {
      console.log('✓ DB LOCAL Connected');
    })
    .catch((err) => {
      console.log(err);
    });
  app.listen(3000, () => {
    console.log(`Server is running on port ${3000}`);
  });
} else {
  mongoose.connect(DB).then(() => {
    console.log('✓ DB PROD Connected');
  });
}
