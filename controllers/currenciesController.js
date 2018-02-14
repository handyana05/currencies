var csvToJson = require('csvtojson');
var path = require('path');
var configValues = require('../config/config');

var csvPath = path.join(__dirname, configValues.path.csv);

var readCsvFile = (callback) => {
    csvToJson().fromFile(csvPath).on('end_parsed', (jsonArrayObj) => {
        delete jsonArrayObj[0]['Date'];
        delete jsonArrayObj[0]['field33'];
        callback(jsonArrayObj[0]);
    });
};

module.exports = {
    currencies: (req, res) => {
        readCsvFile((jsonObj) => {
            var currencies = [];
            Object.keys(jsonObj).map(key => {
                var currency = {
                    name: key,
                    value: jsonObj[key]
                };
                currencies.push(currency);
            });
            res.setHeader('Content-Type', 'application/json');
            res.send(JSON.stringify(currencies));
        });
    },
    currency: (req, res) => {
        var currency = req.params.currency;
        readCsvFile((jsonObj) => {
           if(jsonObj[currency.toUpperCase()]) {
               //res.send('1 EUR = ' + jsonObj[currency.toUpperCase()] + ' ' + currency.toUpperCase());
               res.setHeader('Content-Type', 'application/json');
               var result = {
                   name: currency.toUpperCase(),
                   value: jsonObj[currency.toUpperCase()]
               };
               res.send(JSON.stringify(result));
           }
           else {
               res.send('Parameter is not valid!')
           }
        });
    }
};