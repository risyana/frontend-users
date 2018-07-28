const validatePhone = (phone, existingUser) => {
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
  if (existingUser.phone.find(existingPhone => existingPhone === phone)) {
    return { isValid: false, message: 'phone number already taken' };
  }

  return { isValid: true, message: '' };
};

export default validatePhone;
