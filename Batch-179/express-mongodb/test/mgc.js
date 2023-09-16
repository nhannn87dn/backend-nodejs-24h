const { CONNECTION_STRING, DATABASE_NAME } = require("../constants/dbConfig");
const { MongoClient,ObjectId } = require("mongodb");

const fetchData = async ()=>{
    const client = await MongoClient.connect(CONNECTION_STRING);
    const db = client.db(DATABASE_NAME);
    //1.Lay Tat ca User
    const result = await db.collection("Users").find({}).toArray();
    //2.Lay tất cả user có 
    console.log(result);
}

fetchData();