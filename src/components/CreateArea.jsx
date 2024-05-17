import React, { useState, useEffect } from "react";
import Note from "./Note";
import useLocalStorage from "../hooks/useLocalStorage";

function CreateArea() {
  const { getObjectData, storeObjectData } = useLocalStorage();

  const [data, setData] = useState({
    title: "",
    content: "",
  });
  const [arr, setArr] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const storedData = getObjectData("notes");
    if (storedData && storedData.length > 0) {
      setArr(storedData);
    }
  }, []);

  useEffect(() => {
    storeObjectData("notes", arr);
  }, [arr]);

  function handleChange(event) {
    const { value, name } = event.target;
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (data.title.trim() === "" || data.content.trim() === "") {
      setError("Please fill out both title and content fields.");
      return;
    }
    setArr((prev) => [...prev, { ...data, completed: false }]);
    setData({ title: "", content: "" });
    setError("");
  }

  function handleDelete(index) {
    const newData = arr.filter((_, idx) => idx !== index);
    setArr(newData);
  }

  function handleUpdate(index, updatedNote) {
    const updatedArr = arr.map((item, i) => {
      if (i === index) {
        return updatedNote;
      }
      return item;
    });
    setArr(updatedArr);
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          name="title"
          placeholder="Title"
          onChange={handleChange}
          value={data.title}
        />
        <textarea
          name="content"
          placeholder="Take a note..."
          rows="3"
          onChange={handleChange}
          value={data.content}
        />
        <button type="submit">Add</button>
      </form>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <Note data={arr} deleteItem={handleDelete} updateItem={handleUpdate} />
    </div>
  );
}

export default CreateArea;
