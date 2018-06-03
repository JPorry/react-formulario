export function exists(val) {
  return typeof val !== 'undefined';
}

export function isArray(val) {
  return val instanceof Array;
}

export function isSet(val) {
  return exists(val) && val !== null;
}

export function isObject(val) {
  return isSet(val) && val.constructor === Object;
}

export function isString(val) {
  return typeof val === 'string';
}

export function isNumber(val) {
  return typeof val === 'number';
}

export function isBoolean(val) {
  return typeof val === 'boolean';
}

export function isFunction(val) {
  return typeof val === 'function';
}

export function isNull(val) {
  return val === null;
}
