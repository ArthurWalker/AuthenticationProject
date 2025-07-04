import { useState, useEffect } from "react";
import api from "../api";
import Note from "../components/Note";
import "../styles/Home.css"; // Assuming you have a CSS file for styling

function Home() {
  const [notes, setNotes] = useState([]);
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");

  useEffect(() => {
    getNote();
  }, []);

  const getNote = () => {
    api
      .get("/api/notes/")
      .then((res) => res.data)
      .then((data) => {
        setNotes(data);
        console.log(data);
      })
      .catch((err) => {
        alert(err);
      });
  };

  const deleteNote = (id) => {
    api
      .delete(`/api/notes/delete/${id}/`)
      .then((res) => {
        if (res.status === 204) {
          alert("Note deleted successfully");
        } else {
          alert("Failed to delete note");
        }
        getNote();
      })
      .catch((err) => {
        alert(err);
      });
  };

  const createNote = (e) => {
    e.preventDefault();
    api
      .post("/api/notes/", {
        title: title,
        content: content,
      })
      .then((res) => {
        if (res.status === 201) {
          alert("Note created successfully");
        } else {
          alert("Failed to create note");
        }
        getNote();
      })
      .catch((err) => {
        alert(err);
      });
  };

  return (
    <div>
      <div>
        <h2>Notes</h2>
        {notes.map((note) => (
          <Note note={note} onDelete={deleteNote} key={note.id} />
        ))}
      </div>
      <h2>Create a Note</h2>
      <form onSubmit={createNote}>
        <label htmlFor="title">Title</label>
        <br />
        <input
          type="text"
          id="title"
          value={title}
          required
          onChange={(e) => setTitle(e.target.value)}
        />
        <br />
        <label htmlFor="content">Content</label>
        <br />
        <textarea
          type="text"
          id="content"
          value={content}
          required
          onChange={(e) => setContent(e.target.value)}
        />
        <br />
        <input type="submit" value="Create Note" />
      </form>
    </div>
  );
}

export default Home;
