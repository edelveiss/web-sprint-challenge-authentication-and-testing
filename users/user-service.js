module.exports = {
  isValid,
};

function isValid(user) {
  if (typeof user !== "object") {
    throw new Error("invalid parameter. It is not an object");
  } else if (user.username === undefined || user.password === undefined) {
    throw new Error("invalid credentials. It does not have required fileds");
  } else {
    return Boolean(
      user.username && user.password && typeof user.password === "string"
    );
  }
}
