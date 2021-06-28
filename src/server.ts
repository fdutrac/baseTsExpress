import express from 'express';

const app = express();
const port = 3000

app.get('/', (req, res) => {
  console.log('Server running at ' + port);
  return res.json({message: 'Oe mundão'})
})

app.listen(port);