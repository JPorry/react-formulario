import { exists, isString, isObject } from './identification';
import objectFromPath from './object-from-path';
import merge from './merge';

export default function deepInsert(obj, path, val) {
  if (!isObject(obj) || !isString(path) || !exists(val)) {
    return obj;
  }

  return merge(obj, objectFromPath(path, val), true);
}
