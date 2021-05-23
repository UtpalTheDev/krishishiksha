const express = require('express');
let bodyparse = require('body-parser');
const mongoose = require('mongoose');
const {Schema} =mongoose;
const cors = require('cors');
const app = express();
app.use(bodyparse.json())
const { errorHandler } = require("./middlewares/error-handler.middleware")
const { routeNotFound } = require("./middlewares/route-not-found.middleware")
app.use(cors());

const user = require("./routes/user.router.js")
const data = require("./routes/data.router.js")
const question=require("./routes/question.router");
//mongoose conn

mongoose.connect(process.env['DB_CONNECTION'],{useNewUrlParser: true, useUnifiedTopology: true}).then(()=>{console.log("mongoose connected")})
.catch(eror=>{console.log("mongoose connection problem",error)})

app.get("/", (req, res) => {
  res.send("quiz api")
})

app.use('/user', user);
app.use('/data', data);
app.use('/question',question)
app.use(routeNotFound);
app.use(errorHandler);

app.listen(3000, () => {
  console.log('server started');
});