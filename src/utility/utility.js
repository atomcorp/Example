export const once = fn => {
  let result;
  return (...args) => {
    if (!result) {
      result = fn(...args);
    }
    return result;
  }
};