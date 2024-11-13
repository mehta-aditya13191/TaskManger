import { createContext, useContext, useState } from "react";

// Create the context to hold all todo-related data and actions
export const TodoContext = createContext();

export const useTodo = () => {
  return useContext(TodoContext); // Hook to use the context in components
};

export const TodoProvider = ({ children }) => {
  const [todos, setTodos] = useState([
    // Example todo data with title, description, due date, and priority
    {
      id: 1,
      title: "Sample Task",
      description: "This is a sample task",
      dueDate: "2024-11-14",
      priority: "High",
      completed: false,
    },
  ]);

  // Add a new todo
  const addTodo = (todo) => {
    setTodos([
      ...todos,
      {
        id: Date.now(),
        title: todo.title,
        description: todo.description,
        dueDate: todo.dueDate,
        priority: todo.priority,
        completed: todo.completed,
      },
    ]);
  };

  // Update an existing todo
  const updateTodo = (id, updatedTodo) => {
    setTodos(
      todos.map((todo) => (todo.id === id ? { ...todo, ...updatedTodo } : todo))
    );
  };

  // Delete a todo
  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  // Toggle the completion status of a todo
  const toggleComplete = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  return (
    <TodoContext.Provider
      value={{
        todos,
        setTodos,
        addTodo,
        updateTodo,
        deleteTodo,
        toggleComplete,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
};
