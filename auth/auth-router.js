const router = require("express").Router();
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const secrets = require("../config/secrets.js");
const { isValid } = require("../users/user-service.js");
const Users = require("../users/user-model.js");

//-------------register-------------------------
router.post("/register", (req, res) => {
  // implement registration
  const credentials = req.body;
  if (isValid(credentials)) {
    const rounds = process.env.BCRYPT_ROUNDS || 8;
    const hash = bcryptjs.hashSync(credentials.password, rounds);
    credentials.password = hash;

    Users.add(credentials)
      .then((user) => {
        const token = generateToken(user);
        res.status(201).json({ data: user, jwt_token: token });
      })
      .catch((error) => {
        res.status(500).json({ message: error.message });
      });
  } else {
    res.status(400).json({
      message:
        "please provide username and password and the password shoud be alphanumeric",
    });
  }
});
//-------------login---------------------
router.post("/login", (req, res) => {
  // implement login
  const { username, password } = req.body;
  if (isValid(req.body)) {
    Users.findBy({ username: username })
      .then(([user]) => {
        // compare the password the hash stored in the database
        if (user && bcryptjs.compareSync(password, user.password)) {
          const token = generateToken(user);
          res.status(200).json({
            message: `Welcome to our API, ${user.username}!`,
            //token,
            jwt_token: token,
          });
        } else {
          res.status(401).json({ message: "Invalid credentials" });
        }
      })
      .catch((error) => {
        res.status(500).json({ message: error.message });
      });
  } else {
    res.status(400).json({
      message:
        "please provide username and password and the password shoud be alphanumeric",
    });
  }
});

router.get("/logout", function (req, res) {
  res.status(200).json({ GoodBye: "GoodBye" });
});
//-------------generateToken---------------------
function generateToken(user) {
  const payload = {
    subject: user.id,
    username: user.username,
  };

  const options = {
    expiresIn: "2h",
  };

  return jwt.sign(payload, secrets.jwtSecret, options);
}

module.exports = router;
