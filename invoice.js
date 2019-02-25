"use strict";
const apiURL = "http://api.test.hotelmolveno.carpago.nl/api";
// const apiURL = "http://localhost:8081/api";
// full URL: http://api.test.hotelmolveno.carpago.nl/api/reservationjoinguestonid/1
// Joins on reservation ID
function invoice(reservationID) {
  $.ajax({
    url: `${apiURL}/reservationjoinguestonid/${reservationID}`,
    type: "get",
    dataType: "json",
    success: function(reservationData) {
      let arrival = moment(reservationData.arrivalDate).format('DD-MM-YYYY');
      let departure = moment(reservationData.departureDate).format('DD-MM-YYYY');
      let total = totalDays(reservationData.arrivalDate, reservationData.departureDate);
      console.log(reservationData.numberofGuests);
      let vat = reservationData.numberofGuests * 2 * total; // VAT is €2 per guest per night stayed at the hotel
      let totalPrice = reservationData.roomPrice * total + vat;
      $("#invoiceModal").html(`
        <div class="modal-content">
        <div class="modal-header">
        <h2>Invoice of ${reservationData.firstName} ${reservationData.lastName}</h2>
        </div>
        <div class="modal-body">
        <div class="row">
        <div class="col">
        <b>Stayed in room:</b> ${reservationData.roomNumber} (${reservationData.roomType})
        </div>
        </div>
        <div class="row">
        <div class="col">
        <b>Arrival date:</b> ${arrival}
        </div>
        <div class="col">
        <b>Departure date:</b> ${departure}
        </div>
        </div>
        <br />
        <div class="row">
        <div class="col">
        <b>Total days:</b> ${total} (€ ${reservationData.roomPrice},- per day)
        </div>
        <div class="col">
        <b>Room cost:</b> € ${total * reservationData.roomPrice},-
        <br>
        <b>Value-added Tax:</b> € ${vat},-
        </div>
        </div>
        <br />
        <div class="row">
        <div class="col">
        </div>
        <div class="col"><b>Total:</b><b> <u>€ ${totalPrice},-</u></b></div>
        </div>
        `);
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
