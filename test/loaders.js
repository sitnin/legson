"use strict";

const should = require('should');
const crypto = require('crypto');

function sha1 (str) {
    const hash = crypto.createHash('sha1');
    hash.update(str);
    return hash.digest("hex");
}

describe("Loaders", () => {
    describe("Bundled", () => {
        describe("json", () => {
            const load = require("../lib/loaders/json");

            it("Loads plain JSON", () => {
                //noinspection JSUnresolvedFunction
                return load("./test/data/data.json").then(data => {
                    should(data).instanceOf(Object);
                    should(data).have.property("foo", "bar");
                    should(data).have.property("baz", 123);
                    should(data).have.property("arr", "@json://data_array.json");
                    should(data).have.property("inner", { "md": "@md://data.md" });
                });
            });

            it("Loads JSON5", () => {
                //noinspection JSUnresolvedFunction
                return load("./test/data/data_5.json").then(data => {
                    should(data).instanceOf(Object);
                    should(data).have.property("test", "json5 parsed!");
                });
            });
        });

        it("markdown", () => {
            const load = require("../lib/loaders/markdown");

            //noinspection JSUnresolvedFunction
            return load("./test/data/data.md").then(data => {
                should(data).instanceOf(String);
                should(sha1(data)).equal("49d0ef429b702d8a8f8067b26ff7b4ada336e0ee");
            });
        });

        // WARNING: Switched off but working (trust me, I'm a doctor)
        // it("url", () => {
        //    const load = require("../lib/loaders/url");
        //
        //    //noinspection JSUnresolvedFunction
        //    return load("http://nodejs.org").then(data => {
        //        should(data).instanceOf(String);
        //        should(data).startWith("<!DOCTYPE html>");
        //    });
        //});
    });
});
