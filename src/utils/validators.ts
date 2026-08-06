export const isValidEmail = (email: string): boolean =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

export const isValidPhone = (phone: string): boolean =>
  /^(\+91[\-\s]?)?[6-9]\d{9}$/.test(phone.replace(/\s/g, ''));

export const isValidPassword = (password: string): boolean =>
  password.length >= 8 &&
  /[A-Z]/.test(password) &&
  /[a-z]/.test(password) &&
  /\d/.test(password);

export const isValidPincode = (pincode: string): boolean =>
  /^[1-9][0-9]{5}$/.test(pincode);

export const isValidName = (name: string): boolean =>
  name.trim().length >= 2 && /^[a-zA-Z\s]+$/.test(name.trim());

export const getPasswordStrength = (password: string): 'weak' | 'medium' | 'strong' => {
  let score = 0;
  if (password.length >= 8) score++;
  if (password.length >= 12) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[a-z]/.test(password)) score++;
  if (/\d/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;
  if (score <= 2) return 'weak';
  if (score <= 4) return 'medium';
  return 'strong';
};

export const ValidationMessages = {
  required: 'This field is required',
  email: 'Enter a valid email address',
  phone: 'Enter a valid 10-digit mobile number',
  password: 'Password must be at least 8 characters with uppercase, lowercase and number',
  passwordMatch: 'Passwords do not match',
  pincode: 'Enter a valid 6-digit pincode',
  name: 'Enter a valid name (letters only, min 2 characters)',
  minLength: (n: number) => `Minimum ${n} characters required`,
  maxLength: (n: number) => `Maximum ${n} characters allowed`,
} as const;
