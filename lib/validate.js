export default function login_validate(values) {
  const errors = {};

  if (!values.email) {
    errors.email = "Email is required!";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
    errors.email = "Invalid email address";
  }

  if (!values.password) {
    errors.password = "Password is required!";
  } else if (values.password.length < 8 || values.password.length > 20) {
    errors.password =
      "Password must be greater than 8 and less than 20 characters";
  } else if (values.password.includes(" ")) {
    errors.password = "Password must not contain white space";
  }

  return errors;
}

export function register_validate(values) {
  const errors = {};

  if (!values.username) {
    errors.username = "*Username is required!";
  } else if (values.username.includes(" ")) {
    errors.username = "Username must not contain white space";
  }

  if (!values.email) {
    errors.email = "Email is required!";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
    errors.email = "Invalid email address";
  }

  if (!values.password) {
    errors.password = "Password is required!";
  } else if (values.password.length < 8 || values.password.length > 20) {
    errors.password =
      "Password must be greater than 8 and less than 20 characters";
  } else if (values.password.includes(" ")) {
    errors.password = "Password must not contain white space";
  }

  if (!values.cpassword) {
    errors.cpassword = "Confirm Password is required!";
  } else if (values.password !== values.cpassword) {
    errors.cpassword = "Passwords must match!";
  } else if (values.cpassword.includes(" ")) {
    errors.cpassword = "Confirm Password must not contain white space";
  }

  return errors
}
