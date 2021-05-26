import request from 'supertest';

import app from '../src/app';

let products;

beforeEach(() => {
  products = [{
    code: 12,
    description: 'Asus Zenfone 7',
    buyPrice: 4000,
    sellPrice: 6000,
    tags: ['tecnologia', 'Asus', 'Zenfone'],
  }, {
    code: 12,
    description: 'Asus Zenfone 6',
    buyPrice: 2000,
    sellPrice: 4000,
    tags: ['tecnologia', 'Asus', 'Zenfone'],
   }]
});

test('Deve ser  possível adicionar um novo produto', async () => {
  const response = await request(app)
  .post('/products')
  .send(products[0]);

  expect(response.body).toMatchObject({
    ...products[0],
    lovers: 0,
  });
});

test('O status code de um produto criado deverá ser 201', async () => {
  await request(app)
  .post('/products')
  .send(products[0]);

  expect(201);
});

test('Deve ser possível atualizar dados de um produto', async() => {
  const response = await request(app)
  .post('/products')
  .send(products[0]);

  const updateProduct = {
  ...products[0],
  description: 'Dell Vostro',
  };

  const responseUpdate = await request(app)
  .put(`/products/${response.body.id}`)
  .send(updateProduct);

  expect(responseUpdate.body).toMatchObject(updateProduct);
})

test('Não deve ser possível atualizar um produto inexistente', async() => {
  await request(app)
  .put('/products/9198123')
  .expect(400);
});

test('Não deve ser possível remover um produto inexistente', async() => {
  await request(app)
  .delete('/products/9198123')
  .expect(400);
});

test('Deve retornar o código 204 quando um produto for removido', async () => {
  const response = await request(app)
  .post('/products')
  .send (products[0]);

  await request(app)
  .delete(`/products/${response.body.code}`)
  .expect(204);
});

test('Deve ser possível listar todos os produtos', async () => {
  
});

test('Deve ser possível remover os produtos pelo código', async () => {
  //
})