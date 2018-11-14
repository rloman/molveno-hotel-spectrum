"use strict";

function secondDateAfterFirst() {
  let firstDate = document.getElementById("arrivalDate").value;
  let secondDate = document.getElementById("departureDate").setAttribute("min", firstDate);
}

function inputDate() {
  let arrivalDate = document.getElementById('arrivalDate').value;
  let departureDate = document.getElementById('departureDate').value;
  console.log(arrivalDate);
  console.log(departureDate);
  let output = document.getElementById("vacantRooms");
  // Removes the hidden attribute, showing the select dropdown menu
  let select = document.getElementById("availableRooms").removeAttribute("hidden");
  //console.log("hotelRooms: " + hotelRooms)
  for (let i = 0; i < hotelRooms.length; i++) {
    if (hotelRooms[i].checkInDate <= arrivalDate || hotelRooms[i].checkOutDate >= departureDate) {
      let select = document.getElementById("availableRooms");
      let option = document.createElement('option');
      option.text = hotelRooms[i].roomNumber;
      select.add(option);
    }
  }
}

function submitBlock() {
  let arrivalDate = document.getElementById('arrivalDate').value;
  let arrivalDateStr = arrivalDate.split('-');
  let formattedArrivalDate = `${arrivalDateStr[2]}-${arrivalDateStr[1]}-${arrivalDateStr[0]}`;
  let departureDate = document.getElementById('departureDate').value;
  let departureDateStr = departureDate.split('-');
  let formattedDepartureDate = `${departureDateStr[2]}-${departureDateStr[1]}-${departureDateStr[0]}`;
  let output = document.getElementById("arrayOfRooms");
  // Get all selected values from the dropdown menu
  let select = document.querySelectorAll('#availableRooms option:checked');
  let selectArray = Array.from(select).map(element => element.value);
  console.log(selectArray);
  console.log(formattedArrivalDate);
  console.log(formattedDepartureDate);
  output.innerHTML = `<br><b>Blocked room(s):</b> <br>`
  for (let i = 0; i < selectArray.length; i++) {
    output.innerHTML += `${selectArray[i]} From: ${formattedArrivalDate} Until: ${formattedDepartureDate} <br>`;
  }
}

function today() {
  let today = new Date();
  let dd = today.getDate();
  let mm = today.getMonth() + 1; //January is 0!
  let yyyy = today.getFullYear();
  if (dd < 10) {
    dd = '0' + dd
  }
  if (mm < 10) {
    mm = '0' + mm
  }

  today = yyyy + '-' + mm + '-' + dd;
  document.getElementById("arrivalDate").setAttribute("min", today);
  document.getElementById("departureDate").setAttribute("min", today);
};


function cancel() {
  location.reload(true);
}
