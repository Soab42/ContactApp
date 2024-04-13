/*=============================== 
AddAndUpdateContact Component 
================================= */

import { ErrorMessage, Field, Form, Formik } from "formik";
import Modal from "./Modal";
import { addDoc, collection, doc, updateDoc } from "firebase/firestore";
import { db } from "../config/firebase";
import { toast } from "react-toastify";
import * as Yup from "yup";

const contactSchemaValidatoin = Yup.object().shape({
  name: Yup.string().required("Name is Required"),
  email: Yup.string().email("Invalid Email").required("Email is Required"),
});

const AddAndUpdateContact = ({ onClose, isOpen, isUpdate, contact }) => {
  // =========== addContact ========= //
  const addContact = async (contact) => {
    try {
      const contactsRef = collection(db, "contacts");
      await addDoc(contactsRef, contact);
      onClose();
      toast.success("Contact Add Successfully");
    } catch (error) {
      // console.log(error);
    }
  };

  // =========== updateContact ========= //
  const updateContact = async (contact, id) => {
    try {
      const contactsRef = doc(db, "contacts", id);
      await updateDoc(contactsRef, contact);
      onClose();
      toast.success("Contact Update Successfully");
    } catch (error) {
      // console.log(error);
    }
  };

  return (
    <div>
      <Modal className="w-[400px]" isOpen={isOpen} onClose={onClose}>
        <Formik
          validationSchema={contactSchemaValidatoin}
          initialValues={
            isUpdate
              ? {
                  name: contact.name,
                  email: contact.email,
                }
              : {
                  name: "",
                  email: "",
                }
          }
          onSubmit={(values) => {
            // console.log(values);
            isUpdate ? updateContact(values, contact.id) : addContact(values);
          }}
        >
          <Form className="flex flex-col gap-4">
            <div className="flex flex-col gap-1">
              <label htmlFor="name">Name</label>
              <Field
                name="name"
                className="h-10 border border-current outline-none pl-[10px]"
              />
              <div className="text-xs text-red-500">
                <ErrorMessage name="name" />
              </div>
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="email">Email</label>
              <Field
                name="email"
                className="h-10 border border-current outline-none pl-[10px]"
              />
              <div className="text-xs text-red-500">
                <ErrorMessage name="email" />
              </div>
            </div>
            <button type={"submit"} className="bg-pink p-2 self-end rounded">
              {isUpdate ? "Update" : "Add"} Contact
            </button>
          </Form>
        </Formik>
      </Modal>
    </div>
  );
};

export default AddAndUpdateContact;
