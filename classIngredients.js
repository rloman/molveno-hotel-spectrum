"use strict";

class Ingedrients {
  constructor(id, ingredientName, price, remainingItems) {
    this._id = id;
    this._ingredientName = ingredientName;
    this._price = price;
    this._remainingItems = remainingItems;
  }

  get id() {
    return this._id;
  }

  get ingredientName() {
    return this._ingredientName;
  }

  get price() {
    return this._price;
  }

  get remainingItems() {
    return this._remainingItems;
  }

  set ingredientName() {
    return this._ingredientName;
  }

  set price(value) {
    this._price = value;
  }

  set remainingItems(value) {
    this._remainingItems = value;
  }
}
