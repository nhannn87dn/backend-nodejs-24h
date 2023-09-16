const { CONNECTION_STRING, DATABASE_NAME } = require("../constants/dbConfig");
const { MongoClient,ObjectId } = require("mongodb");

const fetchData = async ()=>{
    const client = await MongoClient.connect(CONNECTION_STRING);
    const db = client.db(DATABASE_NAME);
    //1.Lay Tat ca User
    const result = await db.collection("Users").find({}).toArray();
    //2.Lay user có id = 5
    //3.Lay user có id > 5
    //4.Lay user có 1 < id 5
    //5.Lay user email = ?
    //6.Lay fistName = ?
    //7.Lay fistName có chứa từ gì đó
    console.log(result);
}

fetchData();