import * as yup from "yup";

export const promocodeSchema = yup.object().shape({
  name: yup
    .string()
    .trim()
    .required("Укажите название промокода")
    .max(30, "Не больше 30 символов"),
  title: yup
    .string()
    .trim()
    .required("Заполните заголовок")
    .max(120, "Не больше 120 символов"),
  description: yup
    .string()
    .trim()
    .optional()
    .max(250, "Не больше 250 символов"),
  amount: yup.number().required("Укажите количество баллов"),
  start: yup.date().required("Обязательное поле"),
  end: yup.date().when("isUnlimited", {
    is: true,
    then: (schema) => schema.strip(),
    otherwise: (schema) => schema.required("Обязательное поле"),
  }),
  isUnlimited: yup.boolean(),
  limit: yup.number().required("Укажите лимит активаций"),
  sendToUsers: yup.boolean(),
});
