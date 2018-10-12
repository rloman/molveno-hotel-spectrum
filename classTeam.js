"use strict"

class Team {
  constructor(id, teamId, employeeName, workingHours){
    this.id = id;
    this.teamId = teamId;
    this.employeeName = employeeName;
    this.workingHours = workingHours;
  }

  get id() {
    return this._id;
  }
  get teamId() {
    return this._teamId;
  }
  get employeeName() {
    return this._employeeName;
  }
  get workingHours() {
    return this._workingHours;
  }

<<<<<<< HEAD
  set id(value) {
    this._id = value;
  }
=======
>>>>>>> 3b27810abb3cbc913d289be52141c5fe1bf846fe
  set teamId(value) {
    this._teamId = value;
  }
  set employeeName(value) {
    this._employeeName = value;
  }
  set workingHours(value) {
    this._workingHours = value;
  }
}
