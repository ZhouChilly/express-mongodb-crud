const  mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017/EmployeeDB', {
  useNewUrlParser: true,
  useFindAndModify: false
}, (err) => {
  if (!err) {
    console.log('MongoDB Connection Succeeded')
  } else {
    console.log('Error in MongoDB Connection : ' + err)
  }
})

require('./employee.model')
