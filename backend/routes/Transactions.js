const express = require("express");
const transact = require("../model/TransactionModel");
const account = require("../model/Account");
const user = require("../model/UsersModel");
const asyncHandler = require("express-async-handler");

const router = express();


router.get(
  "/all-transactions",
  asyncHandler(async (req, res) => {
    try {
      const allTransactions = await transact.find().sort({ createdAt: -1 });
      res.status(200).json(allTransactions);
    } catch (error) {
      res.status(400).json(error);
    }
  })
);

router.post(
  "/transacted",
  asyncHandler(async (req, res) => {
    const {
      name,
      idNo,
      transactionId,
      accountNo,
      typeOfTransaction,
      amount,
      recieverId,
      receiverAccountNo,
      accountName,
    } = req.body;

    const verify = await user.findOne({ idNo, name });
    if (!verify) {
      res.status(400).json({ statusCode: 9001, message: "User unknown" });
    }

    try {
      const accountExist = await account.findOne({ idNo, accountName });

      if (!accountExist) {
        return res.status(400).json({ message: "Invalid Account" });
      }

      const stringVal1 = amount;
      const floatNum = parseFloat(stringVal1);
      const roundedVal1 = floatNum.toFixed(2);
      const finalFloatValue1 = parseFloat(roundedVal1);

      const stringVal2 = accountExist.amount;
      const floatNum1 = parseFloat(stringVal2);
      const roundedVal2 = floatNum1.toFixed(2);
      const finalFloatValue2 = parseFloat(roundedVal2);

      if (finalFloatValue1 > finalFloatValue2) {
        return res
          .status(400)
          .json({ amount: amount, message: "The amount passed is invalid" });
      } else {
        const newAmount = finalFloatValue2 - finalFloatValue1;
        const stringValue = newAmount.toString();

        const newTransaction = transact.create({
          name,
          idNo,
          transactionId,
          accountNo,
          typeOfTransaction,
          amount,
          recieverId,
          receiverAccountNo,
        });

        if (newTransaction) {
          const updatedValue = await account.findOneAndUpdate(
            { _id: accountExist._id }, // Use _id to identify the document
            { amount: stringValue }, // Update the 'amount' field
            { new: true }
          );
          if (!updatedValue) {
            res
              .status(400)
              .json({ statusCode: 9000, message: "Could not update value" });
          }
        } else {
          res.status(400);
          throw new Error("Transaction Failed");
        }

        return res
          .status(200)
          .json({ amount: stringValue, message: "New amount to be updated" });
      }
    } catch (error) {
      res.status(400).json(error);
    }
  })
);

module.exports = router;
