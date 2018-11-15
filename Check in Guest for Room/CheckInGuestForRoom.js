"use strict"

function bodyOnload(){
  document.getElementById("guestDatails").style.display = "none";
}

function guestDetails() {
  document.getElementById("bookingNumberField").style.display = "none";
  document.getElementById("guestDatails").style.display = "";
  document.getElementById('DBoutput').innerHTML = "" ;
}

function backToBookingNumber(){
  document.getElementById("bookingNumberField").style.display = "";
  document.getElementById("guestDatails").style.display = "none";
  document.getElementById('DBoutput').innerHTML = "" ;
}

function searchForBookingNumber(){
  let inputBookingNumber = document.getElementById('bookingNumberId').value;
  let found = false;
  if (inputBookingNumber != ""){
    nogGeenBookingNumberIngevuld = true;
  }
  if (inputBookingNumber === ""){
    nogGeenBookingNumberIngevuld = false;
  }
  if (nogGeenBookingNumberIngevuld){
  for (let i=0; i<hotelrooms.length; i++){
    if (hotelrooms[i].bookingNumber === inputBookingNumber){
      found = true;

      document.getElementById('DBoutput').innerHTML =
      "<br>"+
      "<b>" +"room: " + "</b>" + hotelrooms[i].roomNumber + "<br>" +
      "<b>" +"room type: " + "</b>" + hotelrooms[i].roomType + "<br>" +
      "<b>" +"number of people: " + "</b>" + hotelrooms[i].numberOfPeople + "<br>" +
      "<b>" +"status: " + "</b>" + hotelrooms[i].status + "<br>" +
      "<b>" +"check in date: " + "</b>" + hotelrooms[i].checkInDate + "<br>" +
      "<b>" +"check out date: " + "</b>" + hotelrooms[i].checkOutDate + "<br>" +
      "<b>" +"firstname: " + "</b>" + hotelrooms[i].firstname + "<br>" +
      "<b>" +"surname: " + "</b>" + hotelrooms[i].surname + "<br>" +
      "<b>" +"email: " + "</b>" + hotelrooms[i].email + "<br>" +
      "<b>" +"telephone: " + "</b>" + hotelrooms[i].telephone + "<br>" +
      "<b>" +"telephone: " + "</b>" + hotelrooms[i].country + "<br>" +
      "<b>" +"bookingNumber: " + "</b>" + hotelrooms[i].bookingNumber + "<br>" +
      "<b>" +"check: " + "</b>" + hotelrooms[i].check ;

      indexVanFunctieBookingnumber = i;
      // nogGeenBookingNumberIngevuld = true;
      break;
    }
  }
}
  if(!found){
    document.getElementById('DBoutput').innerHTML = "<b>" + "booking number not found" + "</b>" ;
    indexVanFunctieBookingnumber = null;
    nogGeenBookingNumberIngevuld = false;
  }
}
let indexVanFunctieBookingnumber = 0;
///// is eigelijk het zelfde als: let found = false; bij function searchForBookingNumber ///
let nogGeenBookingNumberIngevuld = false;
function checkInGuest(){
  if (nogGeenBookingNumberIngevuld){
    console.log(nogGeenBookingNumberIngevuld);
    console.log(indexVanFunctieBookingnumber);
    let indexVanJsonFile = indexVanFunctieBookingnumber;
    hotelrooms[indexVanJsonFile].check = "satisfied";
    document.getElementById('DBoutput').innerHTML =
    "<br>"+
    "<b>" +"room: " + "</b>" + hotelrooms[indexVanJsonFile].roomNumber + "<br>" +
    "<b>" +"room type: " + "</b>" + hotelrooms[indexVanJsonFile].roomType + "<br>" +
    "<b>" +"number of people: " + "</b>" + hotelrooms[indexVanJsonFile].numberOfPeople + "<br>" +
    "<b>" +"status: " + "</b>" + hotelrooms[indexVanJsonFile].status + "<br>" +
    "<b>" +"check in date: " + "</b>" + hotelrooms[indexVanJsonFile].checkInDate + "<br>" +
    "<b>" +"check out date: " + "</b>" + hotelrooms[indexVanJsonFile].checkOutDate + "<br>" +
    "<b>" +"firstname: " + "</b>" + hotelrooms[indexVanJsonFile].firstname + "<br>" +
    "<b>" +"surname: " + "</b>" + hotelrooms[indexVanJsonFile].surname + "<br>" +
    "<b>" +"email: " + "</b>" + hotelrooms[indexVanJsonFile].email + "<br>" +
    "<b>" +"telephone: " + "</b>" + hotelrooms[indexVanJsonFile].telephone + "<br>" +
    "<b>" +"telephone: " + "</b>" + hotelrooms[indexVanJsonFile].country + "<br>" +
    "<b>" +"bookingNumber: " + "</b>" + hotelrooms[indexVanJsonFile].bookingNumber + "<br>" +
    "<b>" +"check: " + "</b>" + hotelrooms[indexVanJsonFile].check ;
 }
 if (!nogGeenBookingNumberIngevuld){
   document.getElementById('DBoutput').innerHTML =
   "<b>" + "booking number not found" + "</b>" ;
 }
}

//////////////////////

function searchForGuestDetails(){
  let guestName = document.getElementById('guestName').value;
  let guestSurname = document.getElementById('guestSurname').value;
  let guestAddress = document.getElementById('guestAddress').value;
  if (guestName === "" || guestSurname === "" || guestAddress === ""){
    return
  }
  for (let i=0; i<hotelrooms.length; i++){
    if (hotelrooms[i].firstname === guestName && hotelrooms[i].surname === guestSurname && hotelrooms[i].email === guestAddress){
      document.getElementById('DBoutput').innerHTML =
      "<br>"+
      "<b>" +"room: " + "</b>" + hotelrooms[i].roomNumber + "<br>" +
      "<b>" +"room type: " + "</b>" + hotelrooms[i].roomType + "<br>" +
      "<b>" +"number of people: " + "</b>" + hotelrooms[i].numberOfPeople + "<br>" +
      "<b>" +"status: " + "</b>" + hotelrooms[i].status + "<br>" +
      "<b>" +"check in date: " + "</b>" + hotelrooms[i].checkInDate + "<br>" +
      "<b>" +"check out date: " + "</b>" + hotelrooms[i].checkOutDate + "<br>" +
      "<b>" +"firstname: " + "</b>" + hotelrooms[i].firstname + "<br>" +
      "<b>" +"surname: " + "</b>" + hotelrooms[i].surname + "<br>" +
      "<b>" +"email: " + "</b>" + hotelrooms[i].email + "<br>" +
      "<b>" +"telephone: " + "</b>" + hotelrooms[i].telephone + "<br>" +
      "<b>" +"telephone: " + "</b>" + hotelrooms[i].country + "<br>" +
      "<b>" +"bookingNumber: " + "</b>" + hotelrooms[i].bookingNumber + "<br>" +
      "<b>" +"check: " + "</b>" + hotelrooms[i].check ;
      break;
    }
  }
}
