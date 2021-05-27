export default class Validator {
  static validProduct(Product){
    const { description, buyPrice, sellPrice } = product;
    if (description.length < 3){
      throw new Error('Descrição deve estar entre 3 e 50 caracteres');
    }
    if (buyPrice > sellPrice) {
      throw new Error('Valor de venda não pode ser maior que o valor de compra');
    }
    return product;
  }
}
