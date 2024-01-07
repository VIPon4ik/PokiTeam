export const validationSchema = {
  minLength: { value: 2, message: `Minimum length 2 letters` },
  maxLength: { value: 12, message: `Max length 12 letters` },
  required: { value: true, message: 'This field is required' }, pattern: {
    value: /^[a-zA-Z]+$/,
    message: 'Only characters from a-z and A-Z are accepted.',
  },
}