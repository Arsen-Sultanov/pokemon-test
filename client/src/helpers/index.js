export const toObjectValidationError = (error) => {
  if (!error) return null;

  return error.details.reduce((accumulator, value) => {
    if (accumulator[value.path[0]]) {
      return accumulator;
    }
    accumulator[value.path[0]] = value.message;

    return accumulator;
  }, {});
};

export const toArrayValidationError = (error) => {
  if (!error) return [];

  return error.details.reduce((accumulator, value) => {
    if (accumulator[value.path[0]]) {
      return accumulator;
    }
    accumulator.push(value.message);
    return accumulator;
  }, []);
};
