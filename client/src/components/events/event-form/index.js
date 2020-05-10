import React from "react";
import { Field, Form, Formik } from "formik";
import { useDispatch } from "react-redux";
import { createEvent } from "../../../ducks/events";

function EventForm() {
  const dispatch = useDispatch();
  const handleSubmit = (event) => {
    console.log(123, event);
    dispatch(createEvent(event));
  };

  return (
    <div>
      <h3>Event Form</h3>
      <Formik
        initialValues={{ title: "some title", url: "some url" }}
        onSubmit={handleSubmit}
      >
        <Form data-id="event-form">
          Title: <Field name="title" data-id="event-form-title" />
          Url: <Field name="url" data-id="event-form-url" />
          <button type="submit" data-id="event-form-submit">
            Create Event
          </button>
        </Form>
      </Formik>
    </div>
  );
}

EventForm.propTypes = {};

export default EventForm;
