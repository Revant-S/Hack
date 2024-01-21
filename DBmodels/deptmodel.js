const mongoose = require("mongoose")
const bcrypt = require("bcrypt")
const zod = require("zod")
const EmailScheme = zod.string().email()
const DepartMentStaffScheme = new mongoose.Schema({
    FirstName : {
        type : String,
        required : true
    },
    LastName : String,
    Department : {
        type : String,
        required : true,
    },
    Post : {
        type : String,
        required : true
    },
    Email : {
        type : String,
        required : true,
        validate : [(value)=>{return EmailScheme.safeParse(value).success},"Please Enter a Valid Email address"]
    },
    Age : {
        type : Number,
        required : true,
        min : [18,"The ageof the user must be equal to or more than 18 "]
    },
    gender : {
        type : String,
        required : true,
        lowercase : true
    },
    AadharNumber : {
        type : String,
        required : true,
        unique : true,
    },
    Mobile : {
        type : Number,
        required : true
    },
    Password : {
        type : String,
        minlength : 10,
        required: true,
    }
})

const DepartmentPerson = mongoose.model("DeptPersonDetails",DepartMentStaffScheme)
DepartMentStaffScheme.pre("save",async function (next) {
    const salt = await bcrypt.genSalt(5)
    this.Password = await bcrypt.hash(this.Password,salt)
    next()
})


module.exports = DepartmentPerson