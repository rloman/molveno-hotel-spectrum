"use strict";
let arr = [];

function GuestData(){
  // de value's van de input fields
  let guestName = document.getElementById("guestNameId").value;
  let address = document.getElementById("addressId").value;
  let homeTown = document.getElementById("homeTownId").value;
  let postalCode = document.getElementById("postalCodeId").value;
  let guestID = document.getElementById("guestId").value;
  let paymentMethod = document.getElementById("paymentMethodId").value;
  let guest = new Guest(0, guestName, address, homeTown, postalCode, guestID, paymentMethod);
  arr.push(guest);
  console.log(arr);
}
