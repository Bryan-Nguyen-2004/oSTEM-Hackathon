// equivalent fo import statements
const express = require('express');
const { connectToDb, getDb } = require('./db')
const { ObjectId } = require('mongodb')
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const bcrypt = require("bcrypt");
const multer = require("multer");
const path = require("path");
const cors = require('cors');

const auth = require("./src/auth");
const users = require("./src/users");
const trees = require("./src/trees");
const questions = require("./src/questions");

// stores .env variables in process.env
dotenv.config()

// initilizes app and middleware
const app = express();
app.use(express.json());
app.use(cors());

// uses mongoose to connect to MongoDb
mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(console.log("MongoDB Connected"))
.catch((err) => console.log(err));


// implements various routtes
app.use("/auth", auth)
app.use("/user", users)
app.use("/trees", trees)
app.use("/questions", questions)

app.use("/", (req, res) =>
{
    console.log("this is the home")
    res.sendStatus(200);
})

app.listen("3001", () => {
    console.log("Backend is running.");
});

// stuff used to learn MongoDb :/
// // route handlers (handle request for routes)
// app.get('/trees', (req,res) => {
//     let trees = []

//     // fetches document in batches to reduce bandwidth uses (101 documents)
//     db.collection('trees') // points to collection 'trees'
//     .find() // returns cursor (obj that points to a set of documents outlined by query), next can use toArray() or forEach()
//     .sort({ rarity: 1}) // also returns cursor (sorts by rarity alpabetically)
//     .forEach(tree => trees.push(tree)) // or just use toArray() lol
//     .then(() => { // asynch, meaning it takes time to do, b/c it has to fetch batches
//         res.status(200).json(trees) // 200 means alls good
//     })
//     .catch(() => {
//         res.status(500).json({error: 'could not fetch documents :/'}) // 500 means server error
//     })


//     res.json({mssg:"inventory"});
// })

// app.get('/trees/:id', (req,res) => {

//     if (ObjectId.isValid(req.params.id)) // if object id is valid
//     {
//         let id = ObjectId(req.params.id) // sets id to id obj containing id in url

//         db.collection('trees')
//         .findOne({_id: id})
//         .then((doc) => { // // uses doc returned from find
//             res.status(200).json(doc) // returns null if doc w/ id doesn't exist
//         })
//         .catch(() => {
//             res.status(500).json({error: 'could not fetch documents :/'}) // 500 means server error
//         })
//     }
//     else
//     {
//         res.status(500).json({error: 'invalid id'})
//     }
// })
// // connects to db
// let db
// connectToDb((err) => {
//     if (!err)
//     {
//         // app listens for requests at port 3000
//         app.listen(3000, () => {
//             console.log("app listening");
//         });

//         // sets db to db connection
//         db = getDb();
//     }
// })