import React from "react";
import { Note } from "../Note/Note";
import { Filter } from "../Filter/Filter";

export const Notes = ({ notes, setNotes }) => {
  return (
    <div>
      <Filter notes={notes} setNotes={setNotes} />
      {!!notes
        ? notes.map((note) => (
            <Note
              setNotes={setNotes}
              notes={notes}
              note={note}
              key={note.id}
              isActive={note.isActive}
            />
          ))
        : null}
    </div>
  );
};
