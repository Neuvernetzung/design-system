export default {
  required: "This field is required!",
  cancel: "Cancel",
  confirm: "Confirm",
  loading: "Loading...",
  colorpicker_placeholder: "Choose color",
  min: (v?: string) =>
    v ? `The min value is ${v}.` : "The minimum value is not met.",
  max: (v?: string) =>
    v ? `The max value is ${v}.` : "The maximum value is not met.",
  invalidTime: "This is not a correct time.",
  minLength: (v?: string) =>
    v ? `The min length is ${v}.` : "The min length is not correct.",
  maxLength: (v?: string) =>
    v ? `The max length is ${v}.` : "The max length is not correct.",
  pattern: "The field is not in the correct format",
  validation: "The validation of the field is not correct",
};
