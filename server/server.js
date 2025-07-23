const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const todoRoutes = require('./routes/todoRouter');
const path = require('path');
const cors = require('cors');

// فقط اجازه به GitHub Pages بده
app.use(cors({ origin: 'https://maleky83.github.io' }));

app.use(express.static(path.join(__dirname, '../client')));
app.use(express.json());

app.use('/api/todos', todoRoutes);

app.use((req, res) => {
  res.status(404).json({ error: 'آدرس یافت نشد' });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
