"use strict";

const sunlight = require("@rttomlinson/sunlight_api_wrapper");


let repsByZip = sunlight.getRepsByZipcode(75074); //method falls return promises


repsByZip.then(function onFulfill(data) { //expect data to be a JS object
    console.log(data);
    let prettyData = {
        "senate" : [],
        "house" : []
    };
    data.results.forEach(function (element, index, arr) {
        let cleanedData = makeDataPretty(element);
        if (element.chamber == "senate") {
            prettyData.senate.push(cleanedData);
        } else {
            prettyData.house.push(cleanedData);
        }
    });
}).catch(function onError(error) {
    console.log(error);
});




//let prettyData = {};
/*Pretty data should follow the schema of:
{
    "house" : [
        {
            "fullName" : [string],
            "party" : [string],
            "bioguideId : [string],
            "district" : [number]
        },...
    ],
    "senate" : [
        {
            "fullName" : [string],
            "party" : [string],
            "bioguideId : [string],
        }
    
    
    
    ]
}
*/
function makeDataPretty(rep) {
    let cleanData = {};
    cleanData.fullName = rep.aliases[0];
    cleanData.party = rep.party;
    cleanData.bioguideId = rep.bioguide_id;
    if (rep.chamber == "house") {
        cleanData.district = rep.district;
    }
    return cleanData;
}



