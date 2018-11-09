"use strict";
//let now = new Date();
//let today = new Date();

function blockRoom(){

}

function inputDate() {
  let checkIn = document.getElementById('arrivalDate').value;
  let checkOut = document.getElementById('departureDate').value;
  console.log(checkIn);
  console.log(checkOut);
  let output = document.getElementById("vacantRooms");


  //console.log("hotelRooms: " + hotelRooms)
  for (let i = 0; i < hotelRooms.length; i++) {
    if (hotelRooms[i].checkOutDate <= checkIn || hotelRooms[i].checkInDate >= checkOut) {
      let select = document.getElementById("availableRooms");
      let option = document.createElement('option');
      option.text = hotelRooms[i].roomNumber;
      select.add(option);
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

/*
function todayF() {
  today.setDate(now.getDate() + 1);
  function day_of_the_month(d)
  {
    return (d.getDate() < 10 ? '0' : '') + d.getDate();
  }
  function month_of_the_year(d)
  {
    return ((d.getMonth() + 1) < 10 ? '0' : '') + (d.getMonth() + 1);
  }
  let dateControl = document.querySelector('input[name="arrivalDate"]');
  dateControl.setAttribute("min", `${now.getFullYear()}-${month_of_the_year(now)}-${day_of_the_month(now)}`);
  dateControl.value = now.getFullYear() + "-" + month_of_the_year(now) + "-" + day_of_the_month(now);
  dateControl = document.querySelector('input[name="departureDate"]');
  dateControl.setAttribute("min", `${now.getFullYear()}-${month_of_the_year(today)}-${day_of_the_month(today)}`);
  dateControl.value = now.getFullYear() + "-" + month_of_the_year(today) + "-" + day_of_the_month(today);
}
*/

function cancel() {
  location.reload(true);
}
