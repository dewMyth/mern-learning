const router = require("express").Router();
const CryptoJS = require("crypto-js");

const User = require("../models/User.model");

//Create User - or register, a simple post request to save user in db
router.post("/register", (req, res) => {
  const newUser = new User({
    email: req.body.email,
    password: CryptoJS.AES.encrypt(
      req.body.password,
      process.env.PASSWORD_SECRET_KEY
    ).toString(),
    accountType: req.body.accountType,
  });

  //Password encryption using crypto-js
  newUser
    .save()
    .then((user) => res.json(user))
    .catch((err) => res.status(400).json({ message: "Could not create user" }));
});

//Login User
router.post("/login", (req, res) => {
  User.findOne({ email: req.body.email })
    .then((user) => {
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      const decryptedPassword = CryptoJS.AES.decrypt(
        user.password,
        process.env.PASSWORD_SECRET_KEY
      ).toString(CryptoJS.enc.Utf8);
      if (decryptedPassword !== req.body.password) {
        return res.status(401).json({ message: "Incorrect password" });
      }
      res.json(user); //return _id and accountType as a JSON at least..account Type is a must...in here I return the whole user object
    })
    .catch((err) => res.status(400).json({ message: "Could not login user" }));
});

module.exports = router;
