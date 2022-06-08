/**
 * validates email
 * @param {String} value
 * @returns String empty or error message
 */
export const isEmailValid = (value) => {
  const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (value && value.toLowerCase().match(emailRegex)) {
    return '';
  }
  return 'Must be a valid email';
};

/**
 * validates check-in date
 * @param {String} value
 * @returns String empty or error message
 */
export const isCheckInDateValid = (value) => {
  const dateRegex = /^(0[1-9]|1[0-2])-(0[1-9]|1\d|2\d|3[01])-(19|20)\d{2}$/;
  if (value && value.match(dateRegex)) {
    return '';
  }
  return 'Date must be mm-dd-yyyy';
};

/**
 * validates number of nights
 * @param {String} value
 * @returns String empty or error message
 */
export const isNumberOfNightsValid = (value) => {
  if (value && value > 0) {
    return '';
  }
  return 'Must be number greater than zero';
};

/**
 * checks to see if there are errors in the given object
 * @param {Object} errorMessages
 * @returns boolean
 */
export const areErrorsPresent = (errorMessages) => !Object.values(errorMessages).some((error) => (error !== ''));

/**
 * calls the service methods to validate the object against
 * @param {Object} formValues
 * @returns Object of error messages
 */
export const validateForm = (formValues) => {
  const errorMessages = {};
  errorMessages.email = isEmailValid(formValues?.guestEmail);
  errorMessages.checkInDate = isCheckInDateValid(formValues?.checkInDate);
  errorMessages.numberOfNights = isNumberOfNightsValid(formValues?.numberOfNights);
  return errorMessages;
};
