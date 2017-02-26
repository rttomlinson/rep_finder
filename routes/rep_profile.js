"use strict";

var express = require('express');
var router = express.Router();


const Sunlight = require("@rttomlinson/sunlight_api_wrapper");
let sunlight  = new Sunlight();

/* GET home page. */
router.get('/', function(req, res, next) {
    let bioguideId = req.query.bioguide_id;
    
    let repVotes = sunlight.getMostRecentVotes(bioguideId); //method falls return promises
    
    repVotes.then(function onFulfill(data) {
        let bills = cleanVoteData(data);
        res.render('repVotes', { "bills" : bills });

    }).catch(function onError(error) {
        console.log(error);
    });

});

/*---------------------------------Voting Records ------------------------------*/

/* -------------------------------Raw Data -----------------------------*/
/*
{
    "results" : [
        {
            "bill": {
                "bill_id" : [string],
                "official_title" : [string]
            },
            "voted_at" : [string],
            "voter_ids" : {
                "[bioguide_id]" : [string]
            }
        },...
        
    
    
    
    ],
    "count" : [number],
    "page" : [Object]
}


*/






/*
Pretty data for voting records

[
    {
        "bill_id" : [string],
        "bill_title" : [string],
        "recorded_vote": [string]
    },...



]


*/
function cleanVoteData(data) {
    let cleanedData = [];
    data.results.forEach(function (element, index, arr) {
        let holderObj = {};
        holderObj["bill_id"] = element.bill.bill_id;//billid from element
        holderObj["bill_title"] = element.bill.official_title;
        holderObj["recorded_vote"] = element.voter_ids[Object.getOwnPropertyNames(element.voter_ids)[0]];
        cleanedData.push(holderObj);
    });
    return cleanedData;
}



module.exports = router;
