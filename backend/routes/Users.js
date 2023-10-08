const express = require('express')
const users = require('../model/UsersModel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')
const {security} = require('../middleware/Authentification')

const router = express();

router.post("/user", asyncHandler(async (req,res) => { 
      const {name,
      age,
      country,
      email,
      phoneNo,
      idNo,
      addressLine,
      postalCode,
      field,
      occupation,
      company,
      salaryRange,
      password,
      securityQue,
      securityAns} = req.body


     if(!name || !email || !password || !idNo){
        res.status(400)
        throw new Error('Please enter fields')
        
    } 
      const userExist = await users.findOne({idNo})

      if(userExist){
        res.status(400)
        throw new Error('User already exists')
      }
      const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    const newUser = await users.create({name,
        age,
        country,
        email,
        phoneNo,
        idNo,
        addressLine,
        postalCode,
        field,
        occupation,
        company,
        salaryRange,
        password: hashedPassword,
        securityQue,
        securityAns})

        if (newUser){
         res.status(200).json({_id : newUser.id, name: newUser.name, country: newUser.country, idNo: newUser.idNo, token: generateJWT(newUser._id), message:"User registered successfully"})
        }else {
            res.status(400)
            throw new Error('Invalid credentials')
        }

}))

//Generate JWT
const generateJWT = (id) =>{
    return jwt.sign({id}, process.env.JWT_SECRET, {expiresIn: '20d'})
}

module.exports = router