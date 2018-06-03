export default function getStateClassNames(state, classNames) {
  const classes = [];
  const keys = Object.keys(state);

  for (let i = 0; i < keys.length; i++) {
    if (state[keys[i]] && classNames[keys[i]])
      classes.push(classNames[keys[i]]);
  }

  return classes.join(' ');
}
