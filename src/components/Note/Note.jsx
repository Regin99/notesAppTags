import React, { useState, useEffect } from "react";
import "./style.scss";
import Delete from "./Delete";
import Edit from "./Edit";
import Save from "./Save";
import DeleteTag from "./DeleteTag";

export const Note = ({ setNotes, note, notes, isActive }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [noteText, setNoteText] = useState(note.text);
  const [textWithTags, setTextWithTags] = useState(null);
  const [tags, setTags] = useState(null);

  const getHighlightedText = (text) => {
    const regex = /(#\w+)/g;

    return text.split(regex).map((part, i) => {
      return part.match(regex) ? (
        <span key={i} className="highlight">
          {part}
        </span>
      ) : (
        part
      );
    });
  };

  useEffect(() => {
    setTextWithTags(getHighlightedText(noteText));
    setTags(noteText.match(/#\w+/g));
  }, [noteText]);

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

  const handleEdit = (e) => {
    setIsEditing(true);
    setTextWithTags(getHighlightedText(noteText));
  };

  const handleChange = (e) => {
    setTags(e.target.textContent.match(/#\w+/g));
  };

  const handleSelect = (e) => {
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
    setTags(newText.match(/#\w+/g));
    setNotes(
      notes.map((n) => (n.id === note.id ? { ...n, text: newText } : n))
    );
  };

  return isActive ? (
    isEditing ? (
      <div className="note-container-edit selected">
        <div className="note-main">
          <div
            onInput={handleChange}
            contentEditable
            suppressContentEditableWarning={true}
            className="textarea">
            {textWithTags}
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
            {textWithTags}
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
