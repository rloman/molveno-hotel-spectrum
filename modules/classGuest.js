"use strict";
class Guest {
  constructor(id, guestName, address, homeTown, postalCode, telephoneNumber, emailAddress, passportNumber, paymentMethod) {
    this.id = id;
    this.guestName = guestName;
    this.address = address;
    this.homeTown = homeTown;
    this.postalCode = postalCode;
    this.telephoneNumber = telephoneNumber;
    this.emailAddress = emailAddress;
    this.passportNumber = passportNumber;
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
  get telephoneNumber() {
    return this._telephoneNumber;
  }
  get emailAddress() {
    return this._emailAddress;
  }
  get passportNumber() {
    return this._passportNumber;
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
  set telephoneNumber(value) {
    this._telephoneNumber = value;
  }
  set emailAddress(value) {
    this._emailAddress = value;
  }
  set passportNumber(value) {
    this._passportNumber = value;
  }
  set paymentMethod(value) {
    this._paymentMethod = value;
  }
}
