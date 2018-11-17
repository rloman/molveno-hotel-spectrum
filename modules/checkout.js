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

function output() {
  document.getElementById('output').innerHTML = "";
  for (let i = 0; hotelRooms.length > i; i++) {
    let arrival = new Date(reservationJSON[i][4]);
    let departure = new Date(reservationJSON[i][5]);
    if (today.getTime() >= arrival.getTime() && today.getTime() <= departure.getTime()) {
      let div = document.createElement('div');
      document.getElementById('output').appendChild(div);
      div.setAttribute("id", `guest${i}`);
      div.setAttribute("class", `guest`);
      document.getElementById(`guest${i}`).innerHTML += `<b>Name: </b>${reservationJSON[i][6]}<br />`;
      document.getElementById(`guest${i}`).innerHTML += "<b>Arrival Date: </b>" + dateF(arrival) + "<br />";
      document.getElementById(`guest${i}`).innerHTML += "<b>Departure Date: </b>" + dateF(departure) + "<br />";
      document.getElementById(`guest${i}`).innerHTML += "<b>" + totalDays(i) + " days</b><br />";
      if (reservationJSON[i][12]) {
        document.getElementById(`guest${i}`).innerHTML += "<b>Accessories: </b>";
        for (let j = 0; reservationJSON[i][12].length > j; j++) {
          document.getElementById(`guest${i}`).innerHTML += `${reservationJSON[i][12][j]} `;
        }
        document.getElementById(`guest${i}`).innerHTML += `<br />`;
      }
      if (!reservationJSON[i][11]) {
        document.getElementById(`guest${i}`).innerHTML += `<b>Warning: ${reservationJSON[i][6]} hasn't paid yet!</b> <button onclick='paid(${i});'>Paid</button><br />`;
      } else {
        if (reservationJSON[i][10]) {
          document.getElementById(`guest${i}`).innerHTML += `<b>Checked In!</b> <button onclick='checkOut(${i});'>Check Out</button><br />`;
        } else {
          document.getElementById(`guest${i}`).innerHTML += "<b>Not checked in!</b><br /><br />";
        }
      }
      document.getElementById(`guest${i}`).innerHTML += `<button onclick='invoice(${i});'>Invoice</button><br /><br />`;
    }
  }
  filter();
}

function checkOut(c) {
  for (let i = 0; hotelRooms.length > i; i++) {
    if (!reservationJSON[c][11]) {
      document.getElementById('error').innerHTML = "<b>Warning: " + reservationJSON[c][6] + " hasn't paid yet!</b><br />";
      return;
    }
    if (i === c) {
      document.getElementById('error').innerHTML = "<b>" + reservationJSON[c][6] + "</b> has been Checked Out successfully.<br />";
      reservationJSON[c][10] = false;
    }
  }
  output();
  filter();
}

function totalDays(i) {
  let arrival = new Date(reservationJSON[i][4]);
  let departure = new Date(reservationJSON[i][5]);
  return ((((departure.getTime() - arrival.getTime()) / 1000) / 60) / 60) / 24;
}

function paid(i) {
  reservationJSON[i][11] = true;
  output();
  filter();
}

function invoice(i) {
  let arrival = new Date(reservationJSON[i][4]);
  let departure = new Date(reservationJSON[i][5]);
  let accessoriesTotal = 0;
  let invoice = document.getElementById("invoice");
  let table = document.createElement("table");
  invoice.innerHTML = `<h2>Invoice of ${reservationJSON[i][6]}</h2>`;
  invoice.innerHTML += `<button class="closeBtn" onclick="document.getElementById('invoice').setAttribute('style', 'display: none');">X</button>`;
  invoice.innerHTML += `<b>Date:</b> ${dateF(now)}<br /><br />`;
  invoice.setAttribute("style", "display: block");
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
  if (input) {
    document.getElementById("filterLabel").setAttribute("style", "display: block");
  } else {
    document.getElementById("filterLabel").setAttribute("style", "display: none");
  }
  let filter = new RegExp(input, 'i');
  for (let i = 0; hotelRooms.length > i; i++) {
    if (document.getElementById(`guest${i}`)) {
      if (!filter.test(reservationJSON[i][6])) {
        document.getElementById(`guest${i}`).setAttribute("style", "display: none");
      } else {
        document.getElementById(`guest${i}`).setAttribute("style", "display: block");
      }
    }
  }
}
