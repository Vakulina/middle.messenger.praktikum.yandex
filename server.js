const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;
const rootPath = (path.join(__dirname, 'dist'));

app.listen(PORT, () => {
  console.log(`App on port ${PORT}`);
});

app.use(express.static(rootPath));

app.use('/', (_, res) => {
  res.sendFile((path.join(rootPath, 'index.html')));
});
