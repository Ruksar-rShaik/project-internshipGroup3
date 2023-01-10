
const express = require("express")
const mongoose = require("mongoose")
const app = express()
const route = require('./router/router')

app.use(express.json());
app.use(express.urlencoded({ extended: true }))

mongoose.set('strictQuery', false);
mongoose.connect("mongodb+srv://Ruksar:1ststep@ruksar.cg402ym.mongodb.net/test", {
    useNewurlParser: true
})
    .then(() => console.log("mongoose is connected"))
    .catch(err => console.log(err))

app.use('/', route)

app.listen(3000, function () {
    console.log("Express app running on port " + (3000))
});