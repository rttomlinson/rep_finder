"use strict";

$(document).ready(function() {
  console.log("ready working");
  updateBoxes();
  $(document.body).on("keyup", function(event) {
    var keyPressed = event.key;
    var digitRegEx = /\d/;
    if (keyPressed == "Backspace") {//delete key
      if (inputArray.length > 0) {
        inputArray.pop();//pop from array
        printArray();
        updateBoxes();
      }
    } else if (digitRegEx.test(keyPressed)) { //match to regex expression
        if (inputArray.length < 5) {
          inputArray.push(keyPressed);
          printArray();
          updateBoxes();
        } else {
          console.log("Max length");
        }
    }
  });
  $("#find-reps").on("submit", function (event) {
    console.log("handler for submit called");
    if (inputArray.length == 5) {
      $("#zipcode").val(inputArray.join(""));
    } else {
      console.log("You might be missing part of the zipcode.");
      event.preventDefault();
    }
    
  });
});


var inputArray = [];


function printArray() {
  console.log(inputArray);
}


function updateBoxes() {
  $(".zipcode").each(function (index, element) {
    var zipChar = inputArray[index] ? inputArray[index] : "-";
    $(element).text(zipChar);
  });
  if (inputArray.length == 5) {
    $(".submit-wrapper").addClass("activate-button");
  } else {
    $(".submit-wrapper").removeClass("activate-button");
  }
}

function advanceMarker() {
    let $activeZip = $(".active-zip");
    let $nextZip = $activeZip.next();//remove active-marker, put marker on next sibling
    if ($nextZip) {//if active marker is last marker, do something special
        $activeZip.removeClass("active-zip");
        $nextZip.addClass("active-zip");
    }
}
function reverseMarker() {
    let $activeZip = $(".active-zip");
    let $nextZip = $activeZip.prev();//remove active-marker, put marker on prev sibling
    if ($nextZip) {//if active marker is first marker, do something special
        $activeZip.removeClass("active-zip");
        $nextZip.addClass("active-zip");
    }
}