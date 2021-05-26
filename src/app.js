import express from 'express';
import cors from 'cors';
import { uuid } from 'uuidv4';

const app = express();

app.use(express.json());
app.use(cors());

let products = [];

app.get('/products', (request, response) => {
  // TODO: Desenvolver listagem
});

app.post('/products', (request, response) => {
  // TODO: Desenvolver registro no array products
  const { code, description, buyPrice, sellPrice, tags } = request.body;
  const p = products.find((v) => v.code == code);
  const lov = p ? p.lovers : 0;
  const product = {
    id: uuid(),
    code,
    description,
    buyPrice,
    sellPrice,
    tags,
    lovers: lov,
  };
  products.push(product);
  response.status(201).json(product);
});

app.put('/products/:id', (request, response) => {
  // TODO: Desenvolver atualização de produto por ID
});

app.delete('/products/:code', (request, response) => {
  // TODO: Remove TODOS os produtos que possuam o código passado por parâmetro
});

app.post('/products/:code/love', (request, response) => {
  // TODO: Incrementa em 1 o número de lovers de todos os produtos que possuam 
  // o code do parâmetro
});

app.get('/products/:code', (request, response) => {
  // TODO: Busca de todos os produtos com o código recebido por parâmetro.
});

export default app;