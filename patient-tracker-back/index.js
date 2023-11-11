const express = require('express');
const app = express();
const port = 3000; // Choose any available port you prefer

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
