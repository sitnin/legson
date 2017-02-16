"use strict";

const fs = require("fs");

module.exports = function (filename, default_value) {
    return new Promise ((resolve, reject) => {
        fs.readFile(filename, "utf-8", (err, data) => {
            if (err) {
                if (default_value) {
                    resolve(default_value);
                } else {
                    reject(err);
                }
            } else {
                resolve(data);
            }
        });
    });
};
