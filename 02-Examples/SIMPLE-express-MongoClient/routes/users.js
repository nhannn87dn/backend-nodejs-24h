const express = require("express");
const router = express.Router();
const { CONNECTION_STRING, DATABASE_NAME } = require("../constants/dbSettings");
const { MongoClient,ObjectId } = require("mongodb");

/* get All Users */
router.get("/", async (req, res, next) => {
  try {
    const client = await MongoClient.connect(CONNECTION_STRING);
    const db = client.db(DATABASE_NAME);
    const users = await db.collection("users").find({}).toArray();
    client.close();
    res.status(200).json(users);
  } catch (error) {
    next(error)
  }
});

/* Find a user by ID */
router.get("/:id", async (req, res, next) => {
    try {
      const client = await MongoClient.connect(CONNECTION_STRING);
      const db = client.db(DATABASE_NAME);
      const {id} = req.params;
      console.log(id);
      const query = { _id: new ObjectId(id) };
      const user = await db.collection("users").findOne(query);
      client.close();
      res.status(200).json(user);
    } catch (error) {
      next(error)
    }
  });

module.exports = router;