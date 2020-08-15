const { isValid } = require("./user-service.js");
describe("isValid()", () => {
  it("should throw an exception if a parameter is not an object", () => {
    expect(() => {
      //isValid({ username: "john", password: "johnPassword" }); //sanity test
      isValid(5);
    }).toThrow(); // a number
    expect(() => {
      isValid("John");
    }).toThrow(); // a string
  });
  it("should throw an exception if a parameter  does not have required fileds", () => {
    expect(() => {
      isValid({ username: "john" });
    }).toThrow(); // without a password filed
    expect(() => {
      isValid({ password: "johnPassword" });
    }).toThrow(); // a without a username filed
  });
});
