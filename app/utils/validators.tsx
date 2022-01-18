export const validateEmail = (email: string) => {
  if (!email) {
    return 'Please enter an email';
  }

  if (!/\S+@\S+\.\S+/.test(email)) {
    return 'Please enter a valid email';
  }

  return '';
};

export const validatePassword = (password: string) => {
  if (!password) {
    return 'Please enter a password';
  }

  if (password.length < 8) {
    return 'Password must be at least 8 characters';
  }

  return '';
};
