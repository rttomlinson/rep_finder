"use strict";

$(document).ready(function(event) {
    colorVoteBoxes();
});


function colorVoteBoxes() {
    $(".vote-box").each(function (index, element) {
        let $this = $(this);
        let vote = $this.find(".vote-record").text().trim(); //Use JS native trim method
        if (vote == "Yea") {
            $this.addClass("yea-border");
        } else if (vote == "Nay") {
            $this.addClass("nay-border");
        }
    });
}