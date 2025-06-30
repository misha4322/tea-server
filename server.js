
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRouter from './routes/auth.js';
import productsRouter from './routes/products.js';
import favoritesRouter from './routes/favorites.js';
import cartRouter from './routes/cart.js';
import orderRouter from './routes/order.js';
import https from 'https';
import fs from 'fs';

dotenv.config();
const app = express();

app.use(cors({
  origin: 'https://tea-client-zeta.vercel.app',
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'], 
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
  
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api/orders', orderRouter)
app.use('/api/cart', cartRouter);
app.use('/api/products', productsRouter);
app.use('/api/auth', authRouter);
app.use('/api/favorites', favoritesRouter);

const PORT = process.env.PORT || 5000;
if (process.env.NODE_ENV === 'production') {
  app.listen(PORT, () => console.log(`Сервер запущен на порту ${PORT}`));
} else {
  https.createServer({
    key: fs.readFileSync('server.key'),
    cert: fs.readFileSync('server.cert')
  }, app).listen(PORT, () => {
    console.log(`Сервер с SSL запущен на порту ${PORT}`);
  });
}
