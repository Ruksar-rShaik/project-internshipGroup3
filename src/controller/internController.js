const internModel = require('../model/internModel')
const collegeModel = require("../model/collegeModel")
const valid = require("../validation/validation")

const interns = async function(req,res){
    try{
    let data = req.body;
    let {name,mobile,email,collegeName} = data;
    console.log(collegeName)
    if(!name)
    return res.status(400).send({status: false, msg : "name is required"});
    if(!valid.isValidateName(name))
    return res.status(400).send({status: false, msg : "Enter valid Name"});


    if(!valid.isValidateEmail(email))
    return res.status(400).send({status:false, msg : "email is required"});

    if(!mobile)
    return res.status(400).send({status:false, msg: "Mobile is required"});

    if(mobile.length != 10 || typeof(mobile) != "string"){
        return res.status(400).send({status:false, msg: "Mobile Number should be 10 digit"});

    }
    if(!collegeName)
    return res.status(400).send({status:false, msg: "please provide collegeName"});
    
    let NamedId = await collegeModel.findOne({fullName: collegeName})
        if(Object.keys(NamedId).length === 0)
        return res.status(400).send({status : false, msg : "No data in the Database of your collegeName"});      
        data.collegeId= NamedId._id;
       
    let saveIntern = await internModel.create(data);
    let newData = await internModel.findById({_id: saveIntern._id}).select({_id: 0, __v: 0})
    return res.status(201).send({status:true, msg:newData})

}
catch(err){
    res.status(500).send({status:false, err:err.message})
}
}

module.exports.interns = interns