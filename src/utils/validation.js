import * as yup from "yup";

const nameField = yup
  .string()
  .required("Имя обязательно!")
  .min(2, "Минимум 2 символа!")
  .max(50, "Максимум 50 символов!");

const emailField = yup
  .string()
  .required("Email обязателен!")
  .email("Неверный формат email!");

const passwordField = yup
  .string()
  .required("Пароль обязателен!")
  .min(6, "Минимум 6 символов!")
  .max(50, "Максимум 50 символов!");

const createSchema = (includeName = true) => {
  const shape = {
    email: emailField,
    password: passwordField,
  };

  if (includeName) shape.name = nameField;

  return yup.object().shape(shape);
};

export const registerSchema = createSchema();
export const loginSchema = createSchema(false);
