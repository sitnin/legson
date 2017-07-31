"use strict";

const LegSON = require("../");

const should = require("should");
const crypto = require("crypto");
const path = require("path");

function sha1 (str) {
    const hash = crypto.createHash('sha1');
    hash.update(str);
    return hash.digest("hex");
}


describe("Methods", () => {
    describe("Private methods", () => {
        beforeEach(() => {
            this.obj = new LegSON();
        });

        describe("_selectLoader", () => {
            it("selects json", () => {
                const t = this.obj._selectLoader("@[json]some.json");
                should(t).Object().properties("func", "dataPath");
                should(t).property("dataPath", "some.json");
            });

            it("selects markdown", () => {
                const t = this.obj._selectLoader("@[md]some.md");
                should(t).Object().properties("func", "dataPath");
                should(t).property("dataPath", "some.md");
            });

            it("selects url", () => {
                const t = this.obj._selectLoader("@[url]https://domain.tld/path");
                should(t).Object().properties("func", "dataPath");
                should(t).property("dataPath", "https://domain.tld/path");
            });
        });
    });

    describe("load via relative path", () => {
        beforeEach(() => {
            this.obj = new LegSON();
        });

        it("works", () => {
            const t = this.obj.load("data.json");
            return should(t).Promise().fulfilled();
        });

        it("works perfectly", () => {
            return this.obj.load("data.json").then(obj => {
                should(obj).Object();

                should(obj).property("foo", "bar");
                should(obj).property("baz", 123);

                should(obj).property("arr").Array();

                should(obj).propertyByPath("inner", "md").String();
                should(sha1(obj.inner.md)).equal("49d0ef429b702d8a8f8067b26ff7b4ada336e0ee");
            });
        });

        it("rejects when root file not found", () => {
            //noinspection JSIgnoredPromiseFromCall
            should(this.obj.load("nonexistent")).Promise().rejected();
        });
    });

    describe("load via absolute path", () => {
        beforeEach(() => {
            const absPath = path.join(process.cwd(), "data.json");
            this.obj = new LegSON(absPath);
        });

        it("works", () => {
            const t = this.obj.load("data.json");
            return should(t).Promise().fulfilled();
        });

        it("works perfectly", () => {
            return this.obj.load("data.json").then(obj => {
                should(obj).Object();

                should(obj).property("foo", "bar");
                should(obj).property("baz", 123);

                should(obj).property("arr").Array();

                should(obj).propertyByPath("inner", "md").String();
                should(sha1(obj.inner.md)).equal("49d0ef429b702d8a8f8067b26ff7b4ada336e0ee");
            });
        });

        it("rejects when root file not found", () => {
            //noinspection JSIgnoredPromiseFromCall
            should(this.obj.load("nonexistent")).Promise().rejected();
        });
    });
});
