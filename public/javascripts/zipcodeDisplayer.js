"use strict";

$(document).ready(function() {
  console.log("ready working");
  $(document.body).on("keyup", function(event) {
    let keyPressed = event.key;
    let digitRegEx = /\d/;
    if (keyPressed == "Backspace") {//delete key
      if (inputArray.length > 0) {
        inputArray.pop();//pop from array
        printArray();
      }
    } else if (digitRegEx.test(keyPressed)) { //match to regex expression
        if (inputArray.length < 5) {
          inputArray.push(keyPressed);
          printArray();
        } else {
          console.log("Max length");
        }
    }
  });
});


let inputArray = [];


function printArray() {
  console.log(inputArray);
}