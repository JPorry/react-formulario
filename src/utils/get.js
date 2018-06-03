export default function get(obj, location) {
  if (!location) return obj;
  let keys = location.split('.');

  for (let i = 0; i < keys.length; i++) {
    if (!obj[keys[i]]) {
      return '';
    }

    obj = obj[keys[i]];
  }

  return obj;
}
