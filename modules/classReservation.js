"use strict"

class classReservation {
  constructor(id, roomNumber, checkInDate, checkOutDate, guestName, guestTelephoneNumber, guestEmailAddress) {
    this.id = id;
    this.roomNumber = roomNumber;
    this.checkInDate = checkInDate;
    this.checkOutDate = checkOutDate;
    this.guestName = guestName;
    this.guestTelephoneNumber = guestTelephoneNumber;
    this.guestEmailAddress = guestEmailAddress;
  }
  get id() {
    return this._id;
  }
  get roomNumber() {
    return this._roomNumber;
  }
  get checkInDate() {
    return this._checkInDate;
  }
  get checkOutDate() {
    return this._checkOutDate;
  }
  get guestName() {
    return this._guestName;
  }
  get guestTelephoneNumber() {
    return this._guestTelephoneNumber;
  }
  get guestEmailAddress() {
    return this._guestEmailAddress
  }

  set id(value) {
    this._id = value;
  }
  set roomNumber(value) {
    this._roomNumber = value;
  }
  set checkInDate(value) {
    this._checkInDate = value;
  }
  set checkOutDate(value) {
    this._checkOutDate = value;
  }
  set guestName(value) {
    this._guestName = value;
  }
  set guestTelephoneNumber(value) {
    this._guestTelephoneNumber = value;
  }
  set guestEmailAddress(value) {
    this._guestEmailAddress = value;
  }
}
