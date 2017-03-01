"use strict";

var express = require('express');
var router = express.Router();


const Sunlight = require("@rttomlinson/sunlight_api_wrapper");
let sunlight  = new Sunlight();

/* GET home page. */
router.get('/', function(req, res, next) {
    let bioguideId = req.query.bioguide_id;
    
    let repVotes = sunlight.getMostRecentVotes(bioguideId); //method falls return promises
    let repInfo = sunlight.getRepContactInfo(bioguideId);
    
    Promise.all([repVotes, repInfo]).then(function onFulfill(data) {
        let bills = sunlight.cleanVoteData(data[0]);
        let info = sunlight.cleanRepContactInfo(data[1]);
        res.render('repVotes', { "bills" : bills, "bioguideId" : bioguideId, "repInfo" : info, "layout" : "rep_votes_layout.hbs" });

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

/*--------------------------Clean Rep Data----------------------------*/
/* Clean form should follow this schema

{
    "fullName" : [string],
    "phoneNumber" : [string],
    "email" : [string],
    "seat" : [string],
    "party" : [string],
    "contactForm" : [string]
}


Form expected from API call

{
    "results" : [ {
            "aliases" : [Array],
            "contact_form" : [string] or null,
            "party" : [string],
            "phone" : [string],
            "title" : [string],
            "website" : [string]
        },
    
    ],
    "count": [number],
    "page": [Object]
}


*/


module.exports = router;
