"use strict";
let arr = [];
let id = 1;

function GuestData(){
  // de value's van de input fields
  document.getElementById('arrayOfGuest').innerHTML = "";
  let guestName = document.getElementById("guestNameId").value;
  let address = document.getElementById("addressId").value;
  let homeTown = document.getElementById("homeTownId").value;
  let postalCode = document.getElementById("postalCodeId").value;
  let telephonenumber = document.getElementById("telephonenumber").value;
  let emailaddress = document.getElementById("emailaddress").value;
  let passportnumber = document.getElementById("passportnumber").value;
  let paymentMethod = document.getElementById("paymentMethodId").value;
  let guest = new Guest(id, guestName, address, homeTown, postalCode,
    telephonenumber, emailaddress, passportnumber, paymentMethod);
  arr.push(guest);
  console.log(arr);
  document.getElementById('arrayOfGuest').innerHTML = `Name: ${guestName} <br> Address: ${address} <br>
  Home Town: ${homeTown} <br> Postal Code: ${postalCode} <br> Telephone Number: ${telephonenumber} <br>
  E-mail Address: ${emailaddress} <br> Passport Number: ${passportnumber} <br> Payment Method: ${paymentMethod}`;
  id += 1;
}
