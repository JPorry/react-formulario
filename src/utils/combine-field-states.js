export default function combineFieldStates(formSlice) {
  let state = {
    pristine: true,
    dirty: false,
    touched: false,
    valid: true,
    invalid: false
  };

  const fields = Object.keys(formSlice.fields);
  const fieldStates = fields.map(field => formSlice.fields[field].state);

  fieldStates.forEach(fieldState => {
    state = {
      pristine: state.pristine && fieldState.pristine,
      dirty: state.dirty || fieldState.dirty,
      touched: state.touched || fieldState.touched,
      valid: state.valid && fieldState.valid,
      invalid: state.invalid || fieldState.invalid
    };
  });

  return state;
}
