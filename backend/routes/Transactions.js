const express = require("express")
const transact = require('../model/TransactionModel')
const account = require("../model/Account")
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
        const allTransactions = await transact.find().sort({ createdAt: -1 });
        res.status(200).json(allTransactions)
        
    } catch (error) {
        res.status(400).json(error)
    }
    
}))

router.post("/transcted", asyncHandler(async(req, res) => {
    const {idNo, amount, accountName} = req.body

    try {
        const accountExist = await account.findOne({idNo, accountName});

        if(!accountExist){
            return res.status(400).json({message:"Invalid Account"})
        }

        if(amount < accountExist.amount) {
            const stringVal1 = amount;
            const floatNum = parseFloat(stringVal1)
            const roundedVal1 = floatNum.toFixed(2)
            const finalFloatValue1 = parseFloat(roundedVal1);

            const stringVal2 = accountExist.amount;
            const floatNum1 = parseFloat(stringVal2)
            const roundedVal2 = floatNum1.toFixed(2)
            const finalFloatValue2 = parseFloat(roundedVal2);

            const newAmount = finalFloatValue2 - finalFloatValue1

            return res.status(200).json({amount: newAmount, message: "New amount to be updated"})
        }else{
            return res.status(400).json({message:"Amount passed isn't valid"})
        }
    } catch (error) {
        res.status(400).json(error)
    }
}))

module.exports = router