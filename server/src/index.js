const express = require('express');
const app = express();
const { initSocket } = require('./socket/socket');

const PORT = process.env.PORT || 5500

initSocket(app);

app.listen(PORT, () => {
  console.log('[OK] Server running!')
})


