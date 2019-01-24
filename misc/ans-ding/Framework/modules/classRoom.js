"use strict"

class Room {
  constructor(id, roomNumber, roomType, people) {
    this.id = id;
    this.roomNumber = roomNumber;
    this.roomType = roomType;
    this.people = people;
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
  get people() {
    return this._people;
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
  set people(value) {
    this._people = value;
  }
}
