"use strict";
let arr = [];
let id = 0;

function* idIncrement() {
  while (id < id + 1) {
    yield id++;
  }
}

const roomReservation = () => {
  let guestFirstName = document.getElementById("firstName").value;
  let guestLastName = document.getElementById("lastName").value;
  let telephonenumber = document.getElementById("telephonenumber").value;
  let emailaddress = document.getElementById("emailaddress").value;
  let people = document.querySelector('input[name="people"]:checked').value;
  let roomNumber = document.getElementById("roomNumber").value;
  let checkInDate = document.getElementById("arrivalDate").value;
  let checkOutDate = document.getElementById("depatureDate").value;
  if (checkInDate > checkOutDate) {
    throw new Error("Arrival date can't be later than departure date");
  }
  let genId = idIncrement().next().value;
  let reservation = new Reservation(genId, guestFirstName, guestLastName, roomNumber, telephonenumber,
    emailaddress, people, checkInDate, checkOutDate);
  arr.push(reservation);
  console.table(arr);
}
