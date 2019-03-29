const { toString } = Object.prototype;

export default (): any => {
  try {
    const sign = JSON.parse(localStorage.user);

    return toString.call(sign) === "[object Object]" ? sign : {};
  } catch {
    return {};
  }
};
