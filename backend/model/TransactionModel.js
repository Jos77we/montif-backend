const mongoose = require("mongoose")

const transactionSchema = mongoose.Schema({
    name: {type: String},
    idNo: {type: String},
    transactionId: {type: String},
    accountNo: {type: String},
    typeOfTransaction: {type: String},
    amount: {type: String},
    recieverId: {type: String},
    receiverAccountNo: {type: String}

},
{
  timestamps: true
})

module.exports = mongoose.model("Transactions", transactionSchema)