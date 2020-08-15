/* 
  complete the middleware code to check if the user is logged in
  before granting access to the next middleware/route handler
*/
const jwt = require("jsonwebtoken");
const secrets = require("../config/secrets.js");

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization;
    if (token) {
      jwt.verify(token, secrets.jwtSecret, (err, decodedToken) => {
        if (err) {
          res.status(401).json({ you: "shall not pass!" });
        } else {
          req.decodedJwt = decodedToken; //allow to be availabal in a chain
          //console.log(req.decodedJwt);
          next();
        }
      });
    } else {
      throw new Error("invalid auth data");
    }
  } catch (err) {
    res.status(401).json({ error: err.message });
  }
};
