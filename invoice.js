"use strict";
const apiURL = "http://api.test.hotelmolveno.carpago.nl/api";
// full URL: http://api.test.hotelmolveno.carpago.nl/api/reservationjoinguestonid/1
// Joins on reservation ID
function invoice(reservationID) {
  $.ajax({
    url: `${apiURL}/reservationjoinguestonid/${reservationID}`,
    type: "get",
    dataType: "json",
    success: function(reservationData) {
      let arrival = new Date(reservationData[0].arrivalDate);
      let departure = new Date(reservationData[0].departureDate);
      let total = totalDays(reservationData[0].arrivalDate, reservationData[0].departureDate);
      let totalPrice = reservationData[0].roomPrice * total;
      $("#invoiceModal").html(`<div class="modal-content"><div class="modal-header">
        <h2>Invoice of ${reservationData[0].firstName} ${reservationData[0].lastName}.</h2></div>
        <div class="modal-body"><div class="row"><div class="col"><b>Stayed in room:</b> ${reservationData[0].roomNumber} (${reservationData[0].roomType})</div></div>
        <div class="row"><div class="col"><b>Arrival date:</b> ${arrival.getDate()}-${arrival.getMonth()+1}-${arrival.getFullYear()}</div>
        <div class="col"><b>Departure date:</b> ${departure.getDate()}-${departure.getMonth()+1}-${departure.getFullYear()}</div></div><br />
        <div class="row"><div class="col"><b>Total days:</b> ${total} (€ ${reservationData[0].roomPrice},- per day)</div><div class="col">€ ${totalPrice},-</div></div><br />
        <div id='accessories'><b>Accessories</b></div><br /><div class="row" id="totalPrice"></div></div></div>`);
        $.ajax({
          url: `${apiURL}/accessoriesofreservation/${reservationID}`,
          type: "get",
          dataType: "json",
          success: function(accessoryData) {
            let totalAcc = 0;
            for (let i = 0; accessoryData.length > i; i++) {
              $("#accessories").append(`<div class="row"><div class="col">${accessoryData[i].name} (€ ${accessoryData[i].price} per day)</div><div class="col">€ ${accessoryData[i].price * total},-</div></div>`);
              totalAcc += (accessoryData[i].price * total);
            }
            $("#accessories").append(`<div class="row"><div class="col"><b>Total Price Accessories:</b></div><div class="col">€ ${totalAcc},-</div></div>`);
            $("#totalPrice").html(`<div class="col"><b>Total:</b></div><div class="col"><b><u>€ ${totalPrice + totalAcc},-</u></b></div>`);
            return;
          },
          error: function(error) {
            console.log(error);
          }
        });
      return;
    },
    error: function(error) {
      console.log(error);
    }
  });
}

function totalDays(ar, dep) {
  let arrival = new Date(ar);
  let departure = new Date(dep);
  return ((((departure.getTime() - arrival.getTime()) / 1000) / 60) / 60) / 24;
}

invoice(2);
