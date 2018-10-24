"use strict"
let arrGuest = [];
function inputResRoom(){
  let guestName = document.getElementById("guestName").value;
  let telOrMail = document.getElementById("telOrEmail").value;
  let persons = document.getElementById("numberOfPeople").value;
  let checkIn = document.getElementById("checkIn").value;
  let checkOut = document.getElementById("checkOut").value;
  arrGuest.push(guestName,telOrMail,persons,checkIn,checkOut);
  console.log(arrGuest);
  document.getElementById('arrGuestinPar').innerHTML = "guest name: " + guestName + "<br>" + " telephone number or email addres: " + telOrMail + "<br>" + persons + "<br>" + " check in: " + checkIn + "<br>" + " check out " + checkOut;
}
