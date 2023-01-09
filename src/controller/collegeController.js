const collegeModel = require("../model/collegeModel")
const internModel = require("../model/internModel")
const valid = require("../validation/validation")


const createClgData=async (req,res)=>{
    let data= req.body
    if(Object.keys(data).length==0) return res.status(400).send({msg:"body is empty"})

    let{name,fullName,logoLink}=data
    
    if(!name) return res.status(400).send({msg:"Name is required"})
    if(!valid.isValidateName(name)) return res.status(400).send({msg:"please enter valid name"})
    if(!fullName)
    return res.status(400).send({status: false, msg : "FullName of college required"});
    if(!valid.isValidateName(fullName)) return res.status(400).send({msg:"please enter valid fullName"})
    if(!logoLink) return res.status(400).send({msg:"Please enter LogoLink"})
    let created= await collegeModel.create(data)
    res.status(201).send({data:created})
}




const collegeDetails = async function (req, res) {

    try {
  
      let data = req.query  
      
      if (!Object.keys(data).length) return res.status(400).send({ status: false, msg: "Please Enter College Name"});
  
      let check = await collegeModel.findOne({name: data.collegeName, isDeleted: false })
      
      if (!check) return res.status(404).send({ status: false, msg: "college name not found"});
  
      let collegeId = check._id 
  
      let getInternData = await internModel.find({ collegeId: collegeId, isDeleted: false }).select({ name: 1, email: 1, mobile: 1 })
  
      if (!getInternData.length) return res.status(404).send({ status: false, msg: "No Details available"});
  
      
      let name = check.collegeName;
      let fullName = check.fullName;
      let logoLink = check.logoLink;
  
      
      let collegeDetail = {name: name, fullName: fullName,logoLink: logoLink,interests: getInternData}
  
      res.status(200).send({ status: true,  data: collegeDetail});
  
    }
  
    catch (err) {
  
      res.status(500).send({ status: false, error: err.message });
  
    }
  }


module.exports.collegeDetails = collegeDetails

module.exports.createClgData = createClgData