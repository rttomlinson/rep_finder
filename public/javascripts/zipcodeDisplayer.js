"use strict";

$(document).ready(function() {
  console.log("ready working");
  //Initialize Boxes
  let boxes = new MakeBoxes(5);
  // will find the .zipcode-display div and create 5 .zipcode divs inside and set the first one to active
    //use make boxes function to get a function that references the inputArray and has access to helper methods of makeBoxes

  $(document.body).on("keyup", boxes.zipcodeUpdater())
  $("#find-reps").on("submit", boxes.submitChecker());
});







function MakeBoxes(num) {
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
    let inputArray = [];
    function updateBoxes() { //Needs to be in reference to the boxes instance. Currently in reference to the Div Element
          $(".zipcode").each(function (index, element) {
            var zipChar = this.inputArray[index] ? this.inputArray[index] : "-";
            $(element).text(zipChar);
          });
          if (this.inputArray.length == 5) {
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
    function submitChecker() {
        let that = this;
        return function (event) {
            if (that.inputArray.length == 5) {
              $("#zipcode").val(that.inputArray.join(""));
            } else {
              console.log("You might be missing part of the zipcode.");
              event.preventDefault();
            }
        }
    }
    function zipcodeUpdater() {
        let that = this;
        return function (event) {
            var keyPressed = event.key;
            var digitRegEx = /\d/;
            if (keyPressed == "Backspace") {//delete key
              if (that.inputArray.length > 0) {
                that.inputArray.pop();//pop from array
                that.reverseMarker();
                that.updateBoxes.bind(that)();
              }
            } else if (digitRegEx.test(keyPressed)) { //match to regex expression
                if (that.inputArray.length < 5) {
                  that.inputArray.push(keyPressed);
                  that.advanceMarker();
                  that.updateBoxes().bind(that)();
                } else {
                  console.log("Max length");
                }
            }
        }
    }
    return {}; //object with references to these functions
};