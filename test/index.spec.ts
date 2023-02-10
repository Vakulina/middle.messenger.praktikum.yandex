import { expect } from "chai";

import { render } from "../src/services/renderBlock";

describe("Typescript + Babel usage suite", () => {
  it("should return string correctly", () => {
    expect(render("<p>Hello mocha</p>"), "Hello mocha");
  });
});
