require('dotenv').config();
const app = require('./src/app');

const { PORT } = process.env || 8686;

const server = app.listen(PORT, () => {
  console.log(`WSV start with port ${PORT}`);
});