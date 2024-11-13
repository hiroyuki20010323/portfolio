import express from 'express';

const app = express();
const PORT = 3080;

app.get('/', (req, res) => {
  res.send('Hello from Express with TypeScript!!!!');
});

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
