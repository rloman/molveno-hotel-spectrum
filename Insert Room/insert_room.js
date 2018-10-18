"use strict";
let arr = [];
let id = 0;

const insertRoomData = () => {
  let roomNumber = document.getElementById("roomNumber").value;
  let roomType = document.querySelector('input[name="roomType"]:checked').value;
  let people = document.querySelector('input[name="people"]:checked').value;
  let room = new Room(id, roomNumber, roomType, people);
  arr.push(room);
  console.log(arr);
  id += 1;
}

const getRoomData = () => {
  document.getElementById('arrayOfRooms').innerHTML = "";
  for (let i = 0; i < arr.length; i++) {
    document.getElementById('arrayOfRooms').innerHTML += `<br> Room number: ${arr[i].roomNumber} <br>
    Room Type: ${arr[i].roomType} <br> People: ${arr[i].people} <br>`;
     /* let select = document.getElementById("rooms");
     let option = document.createElement("option");
     option.text = arr[i].roomNumber;
     select.add(option); */
  }
}

const filterRoomData = () => {
  let count = 0;
  let rooms = "";
  document.getElementById("filterArray").innerHTML = "";
  let filteredRoomType = document.querySelector('input[name="filterRoomType"]:checked').value;
  let filteredPeople = document.querySelector('input[name="filterPeople"]:checked').value;
  for (let i = 0; i < arr.length; i++) {
    if (filteredRoomType === arr[i].roomType && filteredPeople === arr[i].people) {
      rooms += "<div>Room Number " + arr[i].roomNumber + "</div>";
      count++;
    }
    if (count === 0) {
      document.getElementById("filterArray").innerHTML = `<h2>No rooms found</h2>`;
      return;
    }
    if (count === 1) {
      document.getElementById("filterArray").innerHTML = `<h2>${count} room found`;
    }
    if (count > 1) {
      document.getElementById("filterArray").innerHTML = `<h2>${count} rooms found`;
    }
  }
  document.getElementById("filterArray").innerHTML += rooms;
}

const resetRoomData = () => {
   /* let select = document.getElementById("rooms");
   select.options.length = 0; */
  document.getElementById('arrayOfRooms').innerHTML = "";
}

/* const checkRoomData = () => {
  console.log(`test`);
} */
