const collegeModel = require("../model/collegeModel")
const internModel = require("../model/internModel")
const valid = require("../validation/validation")


const createClgData = async function(req, res){

  try {
    let data = req.body
    if (Object.keys(data).length == 0) return res.status(400).send({ status: false, message: "body is empty" })

    let { name, fullName, logoLink } = data

    if (!name) return res.status(400).send({ status: false, message: "Name is required" })

    if (!valid.isValidateName(name)) return res.status(400).send({ status: false, message: "please enter valid name" })

    if (!fullName)
      return res.status(400).send({ status: false, message: "FullName of college required" });
    if (!valid.isValidateName(fullName)) return res.status(400).send({ status: false, message: "please enter valid fullName" })

    const validName = await collegeModel.findOne({ name })
    if (validName) {
      return res.status(400).send({ status: false, message: `College Name is already registered` })
    }

    if (!logoLink) return res.status(400).send({ status: false, message: "Please enter LogoLink" })
    if (!valid.isValidhttp(logoLink)) return res.status(400).send({ status: false, message: "Please enter Valid URL in logo" })

    let created = await collegeModel.create(data)
    res.status(201).send({ status: true, data: created })

  } catch (err) {
    res.status(500).send({ status: false, message: err.message })
  }

}




const collegeDetails = async function (req, res) {

  try {

    let data = req.query

    if (Object.keys(data).length === 0) return res.status(400).send({ status: false, message: "Please Enter College Name" });
    if (Object.values(data) == "") return res.status(400).send({ status: false, message: "Please enter value" })
    let check = await collegeModel.findOne({ name: data.collegeName, isDeleted: false })

    if (!check) return res.status(404).send({ status: false, message: "college name not found" });

    let collegeId = check._id

    let getInternData = await internModel.find({ collegeId: collegeId, isDeleted: false }).select({ name: 1, email: 1, mobile: 1 })

    if (!Object.keys(getInternData).length === 0) return res.status(404).send({ status: false, message: "No Details available" });

    let name = check.name;
    let fullName = check.fullName;
    let logoLink = check.logoLink;

    let collegeDetail = { name: name, fullName: fullName, logoLink: logoLink, interns: getInternData }

    res.status(200).send({ status: true, data: collegeDetail });

  }

  catch (err) {

    res.status(500).send({ status: false, message: err.message });

  }
}


module.exports = { collegeDetails, createClgData }

