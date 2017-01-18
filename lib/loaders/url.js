"use strict";

const request = require("request");

module.exports = function (url, default_value) {
    return new Promise ((resolve, reject) => {
        request(url, (err, response, body) => {
            if (!err && response.statusCode == 200) {
                resolve(body);
            } else {
                if (default_value) {
                    resolve(default_value);
                } else {
                    reject(err);
                }
            }
        });
    });
};
