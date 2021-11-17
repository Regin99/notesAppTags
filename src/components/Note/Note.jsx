import React, { useState } from "react";
import "./style.scss";
import Delete from "./Delete";
import Edit from "./Edit";
import Save from "./Save";
import DeleteTag from "./DeleteTag";
import Highlighter from "react-highlight-words";
import { HighlightWithinTextarea } from "react-highlight-within-textarea";

export const Note = ({ setNotes, note, notes, isActive }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [noteText, setNoteText] = useState(note.text);
  const [tags, setTags] = useState(note.text.match(/#\S+/g));

  const handleDelete = () => {
    const newNotes = notes.filter((n) => n.id !== note.id);
    setNotes(newNotes);
  };

  const handleSave = (e) => {
    setNotes(
      notes.map((n) =>
        n.id === note.id
          ? { ...n, text: e.target.parentElement.children[0].textContent }
          : n
      )
    );
    setNoteText(e.target.parentElement.children[0].textContent);
    setIsEditing(false);
  };

  const handleChange = (value) => {
    setTags(value.match(/#\S+/g));
    setNoteText(value);
  };

  const handleEdit = (e) => {
    setIsEditing(true);
  };

  const handleSelect = (e) => {
    if (
      e.target.parentElement.parentElement.parentElement.parentElement.classList.contains(
        "note-container"
      )
    ) {
      e.target.parentElement.parentElement.parentElement.parentElement.classList.toggle(
        "selected"
      );
    }
    if (
      e.target.parentElement.parentElement.classList.contains("note-container")
    ) {
      e.target.parentElement.parentElement.classList.toggle("selected");
    }
  };

  const handleDeleteTag = (e) => {
    const tag = e.target.parentElement.parentElement.parentElement.innerText;
    const newText = noteText.replace(tag, "");
    setNoteText(newText);
    setTags(newText.match(/#\S+/g));
    setNotes(
      notes.map((n) => (n.id === note.id ? { ...n, text: newText } : n))
    );
  };

  return isActive ? (
    isEditing ? (
      <div className="note-container-edit selected">
        <div className="note-main">
          <div className="textarea">
            <HighlightWithinTextarea
              className="textarea"
              value={noteText}
              highlight={[{ highlight: tags, className: "highlight" }]}
              onChange={handleChange}
            />
          </div>
          <Save handleSave={handleSave} />
          <Delete handleDelete={handleDelete} />
        </div>
        <div className="note-tags">
          {tags?.map((tag) => (
            <div
              className="note-tag-container"
              key={Math.random()}
              onClick={handleSelect}>
              {tag}
              <DeleteTag tag={tag} handleDeleteTag={handleDeleteTag} />
            </div>
          ))}
        </div>
      </div>
    ) : (
      <div className="note-container">
        <div className="note-main">
          <p className="note-text" onClick={handleSelect}>
            {!!tags ? (
              <Highlighter
                highlightClassName="highlight"
                searchWords={tags}
                textToHighlight={noteText}
              />
            ) : (
              noteText
            )}
          </p>
          <Edit handleEdit={handleEdit} />
          <Delete handleDelete={handleDelete} />
        </div>
        <div className="note-tags">
          {tags?.map((tag) => (
            <div
              className="note-tag-container"
              onClick={handleSelect}
              key={Math.random()}>
              {tag}
              <DeleteTag tag={tag} handleDeleteTag={handleDeleteTag} />
            </div>
          ))}
        </div>
      </div>
    )
  ) : null;
};
