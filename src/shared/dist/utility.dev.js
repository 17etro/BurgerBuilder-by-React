"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.checkValidaty = void 0;

var checkValidaty = function checkValidaty(value, rules) {
  var isValid = true;

  if (rules.required) {
    isValid = value.trim() !== "" && isValid;
  }

  if (rules.minLength) {
    isValid = value.length >= rules.minLength && isValid;
  }

  if (rules.maxLength) {
    isValid = value.length <= rules.maxLength && isValid;
  }

  return isValid;
};

exports.checkValidaty = checkValidaty;