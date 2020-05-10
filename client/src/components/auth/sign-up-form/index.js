import React from "react";
import { Formik, Form, Field } from "formik";
import { useDispatch } from "react-redux";
import { signUp } from "../../../ducks/auth";

function SignUpForm() {
  const dispatch = useDispatch();
  const handleSubmit = ({ email, password }) =>
    dispatch(signUp(email, password));
  return (
    <div>
      <h3>Sign Up</h3>
      <Formik
        initialValues={{ email: "", password: "" }}
        onSubmit={handleSubmit}
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
