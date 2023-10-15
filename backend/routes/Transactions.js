const express = require("express")
const transact = require('../model/TransactionModel')
const user = require("../model/UsersModel")
const asyncHandler = require('express-async-handler')

const router = express()

router.post("/new-transaction", asyncHandler(async(req, res) => {
    const {
    name,
    idNo,
    transactionId,
    accountNo,
    typeOfTransaction,
    amount,
    recieverId,
    receiverAccountNo
    } = req.body

    const verify = await user.findOne({idNo, name})
    if(!verify){
        res.status(400).json({statusCode: 9001, message:"Access restricted"})
    }

    const newTransaction = transact.create({name,
        idNo,
        transactionId,
        accountNo,
        typeOfTransaction,
        amount,
        recieverId,
        receiverAccountNo})

        if(newTransaction){
            res.status(200).json({message: "Succesful transaction"})
        }else{
            res.status(400)
            throw new Error("Transaction Failed")
        }
}))

router.get("/all-transactions", asyncHandler(async(req, res) => {
    try {
        const allTransactions = await transact.find({})
        res.status(200).json(allTransactions)
        
    } catch (error) {
        res.status(400).json(error)
    }
    
}))

module.exports = router