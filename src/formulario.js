import { Component } from 'react';
import combineFieldStates from './utils/combine-field-states';
import { formState, setFormState } from './utils/form-state';
import get from './utils/get';

import form from './form-prop-getter';
import input from './input-prop-getter';

const formCreator = name => {
  if (!formState[name]) {
    setFormState({
      [name]: {
        fields: {}
      }
    });
  }

  return {
    input: (...args) => input(name, ...args),
    form: (...args) => form(name, ...args),
    getInput: fieldName => {
      if (get(formState, `${name}.fields.${fieldName}`)) {
        return formState[name].fields[fieldName];
      }

      return { value: '', state: {}, errors: {} };
    },
    getForm: () => {
      if (formState[name]) {
        return {
          ...formState[name],
          state: combineFieldStates(formState[name])
        };
      }

      return { fields: {}, state: {} };
    }
  };
};

export default class Formulario extends Component {
  render() {
    const { children, name } = this.props;
    return children({ ...formCreator(name, this) });
  }

  componentDidMount() {
    setFormState.subscribe(() => {
      this.forceUpdate();
    });
  }
}
