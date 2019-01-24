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
