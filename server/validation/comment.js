const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateCommentInput(data){
  let errors = {};
    data.comment = !isEmpty(data.comment)?data.comment:'';
    data.project = !isEmpty(data.project)?data.project:'';
    data.user = !isEmpty(data.user)?data.user:'';
    data.date = !isEmpty(data.date)?data.date:'';

    
  if (Validator.isEmpty(data.comment)) {
    errors.comment = 'Comment field is required';
  }
  if (Validator.isEmpty(data.project)) {
    errors.project = 'project field is required';
  }
  if (Validator.isEmpty(data.user)) {
    errors.user = 'user field is required';
  }
  if (Validator.isEmpty(data.user)) {
    errors.user = 'user field is required';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};