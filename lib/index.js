"use strict";

const fs = require("fs");
const path = require("path");
const async = require("asyncawait/async");
const wait = require("asyncawait/await");
const _ = require("lodash");

module.exports = class LegSON {
    constructor (opts, basePath) {
        this._opts = Object.assign({
            maxValueLength: 100,
            nullNonExistent: true,
            processArrays: true,
            basePath: process.cwd(),
            addPlugins: {},
        }, opts);

        this._basePath = basePath || "./";

        this._loaders = {
            "json": require("./loaders/json"),
            "md": require("./loaders/markdown"),
            "raw": require("./loaders/raw"),
            "url": require("./loaders/url"),
        };

        this._loader_tests = [];

        for (let key in this._opts.addPlugins) {
            this._loaders[key] = this._opts.addPlugins[key];
        }

        for (let key in this._loaders) {
            const test = [new RegExp('^@\\['+key+'\\](.*)$'), this._loaders[key]];
            this._loader_tests.push(test);
        }
    }

    _selectLoader (str) {
        let res = null;

        for (let tdef of this._loader_tests) {
            const t = tdef[0].exec(str);
            if (t) {
                res = {
                    func: tdef[1],
                    dataPath: t[1],
                };
            }
        }

        return res;
    }

    _handleValueByType (val) {
        return async(() => {
            let res = val;

            if (_.isPlainObject(val)) {
                // process inner object
                res = wait(this._processAnObject(val));
            } else if (_.isArray(val) && this._opts.processArrays) {
                // process array
                res = [];
                for (let key in val) {
                    res.push(wait(this._handleValueByType(val[key])));
                }
                //res = wait(this._handleValueByType(res));
            } else if (isNaN(val)) {
                // process string value
                if (val.toString().length <= this._opts.maxValueLength) {
                    const loader = this._selectLoader(val);
                    if (loader) {
                        // TODO: Resolve dataPath patching conflict issue with url loader
                        //const eff_filename = path.join(this._basePath, loader.dataPath);
                        const eff_filename = loader.dataPath;
                        const new_val = wait(loader.func(eff_filename));
                        if (new_val) {
                            res = this._handleValueByType(new_val);
                        } else if (this._opts.nullNonExistent) {
                            res = null;
                        }
                    }
                }
            }
            return res;
        })();
    }

    _processAnObject (obj) {
        let res = obj;

        for (let key in obj) {
            res[key] = this._handleValueByType(obj[key]);
        }

        return res;
    }

    load (filename) {
        return async(() => {
            const obj = wait(this._loaders.json(filename));
            return wait(this._processAnObject(obj));
        })();
    }
};
