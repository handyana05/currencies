var request = require('request');
var rpn = require('request-promise-native');
var fs = require('fs');
var path = require('path');
var extractzip = require('extract-zip');

var configValues = require('../config/config');

var currencyPath = path.join(__dirname, configValues.path.currency);
var csvPath = path.join(__dirname, configValues.path.csv);
var zipPath = path.join(__dirname, configValues.path.zip);
var url = configValues.eurofxurl;

var options = {
    uri: url,
    transform: function (body, response) {
        let download = true;

        if (fs.existsSync(csvPath)) {
            let fsStats = fs.statSync(csvPath);
            let csvLastModifiedDate = new Date(fsStats.mtime);

            var lastModified = response.headers['last-modified'];
            var lastModifiedDate = new Date(lastModified);

            if(lastModifiedDate <= csvLastModifiedDate) {
                download = false;
            }
        }

        return {
            download: download,
            body: body
        };
    },
    encoding: null,

}

var output = "test.zip";

module.exports = () => {

        rpn(options).then((response) => {
            if(response.download) {
                //let unzip = zlib.createUnzip(response.body).pipe(fs.createWriteStream(path));
                fs.writeFile(zipPath, response.body, function(err) {
                    if(err){
                        throw err;
                    }
                    console.log('File written!');
                });

                extractzip(zipPath, { dir: currencyPath }, function(err) {
                    if(err) {
                        throw err;
                    }
                    console.log('Unzip!');
                    fs.unlinkSync(zipPath);
                })
            }
        });

};