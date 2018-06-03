export let formState = {};
const subscribers = [];

export const setFormState = newFormState => {
  formState = {
    ...formState,
    ...newFormState,
  };

  subscribers.map(cb => cb());
};

setFormState.subscribe = cb => {
  subscribers.push(cb);
};
