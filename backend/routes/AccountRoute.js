const express = require("express")
const account = require("../model/Account")
const asyncHandler = require('express-async-handler')

const router = express()

router.post("/new-account", asyncHandler(async(req, res) =>{
    const {name, 
        idNo, 
        accountNo, 
        accountName, 
        cardNo, 
        amount, 
        depositStamp, 
        withdrawStamp, 
        status,
        deductions, 
        subscriptions} = req.body

        const newAccount = await account.create({name, 
            idNo, 
            accountNo, 
            accountName, 
            cardNo, 
            amount, 
            depositStamp, 
            withdrawStamp, 
            status,
            deductions, 
            subscriptions})

            if (newAccount){
                res.status(200).json({message:"Account created"})
            }else {
                res.status(400)
                throw new Error('Error occured')
            }

}))

router.get("/all-accounts", asyncHandler(async(req, res) => {
    try {
        const allAccounts = await account.find({})
        res.status(200).json(allAccounts)
        
    } catch (error) {
        res.status(400).json(error)
    }
   
}))

router.get("/account-type", asyncHandler(async(req, res) =>{
    const {idNo} = req.query

    try {
        const type = await account.findOne({idNo: {$in: idNo}})

        if(type){
            res.status(200).json({accountName: type.accountName, accountNo: type.accountNo, amount: type.amount, status: type.status})
        }else{
            res.status(400).json({message:'Error occured'})
        }
    } catch (error) {
        res.status(400).json(error)
    }
}))


module.exports = router