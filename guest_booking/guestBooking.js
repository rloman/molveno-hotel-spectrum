"use strict";
let regMail = /^[a-z0-9]{3,15}@[a-z0-9]{2,10}\.[a-z]{2,3}$/;
let special = /[\^\\\/\<\>\{\}\?\[\]]/;
let guestBooking = [];
let guestName, address, postalCode, homeTown, country, eMail, phone, mobile, guestID, arrival, departure, ccNum, dcNum;
let numOfBeds;
let roomTypeSel;
let roomExtrasSel = "";
let paymentSel;
let now = new Date();
let today = new Date();
let startdate = new Date();
let enddate = new Date();
let year = today.getFullYear();
let month = today.getMonth();
let months = ["January", "Februari", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
let first, second;
let guestCount = 0;
let error = false;

function guestInfo(fieldName, placeHolder) {
  let input = document.getElementById(fieldName).value;
  if (input === "") {
    document.getElementById(`${fieldName}Error`).innerHTML = `Please enter your ${placeHolder}.`;
  } else {
    document.getElementById(`${fieldName}Error`).innerHTML = "";
  }
  if (fieldName === "eMail") {
    if (input) {
      if (!regMail.test(input)) {
        document.getElementById("eMailError").innerHTML = "Not a valid E-mail address!";
      } else {
        eMail = document.getElementById(fieldName).value;
        document.getElementById("eMailError").innerHTML = "";
      }
    }
  }
  if (input) {
    if (!special.test(input)) {
      document.getElementById(`${fieldName}Error`).innerHTML = "";
    } else {
      document.getElementById(`${fieldName}Error`).innerHTML = "No special characters allowed (^ \\ / < > { } ? [ ]). Field Emptied.";
      document.getElementById(fieldName).value = "";
    }
  }
}

function calendar(startend) {
  let calDiv = "";
  if (startend === "start") {
    calDiv = document.getElementById("start");
  } else {
    calDiv = document.getElementById("end");
  }

  calDiv.innerHTML += `<select id='${startend}year'></select><select id='${startend}month'></select><br /><div id='${startend}monthDiv' class='month'></div>`;
  let monthSelect = "";
  let yearSelect = "";
  for (let i = 0; i < 10; i++) {
    yearSelect += `<option value='${(now.getFullYear() + i)}' onclick='monthF(${(now.getFullYear() + i)}, "${startend}")'>${(now.getFullYear() + i)}</option>`;
  }
  for (let i = 0; i < 12; i++) {
    if ((i + month) < 12) {
      monthSelect += `<option value='${months[(month + i)]}' onclick='days(${(month + i)}, ${now.getFullYear()}, "${startend}")'>${months[(month + i)]}</option>`;
    }
  }
  document.getElementById(`${startend}month`).innerHTML = monthSelect;
  document.getElementById(`${startend}year`).innerHTML = yearSelect;

  let count = 0;
  let monthDiv = document.getElementById(`${startend}monthDiv`);
  monthDiv.innerHTML = "";

  for (let i = 1; i < 32; i++) {
    count++;
    if (now.getDate() === today.getDate() && now.getMonth() === today.getMonth() && now.getFullYear() === today.getFullYear()) {
      monthDiv.innerHTML += `<div onclick='select(${today.getDate()}, ${month}, ${year}, "${startend}")' class='now' id='${startend}days${today.getDate()}'>${today.getDate()}</div>`;
    } else {
      monthDiv.innerHTML += `<div onclick='select(${today.getDate()}, ${month}, ${year}, "${startend}")' class='days' id='${startend}days${today.getDate()}'>${today.getDate()}</div>`;
      if (count === 7) {
        monthDiv.innerHTML += "<br />";
        count = 0;
      }
    }
    today.setDate(today.getDate() + 1);
    if (today.getMonth() != month) {
      break;
    }
  }
  today.setDate(now.getDate());
  today.setMonth(now.getMonth());
  today.setFullYear(now.getFullYear());
}

function monthF(y, z) {
  if (y !== now.getFullYear()) {
    month = today.getMonth(today.setMonth(0));
    let monthSelect = "";
    for (let i = 0; i < 12; i++) {
      monthSelect += `<option value='${months[i]}' onclick='days(${(month + i)}, ${y}, "${z}")'>${months[i]}</option>`;
    }
    document.getElementById(`${z}month`).innerHTML = monthSelect;
    days(month, y, z);
  } else {
    month = today.getMonth(today.setMonth(now.getMonth()));
    let monthSelect = "";
    for (let i = 0; i < 12; i++) {
      if ((i + month) < 12) {
        monthSelect += `<option value='${months[(month + i)]}' onclick='days(${(month + i)}, ${y}, "${z}")'>${months[(month + i)]}</option>`;
      }
    }
    document.getElementById(`${z}month`).innerHTML = monthSelect;
    days(month, y, z);
  }
}

function days(m, y, z) {
  let count = 0;
  let monthDiv = document.getElementById(`${z}monthDiv`);
  year = today.getFullYear(today.setFullYear(y));
  month = today.getMonth(today.setMonth(m));
  monthDiv.innerHTML = "";

  if (y === now.getFullYear() && m === now.getMonth()) {
    today.setDate(now.getDate());
  } else {
    today.setDate(1);
  }

  for (let i = 0; i < 31; i++) {
    count++;
    if (now.getDate() === today.getDate() && now.getMonth() === today.getMonth() && now.getFullYear() === today.getFullYear()) {
      monthDiv.innerHTML += `<div onclick='select(${today.getDate()}, ${month}, ${year}, "${z}")' class='now' id='${z}days${today.getDate()}'>${today.getDate()}</div>`;
    } else {
      monthDiv.innerHTML += `<div onclick='select(${today.getDate()}, ${month}, ${year}, "${z}")' class='days' id='${z}days${today.getDate()}'>${today.getDate()}</div>`;
      if (count === 7) {
        monthDiv.innerHTML += "<br />";
        count = 0;
      }
    }
    today.setDate(today.getDate() + 1);
    if (today.getMonth() != month) {
      break;
    }
  }
}

function select(d, m, y, z) {
  document.getElementById(`${z}days${d}`).setAttribute("style","background-color: #ff4444");
  if (z === "start") {
    if (first === undefined) {
      first = `${z}days${d}`;
      startdate.setDate(d);
      startdate.setMonth(m);
      startdate.setFullYear(y);
    } else {
      document.getElementById(first).setAttribute("style","");
      first = `${z}days${d}`;
      startdate.setDate(d);
      startdate.setMonth(m);
      startdate.setFullYear(y);
    }
  } else {
    if (second === undefined) {
      second = `${z}days${d}`;
      enddate.setDate(d);
      enddate.setMonth(m);
      enddate.setFullYear(y);
    } else {
      document.getElementById(second).setAttribute("style","");
      second = `${z}days${d}`;
      enddate.setDate(d);
      enddate.setMonth(m);
      enddate.setFullYear(y);
    }
  }
  arrival = startdate.getDate() + " " + startdate.getMonth() + " " + startdate.getFullYear();
  departure = enddate.getDate() + " " + enddate.getMonth() + " " + enddate.getFullYear();
}

function next() {
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

function paymentField() {
  let pay = document.querySelector("div.guestInfo input[name='payment']:checked").value;
  if (pay === "Creditcard") {
    ccNum = "";
    dcNum = undefined;
    document.getElementById("paymentDiv").innerHTML = `<div id='ccNumError' class='error'></div><input id='ccNum' class='text' name='ccNum' maxlength='30' placeholder='Creditcard Number' required onblur='guestInfo("ccNum", "Creditcard Number");' />`;
  }
  if (pay === "Debitcard") {
    dcNum = "";
    ccNum = undefined;
    document.getElementById("paymentDiv").innerHTML = `<div id='dcNumError' class='error'></div><input id='dcNum' class='text' name='dcNum' maxlength='30' placeholder='Debitcard Number' required onblur='guestInfo("dcNum", "Debitcard Number");' />`;
  }
  if (pay === "Cash") {
    ccNum = undefined;
    dcNum = undefined;
    document.getElementById("paymentDiv").innerHTML = "";
  }
}

function submit() {
  guestCount++
  let guestDiv = document.querySelector(".guestInfo");
  let textFields = guestDiv.querySelectorAll("input[class='text']");
  for (let i = 0; textFields.length > i; i++) {
    guestBooking.push(textFields[i].value);
  }
  paymentSel = document.querySelector("div.guestInfo input[name='payment']:checked").value;
  guestName = document.querySelector("div.guestInfo input[name='guestName']").value;
  address = document.querySelector("div.guestInfo input[name='address']").value;
  postalCode = document.querySelector("div.guestInfo input[name='postalCode']").value;
  homeTown = document.querySelector("div.guestInfo input[name='country']").value;
  country = document.querySelector("div.guestInfo input[name='country']").value;
  eMail = document.querySelector("div.guestInfo input[name='eMail']").value;
  phone = document.querySelector("div.guestInfo input[name='phone']").value;
  mobile = document.querySelector("div.guestInfo input[name='mobile']").value;
  guestID = document.querySelector("div.guestInfo input[name='guestID']").value;
  arrival = startdate.getDate() + " - " + startdate.getMonth() + " - " + startdate.getFullYear();
  departure = enddate.getDate() + " - " + enddate.getMonth() + " - " + enddate.getFullYear();
  let newGuest = new guest(guestCount, guestName, address, postalCode, homeTown, country, eMail, phone, mobile, guestID, paymentSel);
  let output = document.getElementById("output");
  output.innerHTML += "Number of People: " + numOfBeds + "<br />Roomtype: " + roomTypeSel + "<br />Selected Extra's: " + roomExtrasSel;
  output.innerHTML += "<br />Name: " + guestName + "<br />Address: " + address + "<br />Postal Code: " + postalCode + "<br />Home Town: " + homeTown + "<br />Country: " + country + "<br />E-mail: " + eMail + "<br />Phone: " + phone + "<br />Cell Phone: " + mobile + "<br />Identification Document: " + guestID + "<br />Payment Method: " + paymentSel;
  if (ccNum != undefined) {
    ccNum = document.querySelector("div.guestInfo input[name='ccNum']").value;
    output.innerHTML += "<br />Creditcard Number: " + ccNum;
  }
  if (dcNum != undefined) {
    dcNum = document.querySelector("div.guestInfo input[name='dcNum']").value;
    output.innerHTML += "<br />Debitcard Number: " + dcNum;
  }
}

function cancel() {
  window.location.reload();
}
