"use strict";
let arr = [];
let id = 0;

const roomData = () => {
  let roomNumber = document.getElementById("roomNumber").value;
  let roomType = document.querySelector('input[name="roomType"]:checked').value;
  let people = document.querySelector('input[name="people"]:checked').value;
  let room = new Room(id, roomNumber, roomType, people);
  arr.push(room);
  console.log(arr);
  id += 1;
}
