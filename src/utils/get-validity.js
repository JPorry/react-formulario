export default function getValidity(errorObject) {
  const keys = Object.keys(errorObject);

  for (let i = 0; i < keys.length; i++) {
    if (errorObject[keys[i]]) return false;
  }

  return true;
}
