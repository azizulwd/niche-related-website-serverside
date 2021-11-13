const express = require('express');
const { MongoClient } = require('mongodb');
const cors = require('cors');
require('dotenv').config();


const app = express();
const port = process.env.PORT || 5000;


// middleware
app.use(cors());
app.use(express.json());

// database connect
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.iy859.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function run(){
    try{
        await client.connect();
        const database = client.db("carDealer");
        const carCollections = database.collection("cars");

        // Get all data
        app.get('/products', async(req, res)=>{
            const cursor = carCollections.find({});
            const products = await cursor.toArray();
            res.send(products);
        });


        // POST API
        app.post('/products', async(req, res)=>{
            const product = req.body;
            console.log('hit the post', product);

            const result = await carCollections.insertOne(product);
            res.json(result);
        });

    }
    finally{}
}
run().catch(console.dir);

app.get('/', (req, res) => {
    res.send('Ready for the Assignment-12');
});


app.listen(port, ()=>{
    console.log('Listening to port', port);
});