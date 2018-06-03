import getStateClassNames from './utils/get-state-class-names';
import getValidity from './utils/get-validity';
import getErrorObject from './utils/get-error-object';
import { formState, setFormState } from './utils/form-state';
import deepInsert from './utils/deep-insert';
import get from './utils/get';

export default function input(
  formName,
  {
    name,
    defaultValue = '',
    validators = {},
    transform,
    className,
    stateClassNames,
    onChange,
    onClick,
    ...props
  }
) {
  const inputExists = get(formState, `${formName}.fields.${name}`);
  const isChekedRadio =
    props.type === 'radio' &&
    !get(formState, `${formName}.fields.${name}.value`) &&
    props.checked;

  if (!inputExists || isChekedRadio) {
    if (props.type === 'checkbox') {
      defaultValue = !!props.checked;
    }

    if (props.type === 'radio') {
      defaultValue = props.checked ? props.value : '';
    }

    const val = transform ? transform(defaultValue) : defaultValue;
    const errors = getErrorObject(validators, val, formState[formName].fields);
    const isValid = getValidity(errors);
    const initialState = {
      pristine: true,
      dirty: false,
      touched: false,
      valid: isValid,
      invalid: !isValid
    };
    setFormState(
      deepInsert(formState, `${formName}.fields.${name}`, {
        value: val,
        state: initialState,
        errors,
        validators,
        transform
      })
    );
  }

  let elementValue;
  const formElementValue = get(formState, `${formName}.fields.${name}.value`);

  if (props.type === 'checkbox') {
    elementValue = {
      checked: !!formElementValue
    };
  } else if (props.type === 'radio') {
    elementValue = {
      checked: formElementValue === props.value
    };
  } else {
    elementValue = {
      value: formElementValue
    };
  }

  return {
    ...props,
    name,
    className:
      className +
      ' ' +
      getStateClassNames(
        formState[formName].fields[name].state,
        stateClassNames || {}
      ),
    onChange: e => {
      const value =
        props.type === 'checkbox' ? e.target.checked : e.target.value;
      const transform = formState[formName].fields[name].transform;
      const val = transform ? transform(value) : value;
      const errors = getErrorObject(
        formState[formName].fields[name].validators,
        val,
        formState[formName].fields
      );
      const isValid = getValidity(errors);

      setFormState(
        deepInsert(formState, `${formName}.fields.${name}`, {
          value: val,
          state: {
            pristine: false,
            dirty: true,
            valid: isValid,
            invalid: !isValid
          },
          errors
        })
      );
      onChange && onChange(e);
    },
    onClick: e => {
      setFormState(
        deepInsert(formState, `${formName}.fields.${name}.state.touched`, true)
      );
      onClick && onClick(e);
    },
    ...elementValue
  };
}
