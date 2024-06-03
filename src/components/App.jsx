import React, { useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import CreateArea from "./CreateArea";
import Note from "./Note";

function App() {
  const [currentNote, setCurrentNote] = useState([]);

  const remove = (id) => {
    setCurrentNote(prevent => {
      return prevent.filter((item, index) => {
        return index !== id;
      });
    });
  };

  return (
    <div>
      <Header />
      <CreateArea setCurrentNote={setCurrentNote} />
      {currentNote.map((note, index) => {
        return <Note 
        key={index} 
        title={note.title} 
        content={note.content} 
        onDelete={() => remove(index)}
        />
      })}
      <Footer />
    </div >
  );
}

export default App;
