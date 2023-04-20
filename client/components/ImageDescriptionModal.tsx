import React, { useState } from "react";
import Modal from "react-modal";

const UserInputModal = ({ showModal, onClose, onSubmit, date, subject }) => {
  const [inputValue, setInputValue] = useState("");
  console.log("date", date);
  console.log("subject", subject);
  const handleSubmit = (event) => {
    event.preventDefault();

    onSubmit(inputValue);
    onClose();
  };

  const customStyles = {
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
            Enter Image Description:
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
            className="bg-blue-500 hover:bg-blue-700 text-white py-1 px-3 rounded-md"
          >
            Submit
          </button>
          <button
            onClick={onClose}
            className="bg-gray-500 hover:bg-gray-700 text-white py-1 px-3 rounded-md"
          >
            Close
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default UserInputModal;
