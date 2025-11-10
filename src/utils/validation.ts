import * as yup from "yup";

// поля
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

// функция для создания схемы
const createSchema = <T extends boolean = true>(includeName: T = true as T) => {
  const shape: Record<string, any> = {
    email: emailField,
    password: passwordField,
  };

  if (includeName) shape.name = nameField;

  return yup.object().shape(shape) as T extends true
    ? yup.ObjectSchema<{ name: string; email: string; password: string }>
    : yup.ObjectSchema<{ email: string; password: string }>;
};

// схемы
export const registerSchema = createSchema(true);
export const loginSchema = createSchema(false);
export const schemaNewPost = yup.object().shape({
  file: yup
    .array()
    .min(1, "Добавьте хотя бы одно фото")
    .max(5, "Можно загрузить не более 5 фото")
    .required("Это поле обязательно"),

  description: yup.string().required("Описание не может быть пустым"),
});

export const schemaEditProfile = yup.object().shape({
  name: yup
    .string()
    .required("Имя обязательно!")
    .min(2, "Минимум 2 символа!")
    .max(50, "Максимум 50 символов!"),
  bio: yup.string().default(""),
});

// типы форм
export type RegisterFormData = yup.InferType<typeof registerSchema>;
export type LoginFormData = yup.InferType<typeof loginSchema>;
export type NewPostFormData = yup.InferType<typeof schemaNewPost>;
export type EditProfileFormData = yup.InferType<typeof schemaEditProfile>;
