"use strict";

const LegSON = require("./lib/index.js");

const opts = {
    maxValueLength: 100,
    nullNonExistent: true,
    addPlugins: {
        "test": value => {
            return new Promise.resolve(value);
        },
    },
};

const loader = new LegSON(opts);
loader.load("path/to/root/file.json").then(obj => {
    console.log(loader._opts);
    console.log(obj);
}).catch(err => {
    console.error(err.stack || err.message);
});
