"use strict";
let regMail = /^[a-z0-9]{3,15}@[a-z0-9]{2,10}\.[a-z]{2,3}$/;
let phoneNum = /^[0-9\(\)\-\+]*$/;
let special = /[\^\\\/\<\>\{\}\?\[\]]/;
let guestBooking = [];
let guestName, address, postalCode, homeTown, country, eMail, phone, mobile;
let numOfBeds;
let roomTypeSel;
let roomExtrasSel = "";
let now = new Date();
let today = new Date();
let startdate;
let enddate;

function guestInfo(fieldName, placeHolder) {
  let input = document.getElementById(fieldName).value;
  if (input === "") {
    document.getElementById(`${fieldName}Error`).innerHTML = "";
    document.getElementById(`${fieldName}Label`).setAttribute("style", "display: none;");
  } else {
    document.getElementById(`${fieldName}Error`).innerHTML = "";
    document.getElementById(`${fieldName}Label`).setAttribute("style", "display: block;");
  }
  if (input) {
    if (!special.test(input)) {
      document.getElementById(`${fieldName}Error`).innerHTML = "";
      if (fieldName === "eMail") {
        if (!regMail.test(input)) {
          document.getElementById("eMailError").innerHTML = "Not a valid E-mail address!";
        } else {
          eMail = document.getElementById(fieldName).value;
          document.getElementById("eMailError").innerHTML = "";
        }
      }
      if (fieldName === "phone" || fieldName === "mobile") {
        if (!phoneNum.test(input)) {
          document.getElementById(`${fieldName}Error`).innerHTML = "Not a valid phone number!";
        } else {
          document.getElementById(`${fieldName}Error`).innerHTML = "";
        }
      }
    } else {
      document.getElementById(`${fieldName}Error`).innerHTML = "No special characters allowed (^ \\ / < > { } ? [ ]). Field Emptied.";
      document.getElementById(fieldName).value = "";
    }
  }
}

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

function next() {
  startdate = document.querySelector('input[name="arrivalDate"]').value;
  enddate = document.querySelector('input[name="departureDate"]').value;
  if (startdate >= enddate) {
    document.getElementById("error").innerHTML = "You can't have an arrival date later or equal to the departure date.";
  } else {
    document.getElementById("error").innerHTML = "";
    document.getElementById("roomInfo").setAttribute("style", "display: none");
    document.getElementById("guestInfo").setAttribute("style", "display: block");
  }
  numOfBeds = document.querySelector("div.bedsFrame input[name='beds']:checked").value;
  roomTypeSel = document.querySelector("div.roomFrame input[name='roomType']:checked").value;
  let roomExtraList = document.querySelectorAll("div.roomExtras input[name='roomExtras']:checked");
  for (let i = 0; i < roomExtraList.length; i++) {
    roomExtrasSel += roomExtraList[i].value + " ";
  }
}

function back() {
  document.getElementById("roomInfo").setAttribute("style", "display: block");
  document.getElementById("guestInfo").setAttribute("style", "display: none");
}

function submit() {
  let guestDiv = document.querySelector(".guestInfo");
  let textFields = guestDiv.querySelectorAll("input[class='text']");
  for (let i = 0; textFields.length > i; i++) {
    guestBooking.push(textFields[i].value);
  }
  guestName = document.querySelector("div.guestInfo input[name='guestName']").value;
  address = document.querySelector("div.guestInfo input[name='address']").value;
  postalCode = document.querySelector("div.guestInfo input[name='postalCode']").value;
  homeTown = document.querySelector("div.guestInfo input[name='homeTown']").value;
  country = document.querySelector("div.guestInfo input[name='country']").value;
  eMail = document.querySelector("div.guestInfo input[name='eMail']").value;
  phone = document.querySelector("div.guestInfo input[name='phone']").value;
  mobile = document.querySelector("div.guestInfo input[name='mobile']").value;
  let output = document.getElementById("output");
  output.innerHTML += "Number of People: " + numOfBeds + "<br />Roomtype: " + roomTypeSel + "<br />Selected Extra's: " + roomExtrasSel;
  output.innerHTML += "<br />Name: " + guestName + "<br />Address: " + address + "<br />Postal Code: " + postalCode + "<br />Home Town: " + homeTown + "<br />Country: " + country + "<br />E-mail: " + eMail + "<br />Phone: " + phone + "<br />Cell Phone: " + mobile;
  output.innerHTML += "<br />Days: " + totalDays() + "<br />Checkin: " + startdate + "<br />Checkout: " + enddate;
}

function cancel() {
  location.reload(true);
}

function totalDays() {
  let arrival = new Date(startdate);
  let departure = new Date(enddate);
  return ((((departure.getTime() - arrival.getTime()) / 1000) / 60) / 60) / 24;
}
