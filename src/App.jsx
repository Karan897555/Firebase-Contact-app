import Navbar from "./components/Navbar";
import { FiSearch } from "react-icons/fi";
import { AiFillPlusCircle } from "react-icons/ai";
import { useEffect, useState } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "./config/firebase";
import { HiOutlineUserCircle } from "react-icons/hi";
import { IoMdTrash } from "react-icons/io";
import { RiEditCircleLine } from "react-icons/ri";
import ContactCard from "./components/ContactCard";
import Modal from "./components/Modal";
import AddAndUpdateContact from "./components/AddAndUpdateContact";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useDiscoluse from "./hooks/useDiscoluse";
import NotFoundContact from "./components/NotFoundContact";

const App = () => {
  const [contacts, setContacts] = useState([]);
  const [filteredContacts, setFilteredContacts] = useState([]);
  const { onOpen, onClose, isOpen } = useDiscoluse();

  useEffect(() => {
    const getContacts = async () => {
      try {
        const contactsRef = collection(db, "contacts");
        const unsubscribe = onSnapshot(contactsRef, (snapshot) => {
          const contactLists = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          setContacts(contactLists);
          setFilteredContacts(contactLists); 
        });
        return () => unsubscribe(); 
      } catch (error) {
        console.log(error);
      }
    };

    getContacts();
  }, []);

  const filterContacts = (e) => {
    const value = e.target.value.toLowerCase();
    const filtered = contacts.filter(contact =>
      contact.name.toLowerCase().includes(value)
    );
    setFilteredContacts(filtered);
  };

  return (
    <>
      <div className="max-w-[370px] mx-auto px-4">
        <Navbar />
        <div className="flex gap-2">
          <div className="relative flex items-center flex-grow">
            <FiSearch className="absolute ml-1 text-3xl text-white" />
            <input
              onChange={filterContacts}
              type="text"
              className="flex-grow h-10 text-white bg-transparent border border-white rounded-md pl-9"
              placeholder="Search Contacts"
            />
          </div>
          <div>
            <AiFillPlusCircle onClick={onOpen} className="text-5xl text-white cursor-pointer" />
          </div>
        </div>
        <div className="flex flex-col gap-3 mt-4">
          { contacts.length <= 0 ?(<NotFoundContact/>): (filteredContacts.map((contact) => (
            <ContactCard key={contact.id} contact={contact} />
          ))
        )}
        </div>
      </div>
      <AddAndUpdateContact onClose={onClose} isOpen={isOpen} />
      <ToastContainer position="bottom-center" />
    </>
  );
};

export default App;
