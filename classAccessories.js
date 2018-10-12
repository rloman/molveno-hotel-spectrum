class Accessories {
  constructor(id, accessoryName, accessoryPrice, accessoryAvailability) {
    this.id = id;
    this.accessoryName = accessoryName;
    this.accessoryPrice = accessoryPrice;
    this.accessoryAvailability = accessoryAvailability;
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
}
