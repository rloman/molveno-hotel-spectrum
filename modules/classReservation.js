"use strict";

class Reservation {
  constructor(id, guestFirstName, guestLastName, roomNumber, guestTelephoneNumber,
    guestEmailAddress, numberOfGuests, checkInDate, checkOutDate) {
    this.id = id;
    this.guestFirstName = guestFirstName;
    this.guestLastName = guestLastName;
    this.roomNumber = roomNumber;
    this.guestTelephoneNumber = guestTelephoneNumber;
    this.guestEmailAddress = guestEmailAddress;
    this.numberOfGuests = numberOfGuests;
    this.checkInDate = checkInDate;
    this.checkOutDate = checkOutDate;
  }
  get id() {
    return this._id;
  }
  get guestFirstName() {
    return this._guestFirstName;
  }
  get guestLastName() {
    return this._guestLastName;
  }
  get roomNumber() {
    return this._roomNumber;
  }
  get guestTelephoneNumber() {
    return this._guestTelephoneNumber;
  }
  get guestEmailAddress() {
    return this._guestEmailAddress;
  }
  get numberOfGuests() {
    return this._numberOfGuests;
  }
  get checkInDate() {
    return this._checkInDate;
  }
  get checkOutDate() {
    return this._checkOutDate;
  }

  set id(value) {
    this._id = value;
  }
  set guestFirstName(value) {
    this._guestFirstName = value;
  }
  set guestLastName(value) {
    this._guestLastName = value;
  }
  set roomNumber(value) {
    this._roomNumber = value;
  }
  set guestTelephoneNumber(value) {
    this._guestTelephoneNumber = value;
  }
  set guestEmailAddress(value) {
    this._guestEmailAddress = value;
  }
  set numberOfGuests(value) {
    this._numberOfGuests = value;
  }
  set checkInDate(value) {
    this._checkInDate = value;
  }
  set checkOutDate(value) {
    this._checkOutDate = value;
  }
}
