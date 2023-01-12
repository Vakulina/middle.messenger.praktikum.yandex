
const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;
const rootPath = (path.join(__dirname, 'dist'));

app.listen(PORT, function() {
    console.log(`Приложение запущено на ${PORT}`)
})

app.use(express.static(rootPath));

