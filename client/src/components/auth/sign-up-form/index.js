import React from "react";
import { Formik, Form, Field } from "formik";

function SignUpForm() {
  return (
    <div>
      <h3>Sign Up</h3>
      <Formik
        initialValues={{ email: "", password: "" }}
        onSubmit={console.log}
      >
        <Form>
          email: <Field type="email" name="email" />
          <Field
            type="password"
            name="password"
            validate={(password) =>
              password && password.length >= 8 ? undefined : "password to short"
            }
          >
            {({ field, meta }) => (
              <div>
                password: <input {...field} type="password" />
                {meta.touched && meta.error && (
                  <div className="error">{meta.error}</div>
                )}
              </div>
            )}
          </Field>
          <button type="submit">Sign Up</button>
        </Form>
      </Formik>
    </div>
  );
}

SignUpForm.propTypes = {};

export default SignUpForm;
