const { expect } = require("chai");
const {
  db,
  models: { Product },
} = require("../index");
const jwt = require("jsonwebtoken");
const seed = require("../../../script/seed");

describe("Product model", () => {
  let products;
  beforeEach(async () => {
    products = (await seed()).products;
  });
});
