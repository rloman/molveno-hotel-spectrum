"use strict";
let arr = [];
let id = 1;

function GuestData(){
  // de value's van de input fields
  let guestName = document.getElementById("guestNameId").value;
  let address = document.getElementById("addressId").value;
  let homeTown = document.getElementById("homeTownId").value;
  let postalCode = document.getElementById("postalCodeId").value;
  let paspoortnummer = document.getElementById("paspoortnummer").value;
  let paymentMethod = document.getElementById("paymentMethodId").value;
  let guest = new Guest(id, guestName, address, homeTown, postalCode, paspoortnummer, paymentMethod);
  arr.push(guest);
  console.log(arr);
  for (let i = 0; i < arr.length; i++) {
    document.getElementById('arrayOfGuest').innerHTML = `${arr[i].guestName} <br>
    ${arr[i].address} <br> ${arr[i].homeTown} <br> ${arr[i].postalCode} <br>
    ${arr[i].guestID} <br> ${arr[i].paymentMethod}`;
  }
  id += 1;
}
