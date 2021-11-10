import "./App.scss";
import React, { useState, useEffect } from "react";
import { AddNote } from "./components/AddNote/AddNote";
import { Notes } from "./components/Notes/Notes";

function App() {
  const data = localStorage.getItem("notes")
    ? JSON.parse(localStorage.getItem("notes"))
    : [
        { text: "I wanna go to #shop", id: 1, isActive: true },
        { text: "I’ll be in the #pool after the #shop", id: 2, isActive: true },
      ];

  const [notes, setNotes] = useState(data);

  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  return (
    <div className="App">
      <AddNote notes={notes} setNotes={setNotes} />
      <Notes notes={notes} setNotes={setNotes} />
    </div>
  );
}

export default App;
