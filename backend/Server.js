const express = require('express')
const dotenv = require('dotenv').config()
const connectDb = require('./config/database')
const bodyParser = require('body-parser')
const cors = require('cors')
const port = process.env.PORT || 8000

connectDb()
const app = express()
app.use(cors())

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

app.use("/montif/newUser", require('./routes/Users'))
app.use("/montif/accounts", require('./routes/AccountRoute'))
app.use("/montif/transactions", require('./routes/Transactions'))
app.use("/montif/card", require("./routes/CardRouter"))
app.listen(port, () => console.log(`server started on port ${port}`))