"use strict";

const fs = require("fs");
const marked = require("marked");

function parse_or_default (data, default_value) {
    try {
        return marked(data);
    } catch (err) {
        return default_value;
    }
}

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
                resolve(parse_or_default(data, default_value));
            }
        });
    });
};
