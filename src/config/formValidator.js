import * as yup from "yup";

export const signupValidator = yup.object({
  name: yup.string().required(),
  email: yup
    .string()
    .email("Invalid email address")
    .required("Email is required"),
  password: yup
    .string()
    .min(8, "Password must be at least 8 characters")
    .required("Password is required"),
});
export const loginValidator = yup.object({
  email: yup
    .string()
    .email("Invalid email address")
    .required("Email is required"),
  password: yup
    .string()
    .min(8, "Password must be at least 8 characters")
    .required("Password is required"),
});
export const postValidator = yup.object({
  title: yup.string().required().min(5).trim("white spaces are not allowed"),
  slug: yup.string().required().min(5),
  content: yup.string().required().min(8),
  featuredImage: yup
    .mixed()
    .required()
    .test(
      "fileSize",
      "File size is too large",
      (value) => value[0]?.size <= 2097152 // Adjust the size limit as needed (in bytes)
    ),
  alt: yup.string().required(),
});
