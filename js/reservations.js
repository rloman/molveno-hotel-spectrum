"use strict";

let api = "http://localhost:8081/api/reservations";
moment().format();
$(document).ready(function() {
  initDataTable();
  getData(api);
});

function initDataTable() {
  let reservationTable = $('#reservationTable').DataTable({
    "processing": true,
    "responsive": true,
    "ajax": {
      "url": api,
      dataSrc: ''
    },
    "columns": [{
      "data": "id"
    }, {
      "data": "guest_id"
    }, {
      "data": "firstName"
    }, {
      "data": "lastName"
    }, {
      "data": "room_id"
    }, {
      "data": "arrivalDate"
    }, {
      "data": "departureDate"
    }, {
      "data": "numberOfGuests"
    }, {
      "data": "guestHasCheckedIn",
      "render": function(data, type, row) {
        return (data === 1) ? '<i class="fa fa-check" style="color:green"></i>' :
          '<i class="fa fa-times" style="color:red"></i>';
      }
    }, {
      "data": "guestHasPaid",
      "render": function(data, type, row) {
        return (data === 1) ? '<i class="fa fa-check" style="color:green"></i>' :
          '<i class="fa fa-times" style="color:red"></i>';
      }
    }],
    "columnDefs": [{
      "targets": [5, 6],
      render: function(data, type, row) {
        if (type === "sort" || type === "type") {
          return data;
        }
        return moment(data).format("DD-MM-YYYY");
      }
    }]
  });
}

function getData(api) {
  $.get(api, function(data) {
    $('#reservationTable').DataTable().ajax.reload();
  });
};

$("#addBtn").on('click', function() {
  document.getElementById("modal-title").innerHTML = "Create a reservation";
  document.getElementById("modalForm").reset();
  $('#modalId').hide();
  $('#labelId').hide();
  $("#btnsubmit").attr('onclick', 'submitNew("' + api + '");');
  $('#modal').modal('toggle');
});

function submitNew(api) {
  let formData = $("#modalForm").serializeArray().reduce(function(result, object) {
    result[object.name] = object.value;
    return result
  }, {});
  for (let key in formData) {
    if (formData[key] == "" || formData == null) delete formData[key];
  }
  console.log("Formdata =>");
  console.log(formData);
  $.post({
    url: api,
    data: JSON.stringify(formData),
    dataType: "json",
    contentType: "application/json",
    success: getData(api),
    error: function(error) {
      console.log(error);
    }
  });

  deselect();
  $('#modal').modal('toggle');
}

function deselect() {
  $('#reservationTable tr.selected').removeClass('selected');
  document.getElementById("modalForm").reset();
}

// This function gets called when we click on a table row
$('#reservationTable tbody').on('click', 'tr', function(e) {
  if ($(e.target).hasClass("sorting_1")) {
    // Do nothing
    return;
  }
  $('#modalId').show();
  $('#labelId').show();
  if ($(this).hasClass('selected')) {
    $(this).removeClass('selected');
  }
  deselect();
  $(this).addClass('selected');
  let table = $('#reservationTable').DataTable();
  let data = table.row(this).data();

  // this function fetches one record and fill the modal with the data and shows the modal for editing
  getSingleRecord(data.id, api);

  $('#modal').modal('toggle');
});

function getSingleRecord(id, api) {
  apiPath = String(api + "/" + id);
  console.log(`Logging URL ${apiPath}`);
  $.get(apiPath, function(data) {
    if (data) {
      fillUpdateDiv(data, api);
    }
  });
}

function fillUpdateDiv(record, api) {
  $("#btnsubmit").attr('onclick', 'submitEdit(' + record.id + ', "' + api + '");');
  document.getElementById("modal-title").innerHTML = "Edit a reservation";
  // this function fills the modal
  fillModal(record);
}

function fillModal(record) {
  $('#modalId').val(record.id);
  $("#modalGuestId").val(record.guest_id);
  $("#modalRoomId").val(record.room_id);
  $("#modalArrivalDate").val(record.arrivalDate);
  $("#modalDepartureDate").val(record.departureDate);

  let today = new Date();
  let dd = today.getDate();
  let mm = today.getMonth() + 1; //January is 0!
  let yyyy = today.getFullYear();
  if (dd < 10) {
    dd = '0' + dd
  }
  if (mm < 10) {
    mm = '0' + mm
  }

  today = yyyy + '-' + mm + '-' + dd;
  document.getElementById("modalArrivalDate").setAttribute("min", today);
  document.getElementById("modalDepartureDate").setAttribute("min", today);

  $("#confirmbutton").css('display', 'inline-block');
  console.log("Pre delete create button element: id:" + record.id);
  let elem = `<button type="button" class="btn btn-danger" onclick="submitDelete('${record.id}', '${api}');">Confirm delete</button>`;
  $('#confirmbutton').popover('dispose');
  $('#confirmbutton').popover({
    animation: true,
    content: elem,
    html: true,
    container: modal
  });
}

function submitEdit(id, api) {
  // shortcut for filling the formData as a JavaScript object with the fields in the form
  let formData = $("#modalForm").serializeArray().reduce(function(result, object) {
    result[object.name] = object.value;
    return result
  }, {});
  console.log("Formdata =>");
  console.log(formData);
  for (let key in formData) {
    if (formData[key] == "" || formData == null) delete formData[key];
  }

  console.log("Updating row with id:" + id)
  $.ajax({
    url: api + "/" + id,
    type: "put",
    data: JSON.stringify(formData),
    dataType: "json",
    contentType: "application/json",
    success: getData(api),
    error: function(error) {
      console.log(error);
    }
  });

  deselect();
  $('#modal').modal('toggle');
}

function submitDelete(id, api) {

  console.log(`Deleting row with id: ${id}`);
  $.ajax({
    url: api + "/" + id,
    type: "DELETE",
    dataType: 'json',
    contentType: 'application/json',
    success: getData(api),
    error: function(error) {
      console.log(error);
    }
  });

  $('#modal').modal('toggle');
}
