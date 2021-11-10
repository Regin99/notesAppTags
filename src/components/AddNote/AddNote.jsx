import React, { useState } from "react";
import "./style.scss";

export const AddNote = ({ notes, setNotes }) => {
  const [inputText, setInputText] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    setNotes([...notes, { text: inputText, id: Date.now(), isActive: true }]);
    setInputText("");
  };
  return (
    <form className="add-note">
      <textarea
        placeholder="Add new note"
        value={inputText}
        onChange={(event) => {
          setInputText(event.target.value);
        }}
      />
      <button
        onClick={(event) => {
          handleSubmit(event);
        }}>
        Add
      </button>
    </form>
  );
};
