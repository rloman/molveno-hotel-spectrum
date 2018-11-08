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
  let output = document.getElementById("output");
  output.innerHTML = `First name: ${guestFirstName} <br> Last name: ${guestLastName} <br> Room number: ${roomNumber}
  <br> Telephone number: ${telephonenumber} <br> Email Address: ${emailaddress} <br> People: ${people} <br>
  Arrival date: ${checkInDate} <br> Departure date: ${checkOutDate}`;
  console.table(arr);
}

function cancel() {
  location.reload(true);
}
