import React, { useState } from "react";
import { useTodo } from "../context/TodoContext";
import "../styles/TodoItem.css"; // Import custom CSS

function TodoItem({ todo }) {
  const [isTodoEditable, setIsTodoEditable] = useState(false);
  const [todoMsg, setTodoMsg] = useState(todo.title);
  const [priority, setPriority] = useState(todo.priority);
  const { updateTodo, deleteTodo, toggleComplete } = useTodo();

  const editTodo = () => {
    updateTodo(todo.id, { ...todo, title: todoMsg, priority });
    setIsTodoEditable(false);
  };

  const toggleCompleted = () => {
    toggleComplete(todo.id);
  };

  return (
    <div
      className={`todo-item-container ${
        todo.completed ? "completed" : "incomplete"
      }`}
    >
      <input
        type="checkbox"
        className="task-checkbox"
        checked={todo.completed}
        onChange={toggleCompleted}
      />
      <div className="task-details">
        <input
          type="text"
          className={`task-input ${isTodoEditable ? "editable" : ""}`}
          value={todoMsg}
          onChange={(e) => setTodoMsg(e.target.value)}
          readOnly={!isTodoEditable}
        />
        <textarea
          className={`task-textarea ${isTodoEditable ? "editable" : ""}`}
          value={todo.description}
          readOnly={!isTodoEditable}
        />
        <input
          type="date"
          value={todo.dueDate}
          readOnly={!isTodoEditable}
          className="task-date-input"
        />
        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
          className="task-priority-input"
          disabled={!isTodoEditable}
        >
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>
      </div>

      <button
        className="edit-btn"
        onClick={() => {
          if (todo.completed) return;

          if (isTodoEditable) {
            editTodo();
          } else setIsTodoEditable((prev) => !prev);
        }}
        disabled={todo.completed}
      >
        {isTodoEditable ? "📁" : "✏️"}
      </button>

      <button className="delete-btn" onClick={() => deleteTodo(todo.id)}>
        ❌
      </button>
    </div>
  );
}

export default TodoItem;
