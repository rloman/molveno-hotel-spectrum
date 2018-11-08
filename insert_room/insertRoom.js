"use strict";
let arr = [];
let id = 0;

const insertRoomData = () => {
  let roomNumber = document.getElementById("roomNumber").value;
  let roomType = document.querySelector('input[name="roomType"]:checked').value;
  let people = document.querySelector('input[name="people"]:checked').value;
  let room = new Room(id, roomNumber, roomType, people);
  let table = document.getElementById("roomTable");
  document.getElementById('arrayOfRooms').innerHTML = "";
  table.innerHTML = "";
  table.innerHTML = `<td>Room Number</td>
  <td>Room Type</td>
  <td>People</td>`;
  arr.push(room);
  console.table(arr);
  id += 1;
  for (let i = 0; i < arr.length; i++) {
    let row = table.insertRow(-1);
    let cell1 = row.insertCell(0);
    let cell2 = row.insertCell(1);
    let cell3 = row.insertCell(2);
    cell1.innerHTML = `${arr[i].roomNumber}`;
    cell2.innerHTML = `${arr[i].roomType}`;
    cell3.innerHTML = `${arr[i].people}`;
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
      rooms += `<div>Room Number ${arr[i].roomNumber} </div>`;
      count++;
    }
  }
  switch (count) {
    case 0:
      document.getElementById("filterArray").innerHTML = `<h2>No rooms found</h2>`;
      break;

    case 1:
      document.getElementById("filterArray").innerHTML = `<h2>One room found</h2>`;
      document.getElementById("filterArray").innerHTML += rooms;
      break;
  }

  if (count > 1) {
    document.getElementById("filterArray").innerHTML += `<h2>${count} rooms found</h2>`;
    document.getElementById("filterArray").innerHTML += rooms;
  }
}
/*
  if (count === 0) {
    document.getElementById("filterArray").innerHTML = `<h2>No rooms found</h2>`;
  }
  if (count === 1) {
    document.getElementById("filterArray").innerHTML = `<h2>${count} room found`;
  }
  if (count > 1) {
    document.getElementById("filterArray").innerHTML = `<h2>${count} rooms found`;
  }
  document.getElementById("filterArray").innerHTML += rooms;
}
*/
