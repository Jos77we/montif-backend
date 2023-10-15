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

module.exports = router