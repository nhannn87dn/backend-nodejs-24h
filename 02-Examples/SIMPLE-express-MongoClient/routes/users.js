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

/* Thêm mới 1 User */
router.post("/", async (req, res, next) => {
  try {
    const client = await MongoClient.connect(CONNECTION_STRING);
    const db = client.db(DATABASE_NAME);
    const newUser = req.body; // Assume the new user data is in the request body
    const result = await db.collection("users").insertOne(newUser);
    client.close();
    res.status(201).json(result.ops[0]);
  } catch (error) {
    next(error);
  }
});

/* Update user */

router.put("/:id", async (req, res, next) => {
  try {
    const client = await MongoClient.connect(CONNECTION_STRING);
    const db = client.db(DATABASE_NAME);
    const { id } = req.params;
    const updatedUser = req.body; // Assume the updated user data is in the request body
    const query = { _id: new ObjectId(id) };
    const update = { $set: updatedUser };
    const result = await db.collection("users").updateOne(query, update);
    client.close();
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
});

/* Xóa 1 user */
router.delete("/:id", async (req, res, next) => {
  try {
    const client = await MongoClient.connect(CONNECTION_STRING);
    const db = client.db(DATABASE_NAME);
    const { id } = req.params;
    const query = { _id: new ObjectId(id) };
    const result = await db.collection("users").deleteOne(query);
    client.close();
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
});

module.exports = router;