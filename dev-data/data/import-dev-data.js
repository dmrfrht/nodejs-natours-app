const fs = require('fs')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const Tour = require('../../models/tourModel')

dotenv.config({ path: './config.env' })

mongoose.connect("mongodb+srv://rootUser:0246813579@cluster0.ww4aa.mongodb.net/natoursDB?retryWrites=true&w=majority", {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true
}).then(() => console.log("db connection successfuly"))

// read json file
const tours = JSON.parse(fs.readFileSync(`${__dirname}/tours-simple.json`, 'utf-8'))

// import data into db
const importData = async () => {
  try {
    await Tour.create(tours)
    console.log('data succesfully loaded!')
    process.exit()
  } catch (err) {
    console.log(err)
  }
}

// delete all data collection on db
const deleteData = async () => {
  try {
    await Tour.deleteMany()
    console.log('data succesfully deleted!')
    process.exit()
  } catch (err) {
    console.log(err)
  }
}

if (process.argv[2] === '--import') {
  importData()
} else if (process.argv[2] === '--delete') {
  deleteData()
}


console.log(process.argv)

