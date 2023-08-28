require('dotenv').config();

const app = require('./src/app');

const { PORT } = process.env || 8686;

  //should listen app here
const server = app.listen(PORT, () => {
  console.log(`WSV start with port ${PORT} - Link: localhost:8686/api`);
});