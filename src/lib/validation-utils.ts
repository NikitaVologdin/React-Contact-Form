const containsNumbers = (value: string) => {
  const regex = /\d/;
  return regex.test(value);
};

const validEmail = (email: string) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export { containsNumbers, validEmail };
