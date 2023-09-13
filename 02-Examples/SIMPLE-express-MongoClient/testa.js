'use strict';
const { CONNECTION_STRING, DATABASE_NAME } = require('./constants/dbSettings');
// Khai báo thư viện MongoClient
const { MongoClient, ObjectId } = require('mongodb');


const main = async (collectionName) => {
    MongoClient.connect(CONNECTION_STRING)
      .then((client) => {
        const dbo = client.db(DATABASE_NAME);
        const collection = dbo.collection(collectionName);
        let cursor = collection;
        cursor = cursor.find({});

        cursor
          .toArray()
          .then((result) => {
            client.close();
            console.log(result);
          })
          .catch((err) => {
            console.log(err);
            client.close();
           
          });
      })
      .catch((err) => {
        console.log(err);
      });
}

main('users');