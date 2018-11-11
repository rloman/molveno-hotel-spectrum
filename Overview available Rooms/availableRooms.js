"use strict";

function inputDate() {
  let checkIn = document.getElementById('arrivalDate').value;
  let checkOut = document.getElementById('departureDate').value;
  console.log(checkIn);
  console.log(checkOut);
  let output = document.getElementById("vacantRooms");
  let roomType = document.querySelector('input[name="room"]:checked').value;
  let numberOfBeds = document.querySelector('input[name="beds"]:checked').value;
  output.innerHTML = `<b>These are the ${roomType} rooms available: </b><br>`;

  //console.log("hotelRooms: " + hotelRooms)
  for (i = 0; i < hotelRooms.length; i++) {
    if (hotelRooms[i].checkOutDate <= checkIn || hotelRooms[i].checkInDate >= checkOut) {
      console.log("roomType:" + roomType);
      if (roomType === hotelRooms[i].roomType) {
        if (numberOfBeds <= hotelRooms[i].numberOfPeople) {
          //console.log((hotelRooms[i]));
          output.innerHTML += `Room: ${hotelRooms[i].roomNumber} <br>`;
        }
      }
    }
  }
}

function today() {
  let today = new Date();
  let dd = today.getDate();
  let mm = today.getMonth()+1; //January is 0!
  let yyyy = today.getFullYear();
   if(dd<10){
          dd='0'+dd
      }
      if(mm<10){
          mm='0'+mm
      }

  today = yyyy+'-'+mm+'-'+dd;
  document.getElementById("arrivalDate").setAttribute("min", today);
  document.getElementById("departureDate").setAttribute("min", today);
};

function cancel() {
  location.reload(true);
}
