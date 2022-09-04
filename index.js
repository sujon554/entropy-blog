const express = require('express');
const { MongoClient } = require('mongodb');
const cors = require('cors');
const ObjectId = require("mongodb").ObjectId;
const app = express();
const port =process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// mongodb+srv://<username>:<password>@cluster0.ad0jo.mongodb.net/?retryWrites=true&w=majority
const uri = 'mongodb+srv://entropy:xEaTrkShFKhhVx4q@cluster0.ad0jo.mongodb.net/?retryWrites=true&w=majority';
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});


async function run () {
    try{
        await client.connect()
        console.log("conntect database success")
        const database = client.db("entropy")
        const postCollenction = database.collection("post")


         //Get Users API
    app.get("/post", async (req, res) => {
        const cursor = postCollenction.find({});
        const post = await cursor.toArray();
        res.json(post);
      });

      //POST API For Users
    app.post("/post", async (req, res) => {
        const post = req.body;
        console.log(post);
        const result = await postCollenction.insertOne(post);
        console.log(result);
        res.json(result);
      });



    }
    finally {
        // await client.close();
    }
}


run().catch(console.dir);


//root 
app.get('/', (req, res) => {
    res.send('running mt entropy');
});

app.listen(port, () => {
    console.log('running server on port', port);
})