const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const todoRoutes = require('./routes/todoRouter');
const path = require('path');

// اجازه فقط به GitHub Pages
app.use(
  cors({
    origin: 'https://maleky83.github.io'
  })
);

// یا اگر می‌خوای همه اجازه داشته باشن (برای تست)
app.use(cors());

app.use(express.static(path.join(__dirname, '../client')));

// Middleware
app.use(express.json());

// Routes
app.use('/api/todos', todoRoutes);

app.use((req, res) => {
  res.status(404).json({ error: 'آدرس یافت نشد' });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
