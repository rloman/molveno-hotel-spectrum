class Accessories {
  constructor(id, accessoryName, accessoryPrice, accessoryAvailability, accessoryTotal) {
    this.id = id;
    this.accessoryName = accessoryName;
    this.accessoryPrice = accessoryPrice;
    this.accessoryAvailability = accessoryAvailability;
    this.accessoryTotal = accessoryTotal;
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

  get accessoryTotal() {
    return this._accessoryTotal;
  }

  set id(value) {
    this._id = value;
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

  set accessoryTotal(value) {
    this._accessoryTotal = value;
  }
}
