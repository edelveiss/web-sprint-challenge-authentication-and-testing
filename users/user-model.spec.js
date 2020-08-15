const db = require("../database/dbConfig.js");

const Users = require("./user-model.js");

describe("users model", () => {
  beforeEach(async () => {
    await db("users").truncate();
  });
  describe("add()", () => {
    it("should insert a new user into the db", async () => {
      await Users.add({ username: "Mike", password: "mikePassword" });
      await Users.add({ username: "Sasha", password: "sashaPassword" });

      const users = await db("users");

      expect(users).toHaveLength(2);
    });
  });
  describe("findById(id)", () => {
    it("should find user by id", async () => {
      await Users.add({ username: "Robin", password: "robinPassword" });
      const user = await Users.findById(1);

      expect(user.username).toBe("Robin");
    });
  });
});
