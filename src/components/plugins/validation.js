import * as Yup from "yup";

export const signup_schema = Yup.object({
  username: Yup.string().required("Username is required"),
  phone: Yup.string()
    .required("phone is required")
    .matches(/^\d{3}-\d{2}-\d{3}-\d{2}-\d{2}/, "phone is invalid"),
  email: Yup.string().required("email is required").email("email is invalid"),
  password: Yup.string()
    .required("password is required")
    .min(2, "password must be at least 2 characters"),
});
