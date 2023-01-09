//const bodyParser = require("body-parser")
const express=require("express")
const mongoose=require("mongoose")
const app=express()
const route=require('./router/route.js.js')

app.use(bodyParser.json());
app.use(bodyparser.urlencoded({extended:true}))


mongoose.connect("mongodb+srv://mongolearner:***@cluster0.f0f93p0.mongodb.net/anmol-121",{
    useNewurlParser:true
})
.then( ()=> console.log("mongoose is connected"))
.catch(err => console.log(err))

app.use('/', route)

app.listen(process.env.PORT || 3000,function(){
    console.log("Express app running on port 3000" + (process.env.PORT || 3000))
});