"use strict";
let months = ["January", "Februari", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
let now = new Date();
let today = new Date(`${now.getFullYear()}-${(now.getMonth() + 1)}-${now.getDate()}`);
let reservationJSON = [];
for (let i = 0; hotelRooms.length > i; i++) {
  let entry = [];
  entry.push(hotelRooms[i].roomNumber, hotelRooms[i].roomType, hotelRooms[i].numberOfPeople, hotelRooms[i].status,
    hotelRooms[i].checkInDate, hotelRooms[i].checkOutDate, hotelRooms[i].guest, hotelRooms[i].email, hotelRooms[i].telephone,
    hotelRooms[i].country, hotelRooms[i].checkedIn, hotelRooms[i].hasPaid, hotelRooms[i].accessories);
  reservationJSON.push(entry);
}

function reservationsF() {
  let filterBtn = '<input id="filter" class="filter" type="text" maxlength="30" placeholder="Filter Name" oninput="filter()" />';
  for (let i = 0; i < buttons.length; i++) {
    let buttonC = buttons[i].toLowerCase();
    document.getElementById(`${buttonC}Nav`).className = document.getElementById(`${buttonC}Nav`).className.replace(" active", "");
  }
  document.getElementById('reservationsNav').className += " active";
  document.getElementById('content').innerHTML = "<div id='contentReservation'></div>";
  document.getElementById('contentReservation').innerHTML += '<h2>Reservations</h2>';
  document.getElementById('contentReservation').innerHTML += filterBtn;
  document.getElementById('contentReservation').innerHTML += "<div id='reservationsDiv'></div>";
  let tableHeaderRow = "<tr><th>Name</th><th>Arrival</th><th>Departure</th><th>Days</th><th>Accessories</th><th>Paid</th><th>Checked In</th></tr>";
  document.getElementById('reservationsDiv').innerHTML = `<table id='reservations'>${tableHeaderRow}</table>`;
  for (let i = 0; hotelRooms.length > i; i++) {
    let arrival = new Date(reservationJSON[i][4]);
    let departure = new Date(reservationJSON[i][5]);
    let reservations = document.getElementById('reservations');
    let accessories = "";
    let paid = "";
    let checkedIn = "";
    if (today.getTime() >= arrival.getTime() && today.getTime() <= departure.getTime()) {
      if (reservationJSON[i][12]) {
        let length = reservationJSON[i][12].length;
        for (let j = 0; reservationJSON[i][12].length > j; j++) {
          if ((length - 1) > j) {
            accessories += reservationJSON[i][12][j] + ", ";
          } else {
            accessories += reservationJSON[i][12][j];
          }
        }
      }
      if (!reservationJSON[i][11]) {
        paid = `<input type='checkbox' onclick='paid(${i}, "Yes");' />`;
        if (reservationJSON[i][10]) {
          checkedIn = `<input type='checkbox' onclick='checkOut(${i}, "Out");' checked />`;
        } else {
          checkedIn = `<input type='checkbox' onclick='checkOut(${i}, "In");' />`;
        }
      } else {
        paid = `<input type='checkbox' onclick='paid(${i}, "No");' checked />`;
        if (reservationJSON[i][10]) {
          checkedIn = `<input type='checkbox' onclick='checkOut(${i}, "Out");' checked />`;
        } else {
          checkedIn = `<input type='checkbox' onclick='checkOut(${i}, "In");' />`;
        }
      }
      reservations.innerHTML += `<tr id='reservation${i}'><td onclick='oneReservationF(${i});'>${reservationJSON[i][6]}</td><td onclick='oneReservationF(${i});'>${dateF(arrival)}</td><td onclick='oneReservationF(${i});'>${dateF(departure)}</td><td onclick='oneReservationF(${i});'>${totalDays(i)}</td><td onclick='oneReservationF(${i});'>${accessories}</td><td>${paid}</td><td>${checkedIn}</td></tr>`;
    }
  }
  filter();
}

function checkOut(c, d) {
  for (let i = 0; hotelRooms.length > i; i++) {
    if (i === c) {
      if (d === "In") {
        reservationJSON[c][10] = true;
        error("<b>" + reservationJSON[c][6] + "</b> has been Checked In successfully.");
      }
      if (d === "Out") {
        reservationJSON[c][10] = false;
        error("<b>" + reservationJSON[c][6] + "</b> has been Checked Out successfully.");
      }
    }
  }
  reservationsF();
  filter();
}

async function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function error(message) {
  document.getElementById('error').innerHTML = message;
  document.getElementById('error').setAttribute('style', 'background-color: rgb(140,140,220); padding: 5px;');
  await sleep(5000);
  document.getElementById('error').innerHTML = "";
  document.getElementById('error').setAttribute('style', 'background-color: transparent; padding: 0;');
}

function totalDays(i) {
  let arrival = new Date(reservationJSON[i][4]);
  let departure = new Date(reservationJSON[i][5]);
  return ((((departure.getTime() - arrival.getTime()) / 1000) / 60) / 60) / 24;
}

function paid(i, d) {
  if (d === "Yes") {
    reservationJSON[i][11] = true;
  }
  if (d === "No") {
    reservationJSON[i][11] = false;
  }
  reservationsF();
  filter();
}

function invoice(i) {
  let arrival = new Date(reservationJSON[i][4]);
  let departure = new Date(reservationJSON[i][5]);
  let accessoriesTotal = 0;
  let invoice = document.getElementById("overlay");
  let table = document.createElement("table");
  invoice.setAttribute("style", "display: block");
  invoice.innerHTML = `<h2>Invoice of ${reservationJSON[i][6]}</h2>`;
  invoice.innerHTML += `<button class="closeBtn" onclick="document.getElementById('overlay').setAttribute('style', 'display: none');">X</button>`;
  invoice.innerHTML += `<b>Date:</b> ${dateF(now)}<br /><br />`;
  invoice.appendChild(table);
  table.setAttribute("id", "invoiceTable");
  let invoiceTable = document.getElementById("invoiceTable");
  invoiceTable.innerHTML += `<tr><td><b>${reservationJSON[i][0]}</b></td><td>(${reservationJSON[i][1]})</td></tr>`;
  invoiceTable.innerHTML += `<tr><td><b>Arrival Date:</b></td><td>${dateF(arrival)}</td></tr>`;
  invoiceTable.innerHTML += `<tr><td><b>Departure Date:</b></td><td>${dateF(departure)}</td></tr>`;
  invoiceTable.innerHTML += `<tr><td><b>Number of People:</b></td><td>${reservationJSON[i][2]}</td></tr>`;
  invoiceTable.innerHTML += `<tr><th>Total Days</th><th>Price per Day</th><th>Total</th></tr>`;
  invoiceTable.innerHTML += `<tr><td>${totalDays(i)}</td><td>€ 20,-</td><td>€ ${(totalDays(i) * 20)},-</td></tr>`;
  if (reservationJSON[i][12]) {
    invoiceTable.innerHTML += `<tr><th>Accessory</th><th>Price per Day</th><th>Total</th></tr>`;
    for (let j = 0; reservationJSON[i][12].length > j; j++) {
      accessoriesTotal += totalDays(i) * 5;
      invoiceTable.innerHTML += `<tr><td>${reservationJSON[i][12][j]}</td><td>€ 5,-</td><td>€ ${(totalDays(i) * 5)},-</td></tr>`;
    }
  }
  invoiceTable.innerHTML += `<tr><th><b>Grand total:</b></th><th></th><th><b>€ ${((totalDays(i) * 20) + accessoriesTotal)},-</b></th></tr>`;
}

function dateF(date) {
  let d = date;
  function day_of_the_month(d) {
    return (d.getDate() < 10 ? '0' : '') + d.getDate();
  }
  function month_of_the_year(d) {
    return ((d.getMonth() + 1) < 10 ? '0' : '') + (d.getMonth() + 1);
  }
  return `${day_of_the_month(d)}-${month_of_the_year(d)}-${d.getFullYear()}`;
}

function filter() {
  let input = document.getElementById("filter").value;
  let filter = new RegExp(input, 'i');
  for (let i = 0; hotelRooms.length > i; i++) {
    if (document.getElementById(`reservation${i}`)) {
      if (!filter.test(reservationJSON[i][6])) {
        document.getElementById(`reservation${i}`).setAttribute("style", "display: none");
      } else {
        document.getElementById(`reservation${i}`).setAttribute("style", "display: table-row");
      }
    }
  }
}
