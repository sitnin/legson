"use strict";

module.exports = class LegSON {
    constructor (opts) {
        this._opts = Object.assign({
            maxValueLength: 100,
            nullNonExistent: true,
            addPlugins: {},
        }, opts);
    }

    load (filename) {
        return Promise.resolve({});
    }
};
