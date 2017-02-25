"use strict";

const sunlight = require("@rttomlinson/sunlight_api_wrapper");


let repsByZip = sunlight.getRepsByZipcode(75074); //method falls return promises


repsByZip.then(function onFulfill(data) { //expect data to be a JS object
    console.log(data);
    data.results.forEach(function (element, index, arr) {
        console.log(element.aliases[0]);
    });
}).catch(function onError(error) {
    console.log(error);
});



