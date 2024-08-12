import { ErrorMessage, Field, Form, Formik } from "formik";
import { useId } from "react";
import { nanoid } from "nanoid";
import * as Yup from "yup";

import css from "./ContactForm.module.css";
import { useDispatch } from "react-redux";
import { addContact } from "../../redux/contactsSlice";

const ContactFormSchema = Yup.object().shape({
  name: Yup.string()
    .min(3, "Too short")
    .max(30, "Too long")
    .required("Required!"),
  phone: Yup.string()
    .min(3, "Too short")
    .max(30, "Too long")
    .required("Required!"),
});

export default function ContactForm() {
  const id = useId();
  const dispatch = useDispatch();

  const handleSubmit = (values, actions) => {
    values.id = nanoid(4);
    dispatch(addContact(values.name, values.phone));
    actions.resetForm();
  };

  return (
    <Formik
      initialValues={{
        id: "",
        name: "",
        phone: "",
      }}
      onSubmit={handleSubmit}
      validationSchema={ContactFormSchema}
    >
      <Form className={css.form}>
        <label htmlFor={`${id}-name`}>Name</label>
        <Field
          className={css.form_input}
          type="text"
          name="name"
          id={`${id}-name`}
        />
        <ErrorMessage
          className={css.form_message_error}
          name="name"
          component="span"
        />

        <label htmlFor={`${id}-phone`}>Phone</label>
        <Field
          className={css.form_input}
          type="text"
          name="phone"
          id={`${id}-phone`}
        />
        <ErrorMessage
          className={css.form_message_error}
          name="phone"
          component="span"
        />
        <button className={css.form_button} type="submit">
          Add contact
        </button>
      </Form>
    </Formik>
  );
}
