/**
 * validates name
 * @param {String} value
 * @returns String empty or error message
 */
export const isNameValid = (value) => {
  if (value && value.length > 2) {
    return '';
  }
  return 'Must be at least 3 characters';
};

/**
 * validates rate
 * @param {Number or String} value
 * @returns String empty or error message
 */
export const isRateValid = (value) => {
  if (value && value > 0) {
    return '';
  }
  return ' Must be number greater than zero';
};

/**
 * checks to see if given object contains errors
 * @param {Object} errorMessages
 * @returns Boolean
 */
export const areErrorsPresent = (errorMessages) => !Object.values(errorMessages).some((error) => (error !== ''));

/**
 * calls the service methods to validate the formvalues against
 * @param {Object} formValues
 * @returns Object of error messages
 */
export const validateForm = (formValues) => {
  const errorMessages = {};
  errorMessages.name = isNameValid(formValues?.name);
  errorMessages.rate = isRateValid(formValues?.rate);
  return errorMessages;
};
