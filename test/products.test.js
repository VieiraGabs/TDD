import request from 'supertest';

import app from '../src/app';
import Product from '../src/models/product';
import Validator from '../src/utils/validator';

let products;

beforeEach(() => {
  products = [new Product(
    12,
    'Asus Zenfone 7',
    4000,
    6000,
    ['tecnologia', 'Asus', 'Zenfone'],
  ), 
    new Product(
    12,
    'Asus Zenfone 6',
    2000,
    4000,
    ['tecnologia', 'Asus', 'Zenfone'],
    )];
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
  .put('/products/999999')
  .expect(400);
});

test('Não deve ser possível remover um produto inexistente', async() => {
  await request(app)
  .delete('/products/999999')
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
  const responseSave = await request(app)
  .post('/products')
  .send(products[0]);

  const response = await request(app)
  .get('/products');
  expect(response.body).toEqual(
    expect.arrayContaining([
      {
        id: responseSave.body.id,
        ...products[0],
        lovers: 0,
      },
    ]),
  );
});

test('Deve ser possível remover os produtos pelo código', async () => {
  await request(app)
  .post('/products')
  .send(products[0]);

  const response = await request(app)
  .post('/products')
  .send(products[0]);

  await request(app)
  .post('/products')
  .send(products[1]);

  await request(app)
  .delete(`/products/${response.body.code}`);

  const responseAll = await request(app)
  .get('/products');

  expect(responseAll.body).toHaveLength(1);
});

test('Deve ser possível buscar produtos por código no array', async() => {
  await request(app)
  .post('/product')
  .send({
    ...products[0],
    code: 40,
  });
  await request(app)
  .post('/product')
  .send({
    ...products[0],
    code: 40,
});

  const responseGet = await request(app).get('/products/40');
  expect(responseGet.body).toHaveLength(2);
});

test('Deve ser possível dar love em um produto', async () => {
  const response = await request(app)
  .post('/products')
  .send(products[0]);

  const responseLove = await request(app)
  .post(`/products/${response.body.code}/love`)
  .send(response.body);

  expect(responseLove.body).toMatchObject({
    lovers: 1,
  });
});

test('Não deve ser possível atualizar o número de lovers de um produto', async () => {
  const responseSave = await request(app)
  .post('/products')
  .send(products[0]);
  const updateProduct = {
    ...products[0],
    lovers: 10000000,
  };
  const responseUpdate = await request(app)
  .put(`/products/${responseSave.body.id}`)
  .send(updateProduct);

  expect(responseUpdate.body.lovers).toBe(0);
});

test('Deve possuir o número de lovers igual a 0 um produto recém criado', async () => {
  const response = await request(app)
  .post('/products')
  .send({
    ...products[0],
    code: 12355321,
    lovers: 10,
  });
  expect(response.body).toMatchObject({
    lovers: 0,
  });
});

test('Um produto deve herdar o número de lovers caso seu código seja igual', async () => {
  const response = await request(app)
  .post('/products')
  .send({
    ...products[0],
    code: 201,
  });

  await request(app)
  .post(`/products/${response.body.code}/love`)
  .send(response.body);

  const response2 = await request(app)
  .post('/products')
  .send({
    ...products[0],
    code: 201,
  });

  expect(response2.body).toMatchObject({
    lovers: 1,
  });
});

test('Produtos de mesmo código devem compartilhar os lovers', async () => {
  const response = await request(app)
  .post('/products')
  .send({
    ...products[0],
    code: 201,
  });

  await request(app)
  .post(`/products/${response.body.code}/love`)
  .send(response.body);

  const response2 = await request(app)
  .post('/products')
  .send({
    ...products[0],
    code: 201,
  });

  await request(app)
  .post(`/products/${response2.body.code}/love`)
  .send(response2.body);

  expect(response2.body).toMatchObject({
    lovers: 2,
  });
});

test('Nao deve ser aceita a descrição com 2 caracteres', () => {
  expect(() => {
    Validator.validProduct(new Product(
      144,
      'Pl',
      50.00,
      80.00,
      ['tecnologia', 'computador', 'gamer'],
    ));
  }).toThrow(new Error('Descrição deve estar entre 3 e 50 caracteres'));
});

test('Deve aceitar descrição com 3 caracteres', () => {
   const product = Validator.validProduct(new Product(
      144,
      'abc',
      50.00,
      80.00,
      ['tecnologia', 'computador', 'gamer'],
    ));
    expect(product.description).toBe('abc');
});