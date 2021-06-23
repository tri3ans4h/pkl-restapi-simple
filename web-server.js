const express = require('express');
const app = express();
const PORT = 3001;

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, HEAD, OPTIONS, DELETE, POST, PUT");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, ContentType, Content-Type, Accept, Authorization");
  next();
});
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.listen(PORT, () => console.log(`Server listening on port: ${PORT}`));