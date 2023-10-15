const mongoose = require("mongoose")

const accountSchema = mongoose.Schema({
    name:{type: String},
    idNo:{type: String},
    accountNo:{type: String},
    accountName:{type: String},
    cardNo:{type: String},
    amount:{type: String},
    depositStamp:{type: String},
    withdrawStamp:{type: String},
    status: {type: String, 
        enum: ['Active', 'Dormant', 'Terminated'],
    required: true},
    deductions: [
        {item: String, value: String}
    ],
    subscriptions: [
        {item: String, value: String}
    ]
},{
    timestamps: true
})

module.exports = mongoose.model("AccountDetails", accountSchema)