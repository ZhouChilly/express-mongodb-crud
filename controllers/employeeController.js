const express = require('express')
const mongoose = require('mongoose')

const Employee = mongoose.model('Employee')
const router = express.Router()

router.get('/', (req, res) => {
  res.render('employee/addOrEdit', {
    viewTitle: 'Insert Employee'
  })
})

router.post('/', (req, res) => {
  const { _id } = req.body
  if (!_id) {
    insertRecord(req, res)
  } else {
    updateRecord(req, res)
  }
})

const insertRecord = (req, res) => {
  const { fullName, email, mobile, city } = req.body
  const employee = new Employee({ fullName, email, mobile, city })
  employee.save((err) => {
    if (!err) {
      res.redirect('/employee/list')
    } else {
      if (err.name === 'ValidationError') {
        handleValidationError(err, req.body)
        res.render('employee/addOrEdit', {
          viewTitle: 'Insert Employee',
          employee: req.body
        })
      } else {
        console.log('Error during record insertion : ' + err)
      }
    }
  })
}

const updateRecord = (req, res) => {
  Employee.findOneAndUpdate({ _id: req.body._id }, req.body, { new: true }, (err) => {
    if (!err) {
      res.redirect('/employee/list')
    } else {
      if (err.name === 'ValidationError') {
        handleValidationError(err, req.body)
        res.render('employee/addOrEdit', {
          viewTitle: 'Insert Employee',
          employee: req.body
        })
      } else {
        console.log('Error during record update : ' + err)
      }
    }
  })
}

router.get('/list', (_, res) => {
  Employee.find((err, docs) => {
    if (!err) {
      res.render('employee/list', {
        list: docs
      })
    } else {
      console.log('Error in retrieving employee list : ' + err)
    }
  })
})

const handleValidationError = (err, body) => {
  for (field in err.errors) {
    switch (err.errors[field].path) {
      case 'fullName':
        body['fullNameError'] = err.errors[field].message
        break
      case 'email':
        body['emailError'] = err.errors[field].message
        break
      default:
        break
    }
  }
}

router.get('/:id', (req, res) => {
  Employee.findById(req.params.id, (err, doc) => {
    if (!err) {
      res.render('employee/addOrEdit', {
        viewTitle: 'Update Employee',
        employee: doc
      })
    } else {
      console.log('Error in retrieving employee list : ' + err)
    }
  })
})

router.get('/:id', (req, res) => {
  Employee.findById(req.params.id, (err, doc) => {
    if (!err) {
      res.render('employee/addOrEdit', {
        viewTitle: 'Update Employee',
        employee: doc
      })
    } else {
      console.log('Error in retrieving employee list : ' + err)
    }
  })
})

router.get('/delete/:id', (req, res) => {
  Employee.findOneAndDelete({ _id: req.params.id }, (err) => {
    if (!err) {
      res.redirect('/employee/list')
    } else {
      console.log('Error in employee delete : ' + err)
    }
  })
})

module.exports = router
