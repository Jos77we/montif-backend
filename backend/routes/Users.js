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

//get all members
router.get("/members", asyncHandler(async(req, res) => {
  try {
    const all = await users.find({})
    res.status(200).json(all)
  } catch (error) {
    res.status(400).json(error)
  }
}))

//login
router.post("/login", asyncHandler(async(req, res) =>{
  try {
    const {name, email, password} = req.body
    if(!name || !email || !password){
        res.status(400).json({message:"Please enter fields"})
    }
    const userLogged = await users.findOne({email})
    if(userLogged){
    
      res.status(200).json({name: userLogged.name, idNo: userLogged.idNo, message:"Logged in successfully"})
    }else{
      res.status(400).json({message:"Something is wrong"})
    }

  } catch (error) {
    res.status(400).json(error)
  }
}))

router.get("/logged-user", asyncHandler(async(req, res) =>{
  const {idNo} = req.query
  try {
    const details = await users.findOne({idNo: {$in: idNo}})
    if(details){
      res.status(200).json({name: details.name, email: details.email})
    }else{
      res.status(400).json({message: "Error occured"})
    }
  } catch (error) {
    res.status(400).json(error)
  }
}))

module.exports = router