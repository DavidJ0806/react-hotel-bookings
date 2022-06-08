/**
 * validates email
 * @param {String} value
 * @returns String empty or error message
 */
export const isEmailValid = (value) => {
  const emailRegex = /(^manager@hotelapi.com$)|(^employee@hotelapi.com$)/;
  if (value && value.match(emailRegex)) {
    return '';
  }
  return 'Invalid email or password';
};
/**
 * validates password
 * @param {String} value
 * @returns String empty or error message
 */
export const isPasswordValid = (value) => {
  const passwordRegex = /^password$/;
  if (value && value.match(passwordRegex)) {
    return '';
  }
  return 'Invalid email or password';
};

/**
 * checks all the object for errors and returns boolean
 * @param {Object} errorMessages
 * @returns boolean
 */
export const areErrorsPresent = (errorMessages) => !Object.values(errorMessages).some((error) => (error !== ''));

/**
 * calls validation services to create an error object
 * @param {Object} formValues
 * @returns Object of errors
 */
export const validateForm = (formValues) => {
  const errorMessages = {};
  errorMessages.email = isEmailValid(formValues?.email);
  errorMessages.password = isPasswordValid(formValues?.password);
  // per requirements, quick patch job to make only one message show up
  if (errorMessages.email !== '') errorMessages.password = '';
  if (errorMessages.password !== '') errorMessages.email = '';
  return errorMessages;
};
