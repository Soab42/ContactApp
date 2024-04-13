/*=============================== 
ContactCard Component
================================= */

import { FaRegUserCircle } from "react-icons/fa";
import { BiSolidEdit } from "react-icons/bi";
import { FaTrash } from "react-icons/fa6";
import { db } from "../config/firebase";
import { deleteDoc, doc } from "firebase/firestore";
import AddAndUpdateConact from "../components/AddAndUpdateContact";
// import useDisclouse from "../hooks/useDisclouse";
import { useState } from "react";
import { toast } from "react-toastify";

const ContactCard = ({ contact }) => {
  // const {onClose, onOpen, isOpen} = useDisclouse();

  const [isOpen, setOpen] = useState(false);
  const onOpen = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };
  // =========== deleteContact ========= //
  const deleteContact = async (id) => {
    try {
      await deleteDoc(doc(db, "contacts", id));
      toast.success("Contact Deleted Successfully");
    } catch (error) {
      // console.log(error);
    }
  };

  return (
    <>
      <div
        key={contact.id}
        className="bg-white flex justify-between items-center rounded-lg p-2"
      >
        <div className="flex gap-4">
          <FaRegUserCircle className="text-pink text-4xl" />
          <div className="">
            <h1 className="text-medium font-medium">{contact.name}</h1>
            <p className="text-sm">{contact.email}</p>
          </div>
        </div>
        <div className="flex gap-1 text-2xl">
          <BiSolidEdit onClick={onOpen} className="cursor-pointer" />
          <FaTrash
            onClick={() => deleteContact(contact.id)}
            className="cursor-pointer"
          />
        </div>
      </div>
      <AddAndUpdateConact
        contact={contact}
        isUpdate
        isOpen={isOpen}
        onClose={onClose}
      />
    </>
  );
};

export default ContactCard;
