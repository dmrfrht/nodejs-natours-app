const mongoose = require('mongoose')
const dotenv = require('dotenv')

process.on('uncaughtException', err => {
  console.log('uncaughtException -- shutting down')
  console.log(err.name, err.message)
  process.exit(1)
})

dotenv.config({ path: './config.env' })
const app = require('./app')

mongoose.connect("mongodb+srv://rootUser:024681357@cluster0.ww4aa.mongodb.net/natoursDB?retryWrites=true&w=majority", {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true
})
  .then(() => console.log("db connection successfuly"))


const server = app.listen(process.env.PORT || 3000, () => {
  console.log(`App running on port: ${process.env.PORT}`)
})

process.on('unhandledRejection', err => {
  console.log('unhandledRejection -- shutting down')
  console.log(err.name, err.message)
  server.close(() => {
    process.exit(1)
  })
})

// console.log(x)
