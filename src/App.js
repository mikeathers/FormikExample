import React, { Component } from "react";
import { withFormik, Form, Field } from "formik";
import * as Yup from "yup";

class App extends Component {
  render() {
    const { values, errors, touched, isSubmitting } = this.props;
    return (
      <Form>
        <div>
          <Field type="email" name="email" placeholder="Email" />
          {touched.email && errors.email && <p>{errors.email}</p>}
        </div>
        <div>
          <Field type="password" name="password" placeholder="Password" />
          {touched.password && errors.password && <p>{errors.password}</p>}
        </div>
        <label>
          <Field
            type="checkbox"
            name="newsletter"
            checked={values.newsletter}
          />
          Join our newsletter
        </label>
        <Field component="select" name="plan">
          <option value="free">Free</option>
          <option value="premium">Premium</option>
        </Field>
        <button type="submit" disabled={isSubmitting}>
          Submit
        </button>
      </Form>
    );
  }
}

export default withFormik({
  mapPropsToValues({ email, password, newsletter, plan }) {
    return {
      email: email || "",
      password: password || "",
      newsletter: newsletter || false,
      plan: plan || "free"
    };
  },
  validationSchema: Yup.object().shape({
    email: Yup.string()
      .email("Email not valid")
      .required("Email is required"),
    password: Yup.string()
      .min(8, "Password must be 8 characters or longer")
      .required("Password is required")
  }),
  handleSubmit(values, { resetForm, setSubmitting, setErrors }) {
    setTimeout(() => {
      if (values.email === "test@test.com") {
        setErrors({
          email: "That email is already taken"
        });
      } else {
        resetForm();
      }
      setSubmitting(false);
    }, 2000);
  }
})(App);
