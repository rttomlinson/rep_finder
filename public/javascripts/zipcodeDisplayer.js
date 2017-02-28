"use strict";

$(document).ready(function() {
  console.log("ready working");
  //Initialize Boxes
  let boxes = new MakeBoxes(5);
  // will find the .zipcode-display div and create 5 .zipcode divs inside and set the first one to active
    //use make boxes function to get a function that references the inputArray and has access to helper methods of makeBoxes
  $(document.body).on("keyup", boxes.zipcodeUpdater)
  $("#find-reps").on("submit", boxes.submitChecker);
});




/* ------------------------------------------Function Constructor Style----------------------------------------*/


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
    this.inputArray = [];
    this.zipcodeUpdater = makeZipcodeUpdater.bind(this);
    this.submitChecker = makeSubmitChecker.bind(this);
    this.updateBoxes = makeBoxUpdater.bind(this);
    this.advanceMarker = advanceMarker;
    this.reverseMarker = reverseMarker;
    
    
    function makeBoxUpdater() { //Needs to be in reference to the boxes instance. Currently in reference to the Div Element
        let inputArray = this.inputArray;
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
    function makeSubmitChecker(event) {
            if (this.inputArray.length == 5) {
              $("#zipcode").val(this.inputArray.join(""));
            } else {
              console.log("You might be missing part of the zipcode.");
              event.preventDefault();
            }
        
    }
    function makeZipcodeUpdater(event) {
            var keyPressed = event.key;
            var digitRegEx = /\d/;
            if (keyPressed == "Backspace") {//delete key
              if (this.inputArray.length > 0) {
                this.inputArray.pop();//pop from array
                this.reverseMarker();
                this.updateBoxes();
              }
            } else if (digitRegEx.test(keyPressed)) { //match to regex expression
                if (this.inputArray.length < 5) {
                  this.inputArray.push(keyPressed);
                  this.advanceMarker();
                  this.updateBoxes();
                } else {
                  console.log("Max length");
                }
            }
        
    }
    //return {}; //object with references to these functions
}


/*---------------------------------------Class Declaration Style Syntactic sugar for Function declaration style--------------------*/

















/*--------------------------------------Object prototype style-----------------------------------*/



let advanceAndPreviousMarkers = {
    "init" : function(num) {
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
        this.inputArray = [];
        this.zipcodeUpdater = this.makeZipcodeUpdater.bind(this);
        this.submitChecker = this.makeSubmitChecker.bind(this);
        this.updateBoxes = this.makeBoxUpdater.bind(this);
    },
    
    
    "makeBoxUpdater" : function makeBoxUpdater() { //Needs to be in reference to the boxes instance. Currently in reference to the Div Element
        
          $(".zipcode").each(function (index, element) {
            var zipChar = this.inputArray[index] ? this.inputArray[index] : "-";
            $(element).text(zipChar);
          });
          if (this.inputArray.length == 5) {
            $(".submit-wrapper").addClass("activate-button");
          } else {
            $(".submit-wrapper").removeClass("activate-button");
          }
    },

    "makeSubmitChecker" : function makeSubmitChecker(event) {
            if (this.inputArray.length == 5) {
              $("#zipcode").val(this.inputArray.join(""));
            } else {
              console.log("You might be missing part of the zipcode.");
              event.preventDefault();
            }
        
    },
    "makeZipcodeUpdater" : function makeZipcodeUpdater(event) {
            var keyPressed = event.key;
            var digitRegEx = /\d/;
            if (keyPressed == "Backspace") {//delete key
              if (this.inputArray.length > 0) {
                this.inputArray.pop();//pop from array
                this.reverseMarker();
                this.updateBoxes();
              }
            } else if (digitRegEx.test(keyPressed)) { //match to regex expression
                if (this.inputArray.length < 5) {
                  this.inputArray.push(keyPressed);
                  this.advanceMarker();
                  this.updateBoxes();
                } else {
                  console.log("Max length");
                }
            }
        
    },
    "advanceMarker" :   function advanceMarker() {
        let $activeZip = $(".active-zip");
        let $nextZip = $activeZip.next();//remove active-marker, put marker on next sibling
        if ($nextZip.length) {//if active marker is last marker, do something special
            $activeZip.removeClass("active-zip");
            $nextZip.addClass("active-zip");
        }
    },
    "reverseMarker" :   function reverseMarker() {
        let $activeZip = $(".active-zip");
        let $prevZip = $activeZip.prev();//remove active-marker, put marker on prev sibling
        if ($prevZip.length) {//if active marker is first marker, do something special
            $activeZip.removeClass("active-zip");
            $prevZip.addClass("active-zip");
        }
    }    
};