import { exists, isString, isObject } from './identification';

// This powers the "drill" update API, which lets
// you specify the path that you want to apply the
// updates to.
export default function objectFromPath(path, changes) {
  if (exists(changes) && exists(path) && !isString(path)) {
    return {};
  }

  if (isObject(path) && !exists(changes)) {
    return path;
  }

  if (!path) {
    return changes || {};
  }

  var pathParts = path.split('.');

  var target;
  return pathParts.reduce((result, val, index) => {
    target = target || result;
    const isLastPart = index === pathParts.length - 1;
    target[val] = isLastPart ? changes : {};
    target = target[val];
    return result;
  }, {});
}
