const mongoose = require("mongoose")
const User = require("../DBmodels/UserModel")
const Dept = require("../DBmodels/deptmodel")
const jwt = require("jsonwebtoken")
const cookie = require("cookie-parser")
const DummyGovernmentdb = require("../DBmodels/DummyDatabase")
const cookieParser = require("cookie-parser")
const DayinMin = 24*60*60
const secret = "uyb8ct48o7phit8y95ty8095by852v8by52by8puy8bby8t0yn8tun095n045h[ih3q9put21cgnewq8u3yo8y;kkrhaliubiuqjbge1321321g321er2ya546hr8eh9879re7b489re8643a4gr5641g6v1654rg64g659ae879r7ey97y9797897y987a94e64a6r5444a4"
async function FindInDb(Aadhar) {
    const q = Aadhar.toString()
    const p = await DummyGovernmentdb.findOne({AadharNumber: q})
    if(!p){
        return false
    }
    return true
}
function tokenize(id){
    return jwt.sign({id},secret,{
        expiresIn : 3*DayinMin
    })
}


function HanddleError(err){
    const returnmessage = {}
       if (err.errors) {
        const errobjects = Object.values(err.errors)
        for (const iterator of errobjects) {
            const p = iterator.properties;
            returnmessage[p.path] = p.message
        }
       }
    
    if (err.code == 11000 ) {
        returnmessage["duplicate"] = "This Aadhar Number is already registered"
    }
    console.log(err.code);
    return returnmessage    
}
function HanddleError2(err) {
    if (err.message === "Incorrect Email") {
        return {error : "Incorrect Email"}
    }
    return {error : "Incorrect Password"}
}
module.exports.publicsignup = async (req,res)=>{
    const  UserDetail = req.body
    try {
        const user = await User.create(UserDetail)
        const token = tokenize(user._id)
        res.cookie("jwt",token,{httpOnly : true})
        res.json({msg : "You Are Sucessfully Registered"})
    } catch (error) {
        // const Error =  
        const Error = HanddleError(error)
        res.json({Error})        
    }
}

module.exports.deptsignup = async (req,res)=>{
    const  deptpersonDetail = req.body
    const p = await FindInDb(deptpersonDetail.AadharNumber)
    
    if (!p) {
        res.json({msg : "You are not in the government Database"})
        return
    }
  
    
    try {
        const deptperson = await Dept.create(deptpersonDetail)
        const deptpersonid = deptperson._id
        const token = tokenize(deptpersonid)
        res.cookie("jwt",token , {httpOnly : true})
        res.json({msg : "You Are Sucessfully Registered"})
    } catch (error) {
        const Error = HanddleError(error)
        res.json({Error})
    }
}
module.exports.publiclogin = async (req,res)=>{
    const body= req.body
    // console.log(body);
    const Email = body.Email
    const Password = body.Password
    try {
        const p = await User.login(Email,Password)
        const token = tokenize(p._id)
        res.cookie("jwt",token,{httpOnly: true})
        res.json({msg : "you are logged in"})
    } catch (error) {
        const ErrorMsg = HanddleError2(error)
        res.status(400).json({ErrorMsg})
    }
}

