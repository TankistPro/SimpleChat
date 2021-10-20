const express = require('express');
const app = express();

const { initSocket } = require('./socket/socket');
const { initRoutes } = require('../src/routes/index');

const PORT = process.env.PORT || 5500

initSocket(app);

initRoutes(app);

app.listen(PORT, () => {
  console.log('[OK] Server running!')
})


