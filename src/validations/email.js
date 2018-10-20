import EmailValidator from 'email-validator'; 
import CONFIG from '../config/config';
import HEADER from '../config/header';

const { ENDPOINT } = CONFIG;

const validateEmail = async (email) => {
  // validate mandatory
  if (!email) {
    return { isValid: false, message: 'please input email' };
  }

  // validate format
  if (!EmailValidator.validate(email)) {
    return { isValid: false, message: 'invalid email' };
  }

  // validate uniqueness (check existing email)
  const res = await fetch(`${ENDPOINT}/users/emails`, {
    method: 'POST',
    mode: 'cors',
    body: JSON.stringify({ email }),
    headers: { ...HEADER },
  });
  const result = await res.json();
  const isAvailable = result.row.COUNT === 0;
  if (!isAvailable) {
    return { isValid: false, message: 'email already taken' };
  }

  return { isValid: true, message: '' };
};

export default validateEmail;
