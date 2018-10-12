"use strict";
let mainDiv = document.getElementById("mainDiv");
let regMail = /^[a-z]{3,15}@[a-z]{2,10}\.[a-z]{2,3}$/;
let name = [];
function guestInfo(value) {
  let input = document.getElementById(value).value;
  if (value === "guestName") {
    if (input) {
      name.push(new guestName(input));
      document.getElementById("output").innerHTML = input;
      console.log(name);
    }
  }
  if (value === "address") {
    document.getElementById("output").innerHTML += input;
  }
  if (value === "postalCode") {
    document.getElementById("output").innerHTML += input;
  }
  if (value === "homeTown") {
    document.getElementById("output").innerHTML += input;
  }
  if (value === "country") {
    document.getElementById("output").innerHTML += input;
  }
  if (value === "eMail") {
    if (!regMail.test(input)) {
      document.getElementById("invalid email").innerHTML = "Not a valid E-mail address!";
    } else {
      document.getElementById("invalid email").innerHTML = "";
    }
  }
  if (value === "phone") {
    document.getElementById("output").innerHTML += input;
  }
  if (value === "mobile") {
    document.getElementById("output").innerHTML += input;
  }
  if (value === "guestID") {
    document.getElementById("output").innerHTML += input;
  }
}
function calendar() {
  let today = new Date();
  let calDiv = document.getElementById("calendar");
  let months = ["January", "Februari", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  calDiv.innerHTML = "<select id='year'>\
    <option value='" + today.getFullYear() + "' selected>" + today.getFullYear() + "</option>\
    <option value='" + (today.getFullYear() + 1) + "' onclick=''>" + (today.getFullYear() + 1) + "</option>\
    <option value='" + (today.getFullYear() + 2) + "' onclick=''>" + (today.getFullYear() + 2) + "</option>\
    <option value='" + (today.getFullYear() + 3) + "' onclick=''>" + (today.getFullYear() + 3) + "</option>\
    <option value='" + (today.getFullYear() + 4) + "' onclick=''>" + (today.getFullYear() + 4) + "</option>\
    <option value='" + (today.getFullYear() + 5) + "' onclick=''>" + (today.getFullYear() + 5) + "</option>\
    </select>";
  calDiv.innerHTML += "<select id='month'>\
  <option value='" + months[today.getMonth()] + "' onclick=''>" + months[today.getMonth()] + "</option>\
  <option value='" + months[(today.getMonth() + 1) % 12] + "' onclick=''>" + months[(today.getMonth() + 1) % 12] + "</option>\
  <option value='" + months[(today.getMonth() + 2) % 12] + "' onclick=''>" + months[(today.getMonth() + 2) % 12] + "</option>\
  <option value='" + months[(today.getMonth() + 3) % 12] + "' onclick=''>" + months[(today.getMonth() + 3) % 12] + "</option>\
  <option value='" + months[(today.getMonth() + 4) % 12] + "' onclick=''>" + months[(today.getMonth() + 4) % 12] + "</option>\
  <option value='" + months[(today.getMonth() + 5) % 12] + "' onclick=''>" + months[(today.getMonth() + 5) % 12] + "</option>\
  <option value='" + months[(today.getMonth() + 6) % 12] + "' onclick=''>" + months[(today.getMonth() + 6) % 12] + "</option>\
  <option value='" + months[(today.getMonth() + 7) % 12] + "' onclick=''>" + months[(today.getMonth() + 7) % 12] + "</option>\
  <option value='" + months[(today.getMonth() + 8) % 12] + "' onclick=''>" + months[(today.getMonth() + 8) % 12] + "</option>\
  <option value='" + months[(today.getMonth() + 9) % 12] + "' onclick=''>" + months[(today.getMonth() + 9) % 12] + "</option>\
  <option value='" + months[(today.getMonth() + 10) % 12] + "' onclick=''>" + months[(today.getMonth() + 10) % 12] + "</option>\
  <option value='" + months[(today.getMonth() + 11) % 12] + "' onclick=''>" + months[(today.getMonth() + 11) % 12] + "</option>\
  </select>";
}
