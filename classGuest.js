"use strict";
class guest {
  constructor(id, guestName, address, postalCode, homeTown, country, eMail, phone, mobile, guestID, paymentMethod) {
    this.id = id;
    this.guestName = guestName;
    this.address = address;
    this.postalCode = postalCode;
    this.homeTown = homeTown;
    this.country = country;
    this.eMail = eMail;
    this.phone = phone;
    this.mobile = mobile;
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
  get postalCode() {
    return this._postalCode;
  }
  get homeTown() {
    return this._homeTown;
  }
  get country() {
    return this._country;
  }
  get eMail() {
    return this._eMail;
  }
  get phone() {
    return this._phone;
  }
  get mobile() {
    return this._mobile;
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
  set postalCode(value) {
    this._postalCode = value;
  }
  set homeTown(value) {
    this._homeTown = value;
  }
  set country(value) {
    this._country = value;
  }
  set eMail(value) {
    this._eMail = value;
  }
  set phone(value) {
    this._phone = value;
  }
  set mobile(value) {
    this._mobile = value;
  }
  set guestID(value) {
    this._guestID = value;
  }
  set paymentMethod(value) {
    this._paymentMethod = value;
  }
}
