import { TextInput } from 'react-native-paper';

type PhoneInputProps = {
  error?: string,
  label: string,
  phoneNumber: string,
  onChangeText: (value: string) => void
};

export default function PhoneInput(
  {
    error,
    label,
    phoneNumber,
    onChangeText,
  }
  : PhoneInputProps,
) {
  const handleChange = (value: string) => {
    onChangeText(value);
  };

  const formatPhoneNumber = () => {
    const digits = phoneNumber.replace(/\D/g, '');

    return [...digits].reduce((formattedPhoneNumber, digit, index) => {
      if (index === 0) {
        return `(${digit}`;
      }

      if (index === 3) {
        return `${formattedPhoneNumber}) ${digit}`;
      }

      if (index === 6) {
        return `${formattedPhoneNumber}-${digit}`;
      }

      return `${formattedPhoneNumber}${digit}`;
    }, '');
  };

  return (
    <TextInput
      autoComplete="tel"
      error={!!error}
      keyboardType="phone-pad"
      label={label}
      maxLength={14}
      textContentType="telephoneNumber"
      value={formatPhoneNumber()}
      onChangeText={handleChange}
    />
  );
}

PhoneInput.defaultProps = {
  error: '',
};
