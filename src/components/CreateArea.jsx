import React, { useState } from "react";

function CreateArea(props) {

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const noteTitle = (event) => {
    setTitle(event.target.value);
  }

  const noteContent = (event) => {
    setContent(event.target.value);

  }

  const addNote = (event) => {
    props.setCurrentNote((preValue) => {
      return ([...preValue, { title, content }])
    });
    setTitle("");
    setContent("");
    event.preventDefault();

  };
  return (
    <div>
      <form>
        <input
          name="title"
          placeholder="Title"
          onChange={noteTitle}
          value={title}
        />
        <textarea
          name="content"
          placeholder="Take a note..."
          rows="3"
          onChange={noteContent}
          value={content}
        />
        <button onClick={addNote}>Add</button>
      </form>
    </div>
  );
}

export default CreateArea;
