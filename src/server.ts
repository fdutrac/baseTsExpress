import express from 'express';
import Controllers from '@controllers/test';

const app = express();
const port = 3000
console.log(Controllers.const());

app.get('/', (req, res) => {
  console.log('Server running at ' + port);
  return res.json({message: 'Oe mundão'})
})

app.listen(port);