"use strict";
const path = require("path");
const assert = require("yeoman-assert");
const helpers = require("yeoman-test");

describe("generator-marmot:app", () => {
  beforeAll(() => {
    return helpers.run(path.join(__dirname, "../generators/app")).withPrompts({
      name: "marmot",
      verson: "0.0.1",
      description: "test",
      author: "AlfieriChou",
      email: "alfierichou@gmail.com"
    });
  });

  it("creates files", () => {
    assert.file(["marmot/package.json"]);
  });
});
