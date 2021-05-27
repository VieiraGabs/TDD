"use strict";Object.defineProperty(exports, "__esModule", {value: true});var _uuid4 = require('uuid4');

 class Product {
  constructor(code, description, buyPrice, sellPrice, tags, lovers = 0, id = _uuid4.uuid.call(void 0, )) {
    this.code = code;
    this.description = description;
    this.buyPrice = buyPrice;
    this.sellPrice = sellPrice;
    this.tags = tags;
    this.lovers = lovers;
    this.id = id;
  }
} exports.default = Product;