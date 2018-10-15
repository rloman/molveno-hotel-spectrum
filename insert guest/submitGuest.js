"use strict";
let arr = [];
let id = 1;

function GuestData(){
  // de value's van de input fields
  let guestName = document.getElementById("guestNameId").value;
  let address = document.getElementById("addressId").value;
  let homeTown = document.getElementById("homeTownId").value;
  let postalCode = document.getElementById("postalCodeId").value;
  let guestID = document.getElementById("guestId").value;
  let paymentMethod = document.getElementById("paymentMethodId").value;
  let guest = new Guest(id, guestName, address, homeTown, postalCode, guestID, paymentMethod);
  arr.push(guest);
  console.log(arr);
  document.getElementById('arrayOfGuest').innerHTML = arr
  id += 1;
}
