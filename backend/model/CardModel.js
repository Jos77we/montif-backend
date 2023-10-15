const mongoose = require('mongoose')

const cardItem = mongoose.Schema({
    idNo: {type: String},
    name: {type: String},
    accountNo: {type: String},
    cardNo: {type: String},
    cardType: {type: String}
})

module.exports = mongoose.model("Cards", cardItem)