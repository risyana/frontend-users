import EmailValidator from 'email-validator';

const validateEmail = (email, existingUser) => {
  // validate mandatory
  if (!email) {
    return { isValid: false, message: 'please input email' };
  }

  // validate format
  if (!EmailValidator.validate(email)) {
    return { isValid: false, message: 'invalid email' };
  }

  // validate uniqueness (check existing email)
  if (existingUser.email.find(existingEmail => existingEmail === email)) {
    return { isValid: false, message: 'email address already taken' };
  }

  return { isValid: true, message: '' };
};

export default validateEmail;
