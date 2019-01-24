"use strict";
//Function to make the Labels show when something is entered in any input field.
//Use oninput="labelsF('<name>');" to call the function. Replace <name> with the ID of the input field.
function labelsF(idName) {
  let input = document.getElementById(`${idName}`).value;
  if (input) {
    document.getElementById(`${idName}Label`).setAttribute("style", "display: block");
  } else {
    document.getElementById(`${idName}Label`).setAttribute("style", "display: none");
  }
}

//Function to cancel any input. It will clear the fields and reload the page.
function cancel() {
  location.reload(true);
}

//Function to force any Date input field to not allow selection earlier than today.
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

function reservationsF(range) {
  
}
