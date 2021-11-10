import React, { useState } from "react";
import "./style.scss";

export const Filter = ({ notes, setNotes }) => {
  const [filter, setFilter] = useState("");

  const handleFilter = (e) => {
    e.preventDefault();
    let filterTags = filter.split(" ");
    filterTags = filterTags.filter((str) => /\S/.test(str));
    filterTags.sort();
    setNotes(
      notes.map((note) => {
        let noteTags = note.text.match(/#\w+/g);
        noteTags?.sort();
        if (
          noteTags?.some(() => {
            if (noteTags.length >= filterTags.length) {
              return filterTags.every((filterTag) => {
                return noteTags.includes(filterTag);
              });
            } else {
              return false;
            }
          })
        ) {
          note.isActive = true;
        } else {
          note.isActive = false;
        }
        return note;
      })
    );
  };

  return (
    <form
      className="filter"
      onSubmit={(e) => {
        handleFilter(e);
      }}>
      <input
        type="text"
        value={filter}
        placeholder="Filter notes by tags"
        onChange={(e) => {
          setFilter(e.target.value);
        }}
      />
    </form>
  );
};
