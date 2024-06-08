import React, { useState, useEffect } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import CreateArea from "./CreateArea";
import axios from "axios";


function App() {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    fetchNotes();
    const ws = new WebSocket('ws://localhost:3000');

    ws.onmessage = (event) => {
      console.log('Notes updated:', JSON.parse(event.data));
      setNotes(JSON.parse(event.data));
    };

    return () => {
      ws.close();
    };
  }, []);

  function fetchNotes() {
    axios.get("http://localhost:3000/notes")
      .then(response => {
        console.log("Fetched notes working perfectly");
        setNotes(response.data);

      })
      .catch(error => {
        console.error(error);
      });
  }

  function addNote(newNote) {
    axios.post("http://localhost:3000/notes", newNote)
      .then(() => console.log('Note added:'))
      .catch(error => console.log(error));
  }


  function deleteNote(id) {
    axios.delete(`http://localhost:3000/notes/${id}`)
      .then(() => console.log(`Note with ${id} deleted`))
      .catch(error => console.log(error));
  }

  return (
    <div>
      <Header />
      <CreateArea onAdd={addNote} />
      {notes.map((noteItem) => {
        return (
          <Note
            key={noteItem._id}
            id={noteItem._id}
            title={noteItem.title}
            content={noteItem.content}
            onDelete={deleteNote}
          />
        );
      })}
      <Footer />
    </div>
  );
}

export default App;
