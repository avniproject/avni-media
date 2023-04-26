import React, { useState } from "react";
import { Styles } from "react-modal";
import Modal from "react-modal";
interface prop{
  subject: any[];
  date : Date[];
  onSubmit:(inputValue:string)=>void;
  onClose: ()=>void;
  showModal: boolean;
}
const UserInputModal = ({ showModal, onClose, onSubmit, date, subject, }:prop) => {
  const [inputValue, setInputValue] = useState(`Date: ${date} \nsubjectType : ${subject}`);
  const handleSubmit = (event: { preventDefault: () => void; }) => {
    event.preventDefault();

    onSubmit(inputValue);
    onClose();
  };

  const customStyles: Styles = {
    overlay: {
      backgroundColor: "rgba(0, 0, 0, 0.75)",
    },
    content: {
      width: "400px",
      height: "auto",
      margin: "0 auto",
      top: "50%",
      left: "30%",
      transform: "translate(-50%, -50%)",
      padding: "20px",
      boxSizing: "border-box",
      border: "2px solid gray",
      borderRadius: "10px",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
    },
  };

  return (
    <Modal
      isOpen={showModal}
      onRequestClose={onClose}
      style={customStyles}
      ariaHideApp={false}
    >
      <form onSubmit={handleSubmit} className="w-full">
        <div className="flex flex-col mb-4">
          <label htmlFor="image-description" className="mb-1 font-bold">
            Edit Image Description:
          </label>
          <textarea
            id="image-description"
            className="resize-none h-48 p-2 border-2 border-gray-400 rounded-md focus:outline-none focus:border-blue-500"
            value={inputValue}
            onChange={(event) => setInputValue(event.target.value)}
            maxLength={1000}
            required
          />
        </div>
        <div className="flex justify-between">
          <button
            type="submit"
            className="bg-teal-500 hover:bg-teal-700 text-white py-1 px-3 rounded-md"
          >
            Submit
          </button>
          <button
            onClick={onClose}
            className="bg-teal-500 hover:bg-teal-700 text-white py-1 px-3 rounded-md"
          >
            Close
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default UserInputModal;
