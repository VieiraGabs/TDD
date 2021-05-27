"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _express = require('express'); var _express2 = _interopRequireDefault(_express);
var _cors = require('cors'); var _cors2 = _interopRequireDefault(_cors);
var _uuidv4 = require('uuidv4');
var _product = require('../src/models/product'); var _product2 = _interopRequireDefault(_product);

const app = _express2.default.call(void 0, );

app.use(_express2.default.json());
app.use(_cors2.default.call(void 0, ));

let products = [];

app.get('/products', (request, response) => {
  // TODO: Desenvolver listagem
  response.json(products);
});

app.post('/products', (request, response) => {
  // TODO: Desenvolver registro no array products
  const { code, description, buyPrice, sellPrice, tags } = request.body;
  const p = products.find((v) => v.code == code);
  const lov = p ? p.lovers : 0;
  const product = new (0, _product2.default)(code, description, buyPrice, sellPrice, tags, lov, id);
 
  products.push(product);
  response.status(201).json(product);
});

app.put('/products/:id', (request, response) => {
  // TODO: Desenvolver atualização de produto por ID
  const { id } = request.params;

  const { description, buyPrice, sellPrice, tags } = request.body;

  const p = products.find((v) => v.id == id);

  if(p){
    p.description = description;
    p.buyPrice = buyPrice;
    p.sellPrice = sellPrice;
    p.tags = tags;
    
    response.json(p);
  }else{
    response.status(400).send();
  }
});

app.delete('/products/:code', (request, response) => {
  // TODO: Remove TODOS os produtos que possuam o código passado por parâmetro
  const { code } = request.params;
  const index = products.findIndex((v) => v.code == code);

  if(index == -1){
    response.status(400).send();
  }else {
    products = products.filter((v) => v.code !== code);
    response.status(204).send();
  }
});

app.post('/products/:code/love', (request, response) => {
  const { code } = request.params;

  const p = products.find((v) => v.code == code);

  if(!p) {
    response.status(400).send();
  }else {
    products.filter((v) => v.code == code)
    .map((val) => val.lovers += 1);
    
    response.json({
      lovers: p.lovers,
    });
  }
});

app.get('/products/:code', (request, response) => {
  // TODO: Busca de todos os produtos com o código recebido por parâmetro.
});

exports. default = app;