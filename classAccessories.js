class Accessories {
  constructor(id, accessoryName, accessoryPrice, accessoryAvailability) {
<<<<<<< HEAD
    this.id = id;
    this.accessoryName = accessoryName;
    this.accessoryPrice = accessoryPrice;
    this.accessoryAvailability = accessoryAvailability;
=======
    this._id = id;
    this._accessoryName = accessoryName;
    this._accessoryPrice = accessoryPrice;
    this._accessoryAvailability = accessoryAvailability;
>>>>>>> 3b27810abb3cbc913d289be52141c5fe1bf846fe
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

<<<<<<< HEAD
  set id(value) {
    this._id = value;
  }

=======
>>>>>>> 3b27810abb3cbc913d289be52141c5fe1bf846fe
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
