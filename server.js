// server.js (только запуск сервера)
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRouter from './routes/auth.js';
import productsRouter from './routes/products.js';
import favoritesRouter from './routes/favorites.js';
import cartRouter from './routes/cart.js';
import orderRouter from './routes/order.js';
import pool from './db.js'; // Импортируем пул для проверки подключения

dotenv.config();

const app = express();

app.use(cors({
  origin: 'https://teaclin.vercel.app/',
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

// Проверка подключения к БД при старте
pool.query('SELECT NOW()')
  .then(res => console.log(`✅ Database connected at ${res.rows[0].now}`))
  .catch(err => console.error('❌ Database connection error', err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
