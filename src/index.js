const bodyParser = require("body-parser")
const express=require("express")
const mongoose=require("mongoose")
const app=express()
const route = require('./router/router')

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}))

mongoose.set('strictQuery', false);
mongoose.connect("mongodb+srv://Ruksar:1ststep@ruksar.cg402ym.mongodb.net/test",{
    useNewurlParser:true
})
.then( ()=> console.log("mongoose is connected"))
.catch(err => console.log(err))

app.use('/', route)

app.listen(process.env.PORT || 3000,function(){
    console.log("Express app running on port " + (process.env.PORT || 3000))
});