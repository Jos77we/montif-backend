const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    name:{type: String},
    age:{type: String, maxLength: 2},
    country: {type: String},
    email: {type: String, required: true},
    phoneNo: {type: String, maxLength: 13},
    idNo: {type: String},
    addressline:{type: String},
    postalCode: {type: String},
    field: {type: String},
    occupation: {type: String},
    company: {type: String},
    salaryRange: {type: String},
    password: {type: String, required: true},
    securityQue:{type: String},
    securityAns: {type: String}

})

module.exports = mongoose.model("UserInfo", userSchema)
