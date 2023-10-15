const express = require("express")
const asyncHandler = require("express-async-handler")
const card = require("../model/CardModel")
const user = require("../model/UsersModel")
const account = require("../model/Account")

const router = express()

router.post("/new-card", asyncHandler(async(req, res) => {
    const {
    idNo,
    name,
    accountNo,
    cardNo,
    cardType} = req.body

    const verifyUser = await user.findOne({idNo, name})
    const accountVerify = await account.findOne({idNo, accountNo})

    if(!verifyUser || !accountVerify){
        res.status(400).json({statusCode: 9001, message:"Access denided to user"})
    }

    const newCard = await card.create({
        idNo,
        name,
        accountNo,
        cardNo,
        cardType 
    })

    if(newCard){
        res.status(200).json({message:"Card created successfully"})
    }else{
        res.status(400)
        throw new Error("Card creation declined")
    }
}))

router.get("/cards", asyncHandler(async(req, res) => {
    try {
        const allCards = await card.find({})
        res.status(200).json(allCards)
        
    } catch (error) {
        res.status(400).json(error)
    }
    
}))

module.exports = router