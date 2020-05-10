import React from "react";
import { Field, Form, Formik } from "formik";
import { useDispatch } from "react-redux";
import { createEvent } from "../../../ducks/events";

function EventForm() {
  const dispatch = useDispatch();
  const handleSubmit = (event) => dispatch(createEvent(event));

  return (
    <div>
      <h3>Event Form</h3>
      <Formik initialValues={{ title: "", url: "" }} onSubmit={handleSubmit}>
        <Form>
          Title: <Field name="title" />
          Url: <Field name="url" />
          <button type="submit">Create Event</button>
        </Form>
      </Formik>
    </div>
  );
}

EventForm.propTypes = {};

export default EventForm;
