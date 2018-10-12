"use strict"

class Room {
  constructor(id, roomNumber, roomType) {
    this.id = id;
    this.roomNumber = roomNumber;
    this.roomType = roomType;
  }

  get id() {
    return this._id;
  }
  get roomNumber() {
    return this._roomNumber;
  }
  get roomType() {
    return this._roomType;
  }

  set id(value) {
    this._id = value;
  }
  set roomNumber(value) {
    this._roomNumber = value;
  }
  set roomType(value) {
    this._roomType = value;
  }
}
