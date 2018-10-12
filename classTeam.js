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
