import { isObject, exists } from './identification';

// This always returns an Object. Do not call this if you want to replace
// an Object with a primitive.
export default function merge(x, y, deep = false) {
  // If y is not an Object, then it is a primitive. Primitives
  // cannot be merged or cloned, so we return an empty object.
  if (!isObject(y)) {
    return Object.assign({}, x);
  }

  const isXObject = isObject(x);

  // If y _is_ an Object, but we don't want to deep merge, then we can do a
  // shallow clone.
  if (!deep) {
    // We only use x in our merge if it is an object, asrimitives cannot
    // be merged.
    const xToUse = isXObject ? x : {};

    return Object.assign({}, xToUse, y);
  }

  // If we have made it this far, then we need to do a merge merge, and we know that
  // at least y is an object.
  // We begin by making a clone of `y`.
  let output = Object.assign({}, y);

  // We can perform a deep merge when both x and y are objects
  if (isObject(x)) {
    // Loop through every key of x, and merge it with the y key.
    Object.keys(x).forEach(key => {
      // If the value is an object, then we either deep merge it with the
      // existing value, or we simply set it if it does not previously exist
      if (isObject(x[key])) {
        const yValue = y[key];

        if (!exists(yValue)) {
          output[key] = x[key];
        } else if (!isObject(yValue)) {
          output[key] = yValue;
        } else {
          output[key] = merge(x[key], yValue, true);
        }
      }

      // If this value from x is not an object, then it cannot be merged.
      // What we must do in this situation is set the value as the value from y,
      // if it exists. If it doesn't exist, then we keep the x value.
      else {
        output[key] = exists(y[key]) ? y[key] : x[key];
      }
    });
  }

  return output;
}
