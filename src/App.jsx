import Navbar from "./components/Navbar";
import { FiSearch } from "react-icons/fi";
import { FaCirclePlus } from "react-icons/fa6";

import { useEffect, useState } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "./config/firebase";
import ContactCard from "./components/ContactCard";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AddAndUpdateContact from "./components/AddAndUpdateContact";
// import useDisclouse from "./hooks/useDisclouse";
import NotFoundContect from "./components/NotFoundContect";

const App = () => {
  const [contacts, setContacts] = useState([]);

  // const { onClose, onOpen, isOpen } = useDisclouse();
  const [isOpen, setOpen] = useState(false);
  const onOpen = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };
  useEffect(() => {
    const getContacts = async () => {
      try {
        const contactsRef = collection(db, "contacts");

        onSnapshot(contactsRef, (snapshot) => {
          const contactsLists = snapshot.docs.map((doc) => {
            return {
              id: doc.id,
              ...doc.data(),
            };
          });
          setContacts(contactsLists);
          return contactsLists;
        });
      } catch (error) {
        console.log(error);
      }
    };
    getContacts();
  }, []);

  const filterContacts = (e) => {
    const value = e.target.value;
    const contactsRef = collection(db, "contacts");

    onSnapshot(contactsRef, (snapshot) => {
      const contactsLists = snapshot.docs.map((doc) => {
        return {
          id: doc.id,
          ...doc.data(),
        };
      });
      const filterContacts = contactsLists.filter((contact) =>
        contact.name.toLowerCase().includes(value.toLowerCase())
      );
      setContacts(filterContacts);
      return filterContacts;
    });
  };

  return (
    <>
      <div className="m-auto max-w-[370px]">
        <Navbar />

        <div className="flex gap-4">
          <div className="flex relative items-center flex-grow">
            <FiSearch className="absolute ml-1 text-3xl text-white" />
            <input
              onChange={filterContacts}
              type="text"
              className="bg-transparent border-[2px] border-white rounded-md h-10 flex-grow outline-none text-white pl-9"
            />
          </div>
          <FaCirclePlus
            onClick={onOpen}
            className="text-4xl text-white cursor-pointer"
          />
        </div>

        <div className=" mt-4 gap-2 flex flex-col">
          {contacts.length <= 0 ? (
            <NotFoundContect />
          ) : (
            contacts.map((contact) => (
              <ContactCard key={contact.id} contact={contact} />
            ))
          )}
        </div>
      </div>

      <AddAndUpdateContact isOpen={isOpen} onClose={onClose} />
      <ToastContainer position="bottom-center" />
    </>
  );
};

export default App;
