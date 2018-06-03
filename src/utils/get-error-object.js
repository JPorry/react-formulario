export default function getErrorObject(validators, inputVal, formState) {
  const errorObject = {};
  Object.keys(validators).forEach(
    val => (errorObject[val] = validators[val](inputVal, formState))
  );

  return errorObject;
}
