var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    let landingPageUrl = req.protocol + "://" + req.hostname;
  res.render('index', { title: 'Express', layout: "landing_layout.hbs", "landingPageUrl": landingPageUrl});
});

module.exports = router;
