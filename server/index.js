const express = require("express")
const { MongoClient } = require('mongodb');
const cors = require("cors")
const app = express()
const uri = process.env.MONGODB_URL;
const client = new MongoClient(uri);

app.use(cors())

app.get("/",async(req,res)=>{
    try {
        const database = client.db('chartJS');
        const collection = database.collection('data');
    
        const data = await collection.find({}).toArray();
        res.status(200).json(data)
        // console.log('Retrieved data:', data);
      } catch (error) {
        res.status(500).json(error)
        // console.error('Error fetching data from MongoDB:', error);
      }
})

async function connectToMongoDB() {
    try {
      await client.connect();
      console.log('Connected to MongoDB');
    } catch (error) {
      console.error('Error connecting to MongoDB:', error);
    }
  }
connectToMongoDB();

app.listen(8080,async()=>{
    console.log("server is runing")
})