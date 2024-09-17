const express = require('express');
const app = express();
const categoryRoutes = require('./routes/categories');
const itemRoutes = require('./routes/items');

app.use(express.json());

app.use('/categories', categoryRoutes);
app.use('/items', itemRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});