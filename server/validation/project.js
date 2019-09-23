const Validator = require('validator');
const isEmpty = require('./is-empty');




module.exports = function validateProjectInput(data) {
  let errors = {};

  data.title = !isEmpty(data.title) ? data.title : '';
  data.description = !isEmpty(data.description) ? data.description : '';
  data.status = !isEmpty(data.status) ? data.status : '';
  data.date = !isEmpty(data.date) ? data.date : Date.now();
  //data.user = !isEmpty(data.user) ? data.user : '';

 

  if (Validator.isEmpty(data.title)) {
    errors.title = 'Title field is required';
  }
  if (!Validator.isLength(data.description, { min: 2, max: 100 })) {
    errors.description = 'Description must be between 2 and 30 characters';
  }

  if (Validator.isEmpty(data.description)) {
    errors.description = 'Description field is required';
  }

  if (Validator.isEmpty(data.status)) {
    errors.status = 'Status field is required';
  }

//   if (Validator.isEmpty(data.date)) {
//     errors.date = 'Date  field is required';
//   }
//   if (Validator.isEmpty(data.user)) {
//     errors.user = 'User Password field is required';
//   }

  
  return {
    errors,
    isValid: isEmpty(errors)
  };
};
