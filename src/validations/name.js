const validateName = (name) => {
  // validate mandatory
  if (!name) {
    return { isValid: false, message: 'please input your name' };
  }

  return { isValid: true, message: '' };
};

export default validateName;
