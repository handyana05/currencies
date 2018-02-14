var express = require('express');
var router = express.Router();
var path = require('path');

/* GET home page. */
router.get('/', function(req, res, next) {
    res.sendFile(path.join(__dirname + '/../public/app/index.html'));
});

/* Currencies API */
var currenciesController = require('../controllers/currenciesController');
router.route('/api/currencies').get(currenciesController.currencies);
router.route('/api/currency/:currency').get(currenciesController.currency);


module.exports = router;
