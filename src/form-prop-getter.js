import getStateClassNames from './utils/get-state-class-names';
import combineFieldStates from './utils/combine-field-states';
import { formState } from './utils/form-state';

export default function form(formName, options) {
  const {
    className,
    stateClassNames,
    onSubmit,
    onSubmitError,
    ...props
  } = options;
  return {
    ...props,
    noValidate: true,
    className:
      className +
      ' ' +
      getStateClassNames(
        combineFieldStates(formState[formName]),
        stateClassNames || {}
      ),
    onSubmit: e => {
      e.preventDefault();
      let _formState = { fields: {}, state: {} };
      const formStatus = combineFieldStates(formState[formName]);

      if (formState[formName]) {
        _formState = {
          ...formState[formName],
          state: formStatus,
        };
      }

      if (formStatus.valid) {
        options && options.onSubmit && options.onSubmit(e, _formState);
      } else {
        options &&
          options.onSubmitError &&
          options.onSubmitError(e, _formState);
      }
    },
  };
}
