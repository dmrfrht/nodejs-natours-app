const mongoose = require('mongoose')
const dotenv = require('dotenv')

dotenv.config({ path: './config.env' })
const app = require('./app')

mongoose.connect("mongodb+srv://rootUser:0246813579@cluster0.ww4aa.mongodb.net/natoursDB?retryWrites=true&w=majority", {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true
}).then(() => console.log("db connection successfuly"))

app.listen(process.env.PORT || 3000, () => {
  console.log(`App running on port: ${process.env.PORT}`)
})
