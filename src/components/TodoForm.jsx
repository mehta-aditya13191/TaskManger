import React, { useState } from "react";
import { useTodo } from "../context/TodoContext";
import "../styles/TodoForm.css"; // Import custom CSS

function TodoForm() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [priority, setPriority] = useState("Low");
  const { addTodo } = useTodo();

  const add = (e) => {
    e.preventDefault();
    if (!title || !description || !dueDate) return;

    addTodo({
      title,
      description,
      dueDate,
      priority,
      completed: false,
    });

    setTitle("");
    setDescription("");
    setDueDate("");
    setPriority("Low");
  };

  return (
    <form onSubmit={add} className="todo-form-container">
      <input
        type="text"
        placeholder="Title"
        className="form-input"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        placeholder="Description"
        className="form-input"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <input
        type="date"
        className="form-input"
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
      />
      <select
        value={priority}
        onChange={(e) => setPriority(e.target.value)}
        className="form-input"
      >
        <option value="Low">Low</option>
        <option value="Medium">Medium</option>
        <option value="High">High</option>
      </select>
      <button type="submit" className="add-task-btn">
        Add Task
      </button>
    </form>
  );
}

export default TodoForm;
