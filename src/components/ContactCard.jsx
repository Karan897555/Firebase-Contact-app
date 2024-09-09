import { deleteDoc, doc } from "firebase/firestore";
import { HiOutlineUserCircle } from "react-icons/hi";
import { IoMdTrash } from "react-icons/io";
import { RiEditCircleLine } from "react-icons/ri";
import { db } from "../config/firebase";
import AddAndUpdateContact from "./AddAndUpdateContact";
import useDiscoluse from "../hooks/useDiscoluse";
import { toast } from "react-toastify";
const ContactCard = ( { contact } ) => {
    const {onOpen,onClose,isOpen} = useDiscoluse();

    const deleteContact = async (id) => {
        try {
            const docRef = doc(db, "contacts", id);
            console.log('Document Reference:', docRef);
            await deleteDoc(docRef);
            console.log('Contact deleted');
            toast.success("Contact Delete Successfully")
        } catch (error) {
            console.error('Error deleting contact:', error);
        }
    };
    

return (
    <>
    <div key={contact.id} className="flex items-center justify-between p-2 rounded-lg bg-yellow">
    <div className="flex gap-1">
    <HiOutlineUserCircle className="text-3xl text-orange"/>
    <div className="">
        <h2 className="font-medium">{contact.name}</h2>
        <p className="text-sm">{contact.email}</p>
    </div>
    </div>
    <div className="flex text-3xl">
    <RiEditCircleLine onClick={onOpen} className="cursor-pointer"/>
    <IoMdTrash onClick={ ( ) => deleteContact(contact.id)}
    className="cursor-pointer text-orange"/>
    </div>
    </div>
    <AddAndUpdateContact contact={contact} isUpdate isOpen={isOpen} onClose={onClose}/>
    </>
);
};

export default ContactCard ;
