if (!process.env.JWT_SECRET) {
  console.log("process.env.JWT_SECRET", process.env.JWT_SECRET);
}
module.exports = {
  jwtSecret: process.env.JWT_SECRET || "tzsecretswhatsup",
};
