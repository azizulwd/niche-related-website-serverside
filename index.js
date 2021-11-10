const express = require('express');
const { MongoClient } = require('mongodb');
const cors = require('cors');
require('dotenv').config();


const app = express();
const port = 5000;


// middleware
app.use(cors());
app.use(express.json());

// database connect
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.iy859.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
console.log(uri, "connected");

app.get('/', (req, res) => {
    res.send('Ready for the Assignment-12');
});


app.listen(port, ()=>{
    console.log('Listening to port', port);
});