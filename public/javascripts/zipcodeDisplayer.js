"use strict";

$(document).ready(function() {
  console.log("ready working");
  //Initialize Boxes
  makeBoxes.init(5);// will find the .zipcode-display div and create 5 .zipcode divs inside and set the first one to active
  $(document.body).on("keyup", zipcodeUpdater)
  $("#find-reps").on("submit", submitChecker);
});


var inputArray = [];

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
    if ($nextZip.length) {//if active marker is last marker, do something special
        $activeZip.removeClass("active-zip");
        $nextZip.addClass("active-zip");
    }
}
function reverseMarker() {
    let $activeZip = $(".active-zip");
    let $prevZip = $activeZip.prev();//remove active-marker, put marker on prev sibling
    if ($prevZip.length) {//if active marker is first marker, do something special
        $activeZip.removeClass("active-zip");
        $prevZip.addClass("active-zip");
    }
}



let makeBoxes = {
    "init" : function (num) {
        let $zipDisplay = $(".zipcode-display");//holder for the zipcode boxes
        for (let i = 0; i < num; i++) {
            let $zipDiv = $("<div>")//create a new .zipcode div
                .addClass("zipcode flex align-center justify-center"); //Add necessary classes
            if (i == 0) {
                $zipDiv.addClass("active-zip");
            }//If it's the first one, add active-zip class
            $zipDiv.text("-");//Start them all with text of "-"
            $zipDiv.appendTo($zipDisplay);//append it to zipcode-display
        }
    }
}

function submitChecker(event) {
    if (inputArray.length == 5) {
      $("#zipcode").val(inputArray.join(""));
    } else {
      console.log("You might be missing part of the zipcode.");
      event.preventDefault();
    }
}

function zipcodeUpdater(event) {
    var keyPressed = event.key;
    var digitRegEx = /\d/;
    if (keyPressed == "Backspace") {//delete key
      if (inputArray.length > 0) {
        inputArray.pop();//pop from array
        reverseMarker();
        updateBoxes();
      }
    } else if (digitRegEx.test(keyPressed)) { //match to regex expression
        if (inputArray.length < 5) {
          inputArray.push(keyPressed);
          advanceMarker();
          updateBoxes();
        } else {
          console.log("Max length");
        }
    }
}