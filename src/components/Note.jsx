import React, { useState } from "react";

export default function Note(props) {
  const [editMode, setEditMode] = useState(null);
  const [editedNote, setEditedNote] = useState({ title: "", content: "" });

  const handleEdit = (index) => {
    setEditMode(index);
    setEditedNote(props.data[index]);
  };

  const handleSave = (index) => {
    props.updateItem(index, editedNote);
    setEditMode(null);
  };

  const toggleCompleted = (index) => {
    const updatedNote = {
      ...props.data[index],
      completed: !props.data[index].completed,
    };
    props.updateItem(index, updatedNote);
  };

  return (
    <div>
      {props.data.map((item, index) => (
        <div
          className="note"
          key={index}
          style={{
            textDecoration: item.completed ? "line-through" : "none",
            position: "relative",
          }}
        >
          <input
            type="checkbox"
            checked={item.completed}
            onChange={() => toggleCompleted(index)}
            style={{ position: "absolute", top: "10px", right: "10px" }}
          />
          {editMode === index ? (
            <>
              <input
                type="text"
                value={editedNote.title}
                onChange={(e) =>
                  setEditedNote({ ...editedNote, title: e.target.value })
                }
                style={{
                  width: "100%",
                  marginBottom: "10px",
                  padding: "8px",
                  borderRadius: "4px",
                  border: "1px solid #ccc",
                }}
              />
              <textarea
                value={editedNote.content}
                onChange={(e) =>
                  setEditedNote({ ...editedNote, content: e.target.value })
                }
                style={{
                  width: "100%",
                  minHeight: "100px",
                  marginBottom: "10px",
                  padding: "8px",
                  borderRadius: "4px",
                  border: "1px solid #ccc",
                }}
              />
              <button
                onClick={() => handleSave(index)}
                style={{
                  backgroundColor: "#3498db",
                  color: "#fff",
                  marginBottom: "10px",
                  padding: "8px",
                  borderRadius: "4px",
                  border: "none",
                }}
              >
                Save
              </button>
            </>
          ) : (
            <>
              <h1>{item.title}</h1>
              <p>{item.content}</p>
              <div>
                <button
                  onClick={() => props.deleteItem(index)}
                  style={{
                    backgroundColor: "#e74c3c",
                    color: "#fff",
                    marginRight: "5px",
                    padding: "8px",
                    borderRadius: "4px",
                    border: "none",
                  }}
                >
                  DELETE
                </button>
                <button
                  onClick={() => handleEdit(index)}
                  style={{
                    backgroundColor: "#2ecc71",
                    color: "#fff",
                    marginRight: "5px",
                    padding: "8px",
                    borderRadius: "4px",
                    border: "none",
                  }}
                >
                  Edit
                </button>
              </div>
            </>
          )}
        </div>
      ))}
    </div>
  );
}
