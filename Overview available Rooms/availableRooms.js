//"use strict";

function inputDate() {
  let checkIn = document.getElementById('checkIn').value;
  let checkOut = document.getElementById('checkOut').value;
  console.log(checkIn);
  console.log(checkOut);
  let output = document.getElementById("vacantRooms");

//console.log("hotelRooms: " + hotelRooms)
  for (i = 0; i < hotelRooms.length; i++) {
      if(hotelRooms[i].checkOutDate <= checkIn || hotelRooms[i].checkInDate >= checkOut) {
        console.log((hotelRooms[i]));
        output.innerHTML += `Room: ${hotelRooms[i].roomNumber}`;
      }
  }


}
/*
/*function checkOverlap(){

/*for (i = 0; i < hotelRooms.length; i++) {
    if(hotelRooms[i].checkInDate <= formInput.checkOutDate && formInput.checkInDate <= hotelRooms[i].checkOutDate) {
      console.log((hotelRooms[i]));
      //document.write(cars[i].make + ", " + cars[i].model);
    }
}
}


for (i = 0; i < hotelRooms.length; i++) {
    if(hotelRooms[i].checkInDate <= formInput.checkOutDate && formInput.checkInDate <= hotelRooms[i].checkOutDate) {
      console.log((hotelRooms[i]));
      //document.write(cars[i].make + ", " + cars[i].model);
    }
}
}
*/
