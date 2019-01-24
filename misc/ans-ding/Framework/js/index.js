"use strict";
let buttons = ["Overview", "Guests", "Reservations", "Invoices", "Rooms", "Accessories", "Employees"];
let phone = "";
let mobile = "";
let email = "";
let name = "";
let nameArray = []; //To use with Name Filter field

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
  let overviewTable = "<div class='overviewArrivals'><table id='overviewArrivals'><tr><th>Name</th><th>Phone</th><th>Mobile</th><th>E-mail</th></tr></table></div>";
  overviewDiv.innerHTML = "<button class='overview1'>Add new Guest</button>";
  overviewDiv.innerHTML += "<button class='overview2' onclick='newReservationF()'>Add new Reservation</button>";
  overviewDiv.innerHTML += "<button class='overview3'>Delete Reservation</button>";
  overviewDiv.innerHTML += `<div id='overview4' class='overview4'><h3 class='h3Overview4'>Expected Arrivals Today</h3>${filter}${overviewTable}</div>`;
  getReservations();
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
  let arrival = dateF(arrivalDate, "Dutch");
  let departure = dateF(departureDate, "Dutch");
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
  invoice.innerHTML += `<b>Date:</b> ${dateF(now, "Dutch")}<br /><br />`;
  invoice.innerHTML += `<b>Arrival Date:</b> ${arrival}<br />`;
  invoice.innerHTML += `<b>Departure Date:</b> ${departure}<br />`;
  invoice.innerHTML += `<b>${totalDays(num)} days € 60,- a day = € ${totalDays(num) * 60},-</b><br />`;
}
function newReservationF() {
  let overlay = document.getElementById('overlay');
  let guestBooking = [];
  let numOfBeds;
  let roomTypeSel;
  let roomExtrasSel = "";
  let startdate;
  let enddate;
  overlay.setAttribute('style', 'display: block;');
  overlay.innerHTML = `<button class="closeBtn" onclick="closeBtnF('overlay');">X</button>`;
  overlay.innerHTML += "<div id='newReservation'></div>";
  let newReservation = document.getElementById('newReservation');
  newReservation.innerHTML = "<div id='roomInfo' class='roomInfo'></div>";
  let roomInfo = document.getElementById('roomInfo');
  roomInfo.innerHTML += "<h2>New Reservation</h2>";
  roomInfo.innerHTML += '<label id="arrivalDateLabel" for="arrivalDate">Arrival Date: </label>';
  roomInfo.innerHTML += `<input id="arrivalDate" type="date" name="arrivalDate" oninput="labelsF('arrivalDateLabel');"></input>`;
  roomInfo.innerHTML += '<label id="departureDateLabel" for="departureDate">Departure Date: </label>';
  roomInfo.innerHTML += `<input id="departureDate" type="date" name="departureDate" oninput="labelsF('departureDateLabel');"></input>`;
  todayF();
  roomInfo.innerHTML += '<label id="numberOfPeople">Number of People: </label>';
  roomInfo.innerHTML += `<input id="beds1" type="radio" name="beds" value="1" checked> 1</input>`;
  roomInfo.innerHTML += `<input id="beds2" type="radio" name="beds" value="2"> 2</input>`;
  roomInfo.innerHTML += `<input id="beds3" type="radio" name="beds" value="3"> 3</input>`;
  roomInfo.innerHTML += `<input id="beds4" type="radio" name="beds" value="4"> 4</input>`;
}

function closeBtnF(divName) {
  document.getElementById(`${divName}`).setAttribute('style', 'display: none;')
  document.getElementById(`${divName}`).innerHTML = "";
}

function getReservations() {
  let xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      let data = JSON.parse(this.responseText);
      for (let i = 0; i < data.length; i++) {
        getGuest(data[i].guest_id, i);
      }
    }
  };
  xhttp.open("GET", `http://localhost:8081/api/reservations/${dateF(now, "American")}`);
  xhttp.setRequestHeader("Content-Type", "application/json");
  xhttp.send();
}

function getGuest(id, i) {
  let xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      let overviewArrivals = document.getElementById('overviewArrivals');
      let data = JSON.parse(this.responseText);
      name = `${data.firstName} ${data.lastName}`;
      if (data.phone != "") {
        phone = data.phone;
      } else {
        phone = "None";
      }
      if (data.mobile != "") {
        mobile = data.mobile;
      } else {
        mobile = "None";
      }
      if (data.email != "") {
        email = data.email;
      } else {
        email = "None";
      }
      if (data.phone === "" && data.email === "" && data.mobile === "") {
        phone = "<span style='color: red;'>No valid Contact Information!</span>";
        mobile = "<span style='color: red;'>No valid Contact Information!</span>";
        email = "<span style='color: red;'>No valid Contact Information!</span>";
      }
      overviewArrivals.innerHTML += `<tr id='reservation${i}' onclick='oneReservationF(${i})'><td>${name}</td><td>${phone}</td><td>${mobile}</td><td>${email}</td></tr>`;
      nameArray.push(name);
    }
  };
  xhttp.open("GET", `http://localhost:8081/api/guests/${id}`);
  xhttp.setRequestHeader("Content-Type", "application/json");
  xhttp.send();
}
