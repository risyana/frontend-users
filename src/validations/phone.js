import CONFIG from '../config/config';
import HEADER from '../config/header';

const { ENDPOINT } = CONFIG;

const validatePhone = async (phone, initialPhone) => {
  // compare new phone with initial phone in Edit Profile function
  if(initialPhone) {
    if (initialPhone === phone) return { isValid: true, message: '' };
  }

  // validate mandatory
  if (!phone) {
    return { isValid: false, message: 'please input phone number' };
  }

  // validate format. valid example : 0856111111111, +62856111111111
  const phoneFormat = /^(0|\+[0-9]{1,4})?[0-9]{6,}$/g;
  if (!phone.match(phoneFormat)) {
    return { isValid: false, message: 'invalid phone number' };
  }

  // validate unique (check existing phone number)
  const res = await fetch(`${ENDPOINT}/users/phones`, {
    method: 'POST',
    mode: 'cors',
    body: JSON.stringify({ phone }),
    headers: { ...HEADER },
  });
  const result = await res.json();
  const isAvailable = result.row.COUNT === 0;
  if (!isAvailable) {
    return { isValid: false, message: 'phone number already taken' };
  }

  return { isValid: true, message: '' };
};

export default validatePhone;
