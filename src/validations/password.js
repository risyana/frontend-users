// PASSWORD
export const validatePassword = (password) => {
  // validate mandatory
  if (!password) {
    return { isValid: false, message: 'please input password' };
  }

  // validate password criteria : 8 digit; contain word and letter
  const passwordFormat = /^(?=.*?\D)(?=.*?\d).{8,}$/g;
  if (!password.match(passwordFormat)) {
    return { isValid: false, message: 'password must at least 8 digit which contain letter and number' };
  }

  return { isValid: true, message: '' };
};


// RETYPE PASSWORD
export const validateRePassword = (rePassword, isValid, password) => {
  // validate mandatory
  if (!rePassword) {
    return { isValid: false, message: 'please retype password' };
  }

  // check if the password already valid
  if (!isValid) {
    return { isValid: false, message: 'the above password is not valid yet' };
  }

  // compare with password
  if (rePassword !== password) {
    return { isValid: false, message: 'password doesn\'t match' };
  }

  return { isValid: true, message: '' };
};
