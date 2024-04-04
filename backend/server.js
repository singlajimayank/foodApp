const express = require('express');
const cors = require('cors');

const app = express();
const apiRoutes = require('./routes/api-routes');

const dotenv = require('dotenv');
dotenv.config();

const port = process.env.PORT;

const MongoDb = require('./db/mongo.db');
MongoDb.connect();

app.use(express.json());
app.use(cors());
app.use(apiRoutes);

app.get("/", (_req, res) => {
    res.send("Hello World");
})

app.listen(port, () => {
    console.log(`Food app is listening on port ${port}`);
})