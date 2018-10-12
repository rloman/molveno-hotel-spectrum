class Accessories {
  constructor(id, accessoryName, accessoryPrice, accessoryAvailability) {
    this._id = id;
    this._accessoryName = accessoryName;
    this._accessoryPrice = accessoryPrice;
    this._accessoryAvailability = accessoryAvailability;
  }

  get id() {
    return this._id;
  }

  get accessoryName() {
    return this._accessoryName;
  }

  get accessoryPrice() {
    return this._accessoryPrice;
  }

  get accessoryAvailability() {
    return this._accessoryAvailability;
  }

  set accessoryName(value) {
    this._accessoryName = value;
  }

  set accessoryPrice(value) {
    this._accessoryPrice = value;
  }

  set accessoryAvailiability(value) {
    this._accessoryAvailability = value;
  }
}
