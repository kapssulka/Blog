export const createValidationObj = (fieldName = "") => {
  const requiredMessage = fieldName
    ? `Поле ${fieldName} является обязательным!`
    : "Это поле является обязательным!";
  const minLengthMessage = fieldName
    ? `Заполните ${fieldName} правильно!`
    : "Заполните поле правильно!";
  return {
    required: requiredMessage,
    minLength: {
      value: 3,
      message: minLengthMessage,
    },
  };
};
