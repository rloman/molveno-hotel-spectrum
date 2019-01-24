"use strict";
let buttons = ["Overview", "Guests", "Reservations", "Invoices", "Rooms", "Accessories", "Employees"];
let phone = "";
let email = "";

function loginCheck() {
  let employeeName = document.getElementById('employeeName').value;
  let employeePassword = document.getElementById('employeePassword').value;
  console.log("Temporary output: " + employeeName + " and " + employeePassword + "! (This won't be empty!)");
  mainPage();
}

function mainPage() {
  let mainDiv = document.getElementById('mainDiv');
  mainDiv.innerHTML = "<div id='frameworkDiv' class='frameworkDiv'></div>";
  let frameworkDiv = document.getElementById('frameworkDiv');
  frameworkDiv.innerHTML = "<img src='styling/Company_Logo.jpg' id='logoImg' /><div class='logoImg'>Via Bettega 12<br />38018 Molveno (Tn)<br />Italia</div>";
  frameworkDiv.innerHTML += "<h2 id='dashboardHeader'>Molveno Employee Dashboard</h2>";
  frameworkDiv.innerHTML += "<div id='nav' class='nav'></div>";
  let navDiv = document.getElementById('nav');
  for (let i = 0; i < buttons.length; i++) {
    let buttonF = buttons[i].toLowerCase();
     navDiv.innerHTML += `<button id='${buttons[i].toLowerCase()}Nav' class='buttonNav' onclick='${buttonF}F();'>${buttons[i]}</button>`;
  }
  frameworkDiv.innerHTML += "<div id='content' class='content'></div>";
  frameworkDiv.innerHTML += "<div id='error'></div>";
  overviewF();
}

function contactInfoF(num) {
  if (reservationJSON[num][8] != "") {
    phone = reservationJSON[num][8];
  } else {
    phone = "None";
  }
  if (reservationJSON[num][7] != "") {
    email = reservationJSON[num][7];
  } else {
    email = "None";
  }
  if (reservationJSON[num][7] === "" && reservationJSON[num][8] === "") {
    phone = "<span style='color: red;'>No valid Contact Information!</span>";
    email = "<span style='color: red;'>No valid Contact Information!</span>";
  }
}

function accessoriesListF(num) {
  let accessoriesTable = "";
  if (reservationJSON[num][12] != "") {
    accessoriesTable = "<table><tr><th>Name</th><th>Price</th></tr>";
    for (let i = 0; reservationJSON[num][12].length > i; i++) {
      accessoriesTable += `<tr><td>${reservationJSON[num][12][i]}</td><td>€ 10,-</td></tr>`;
    }
    accessoriesTable += "</table>";
  }
  return accessoriesTable;
}

function overviewF() {
  let content = document.getElementById('content');
  content.innerHTML = "";
  content.innerHTML = "<div id='overview'></div>";
  let overviewDiv = document.getElementById('overview');
  for (let i = 0; i < buttons.length; i++) {
    let buttonC = buttons[i].toLowerCase();
    document.getElementById(`${buttonC}Nav`).className = document.getElementById(`${buttonC}Nav`).className.replace(" active", "");
  }
  document.getElementById('overviewNav').className += " active";
  let filter = '<input id="filter" class="overviewFilter" type="text" maxlength="30" placeholder="Filter Name" oninput="filter()" />';
  overviewDiv.innerHTML = "<button class='overview1'>Add new Guest</button>";
  overviewDiv.innerHTML += "<button class='overview2'>Add new Reservation</button>";
  overviewDiv.innerHTML += "<button class='overview3'>Delete Reservation</button>";
  overviewDiv.innerHTML += `<div id='overview4' class='overview4'><h3 class='h3Overview4'>Expected Arrivals Today</h3>${filter}<div class='overviewArrivals'><table id='overviewArrivals'><tr><th>Name</th><th>Phone</th><th>E-mail</th></tr></table></div></div>`;
  let overviewArrivals = document.getElementById('overviewArrivals');
  for (let i = 0; hotelRooms.length > i; i++) {
    let arrival = new Date(reservationJSON[i][4]);
    if (today.getTime() === arrival.getTime()) {
      contactInfoF(i);
      overviewArrivals.innerHTML += `<tr id='reservation${i}' onclick='oneReservationF(${i})'><td>${reservationJSON[i][6]}</td><td>${phone}</td><td>${email}</td></tr>`;
    }
  }
}

function guestsF() {
  let content = document.getElementById('content');
  for (let i = 0; i < buttons.length; i++) {
    let buttonC = buttons[i].toLowerCase();
    document.getElementById(`${buttonC}Nav`).className = document.getElementById(`${buttonC}Nav`).className.replace(" active", "");
  }
  document.getElementById('guestsNav').className += " active";
  content.innerHTML = "<div></div>";
}

function invoicesF() {
  let content = document.getElementById('content');
  for (let i = 0; i < buttons.length; i++) {
    let buttonC = buttons[i].toLowerCase();
    document.getElementById(`${buttonC}Nav`).className = document.getElementById(`${buttonC}Nav`).className.replace(" active", "");
  }
  document.getElementById('invoicesNav').className += " active";
  content.innerHTML = "<div></div>";
}

function roomsF() {
  let content = document.getElementById('content');
  for (let i = 0; i < buttons.length; i++) {
    let buttonC = buttons[i].toLowerCase();
    document.getElementById(`${buttonC}Nav`).className = document.getElementById(`${buttonC}Nav`).className.replace(" active", "");
  }
  document.getElementById('roomsNav').className += " active";
  content.innerHTML = "<div></div>";
}

function accessoriesF() {
  let content = document.getElementById('content');
  for (let i = 0; i < buttons.length; i++) {
    let buttonC = buttons[i].toLowerCase();
    document.getElementById(`${buttonC}Nav`).className = document.getElementById(`${buttonC}Nav`).className.replace(" active", "");
  }
  document.getElementById('accessoriesNav').className += " active";
  content.innerHTML = "<div></div>";
}

function employeesF() {
  let content = document.getElementById('content');
  for (let i = 0; i < buttons.length; i++) {
    let buttonC = buttons[i].toLowerCase();
    document.getElementById(`${buttonC}Nav`).className = document.getElementById(`${buttonC}Nav`).className.replace(" active", "");
  }
  document.getElementById('employeesNav').className += " active";
  content.innerHTML = "<div></div>";
}

function oneReservationF(num) {
  document.getElementById('overlay').setAttribute('style', 'display: block;');
  document.getElementById('overlay').innerHTML = `<button class="closeBtn" onclick="closeBtnF('overlay');">X</button>`;
  document.getElementById('overlay').innerHTML += "<div id='oneReservation'></div>";
  contactInfoF(num);
  let arrivalDate = new Date(reservationJSON[num][4]);
  let departureDate = new Date(reservationJSON[num][5]);
  let arrival = dateF(arrivalDate);
  let departure = dateF(departureDate);
  let oneReservation = document.getElementById('oneReservation');
  oneReservation.innerHTML = `<h1 id='oneReservationHeader'>Booking Information of ${reservationJSON[num][6]}</h1>`;
  oneReservation.innerHTML += `<div id='guestInfo'></div>`;
  oneReservation.innerHTML += `<div id='roomInfo'></div>`;
  oneReservation.innerHTML += `<div id='oneInvoice'></div>`;
  let roomInfo = document.getElementById('roomInfo');
  let guestInfo = document.getElementById('guestInfo');
  let invoice = document.getElementById('oneInvoice');
  guestInfo.innerHTML = `<b>E-mail:</b> ${email}<br /><b>Phone:</b> ${phone}`;
  roomInfo.innerHTML = `<b>Room:</b> ${reservationJSON[num][0]} (${reservationJSON[num][1]})<br /><b>Number of People:</b> ${reservationJSON[num][2]}<br />`;
  roomInfo.innerHTML += `<b>Arrival Date:</b> ${arrival}<br /><b>Departure Date:</b> ${departure}<br /><b>Total Days:</b> ${totalDays(num)}<br /><br />`;
  roomInfo.innerHTML += accessoriesListF(num);
  invoice.innerHTML = `<h2>Invoice</h2>`;
  invoice.innerHTML += `<b>Date:</b> ${dateF(now)}<br /><br />`;
  invoice.innerHTML += `<b>Arrival Date:</b> ${arrival}<br />`;
  invoice.innerHTML += `<b>Departure Date:</b> ${departure}<br />`;
  invoice.innerHTML += `<b>${totalDays(num)} days € 60,- a day = € ${totalDays(num) * 60},-</b><br />`;
}

function closeBtnF(divName) {
  document.getElementById(`${divName}`).setAttribute('style', 'display: none;')
  document.getElementById(`${divName}`).innerHTML = "";
}
