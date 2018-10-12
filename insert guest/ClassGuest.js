"use strict";
class Guest {
  constructor(id, guestName, address, homeTown, postalCode, guestID, paymentMethod) {
    this.id = id;
    this.guestName = guestName;
    this.address = address;
    this.homeTown = homeTown;
    this.postalCode = postalCode;
    this.guestID = guestID;
    this.paymentMethod = paymentMethod;
  }

  get id() {
    return this._id;
  }
  get guestName() {
    return this._guestName;
  }
  get address() {
    return this._address;
  }
  get homeTown() {
    return this._homeTown;
  }
  get postalCode() {
    return this._postalCode;
  }
  get guestID() {
    return this._guestID;
  }
  get paymentMethod() {
    return this._paymentMethod;
  }

  set id(value) {
    this._id = value;
  }
  set guestName(value) {
    this._guestName = value;
  }
  set address(value) {
    this._address = value;
  }
  set homeTown(value) {
    this._homeTown = value;
  }
  set postalCode(value) {
    this._postalCode = value;
  }
  set guestID(value) {
    this._guestID = value;
  }
  set paymentMethod(value) {
    this._paymentMethod = value;
  }
}
