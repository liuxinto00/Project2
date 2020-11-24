const express = require("express");
const router = express.Router();
const mongoClient = require("mongodb").MongoClient;
const assert = require("assert");
const bodyParser = require("body-parser");
require("dotenv").config();
require("dotenv/config");

const uri = process.env.MONGODB_URI || require("./mongoDetails.js");
let db;

const urlencodedParser = bodyParser.urlencoded({ extended: false });

mongoClient.connect(url, { useUnifiedTopology: true }, function (
  error,
  client
) {
  assert.equal(error, null);
  db = client.db("posts");
});

// Alex: this function is storing the actual password in the database
// suggest using hash function for store the hashed password.

router.post("/register", function (request, response) {
  const data = request.body.data;
  db.collection("users").findOne({ _id: data.email }, function (error, result) {
    if (error !== undefined && error !== null) {
      // occurs error
      response.status(500);
      response.send(
        "Since server encounters error, registration failed. details: " +
          error.message
      );
    } else if (result !== null) {
      response.status(400);
      response.send(
        "Email " + data.email + " has been occupied. Try another one. "
      );
    } else {
      db.collection("users").insertOne(
        { _id: data.email, username: data.username, password: data.password },
        function (error, result) {
          assert.equal(null, error);
          assert.equal(1, result.insertedCount);
          response.json({ message: "finish" });
        }
      );
    }
  });
});

// Alex: as suggested above, use hash function to match with the hashed password in the database. 

router.post("/authenticate", urlencodedParser, function (request, response) {
  const data = request.body.data;
  db.collection("users").findOne({ username: data.username }, function (
    error,
    result
  ) {
    if (result === null || result.password != data.password) {
      response.status(401).send("Username or Password not correct.");
    } else {
      response.status(200);
      response.send({ match: true });
    }
  });
});

module.exports = router;
// const express = require("express");
// const router = express.Router();

// const userDB = require("../db/userMongoDB.js");

// router.post("/register", async (req, res) => {
//   const data = req.body;
//   console.log("data is", data);
//   await userDB.createUser(data);
//   res.redirect("/");
// });

// router.post("/login", function (req, res) {
//   const data = req.body;
//   const result = userDB.loginUser(data);
//   print(result);
//   if (result === null || result.password != data.password) {
//     res.status(401).send("Username or Password not correct.");
//   } else {
//     res.send(result);
//   }
// });
// module.exports = router;
