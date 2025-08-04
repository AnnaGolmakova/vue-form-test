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
    .max(250, "Не больше 250 символов")
    .default(""),
  amount: yup
    .number()
    .transform((value) => (isNaN(value) ? undefined : value))
    .positive("Количество должно быть больше нуля")
    .required("Укажите количество баллов"),
  start: yup.date().required("Выберите дату начала действия промокода"),
  end: yup.date().when("isUnlimited", {
    is: true,
    then: (schema) => schema.strip(),
    otherwise: (schema) =>
      schema.required(
        "Укажите дату окончания или отметьте галку «Без даты конца»",
      ),
  }),
  isUnlimited: yup.boolean(),
  limit: yup
    .number()
    .transform((value) => (isNaN(value) ? undefined : value))
    .positive("Лимит должен быть больше нуля")
    .required("Укажите лимит активаций"),
  sendToUsers: yup.boolean(),
});
