import { useState } from "react";
import "./App.css";

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

interface Folder {
  id: number;
  name: string;
  icon: string;
  todos: number;
}

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [folders] = useState<Folder[]>([
    { id: 1, name: "Business", icon: "💼", todos: 40 },
    { id: 2, name: "Life", icon: "🏠", todos: 20 },
    { id: 3, name: "Study", icon: "📚", todos: 0 },
    { id: 4, name: "Budgeting", icon: "💰", todos: 0 },
  ]);

  const addTodo = () => {
    if (inputValue.trim() !== "") {
      setTodos([
        ...todos,
        { id: Date.now(), text: inputValue, completed: false },
      ]);
      setInputValue("");
    }
  };

  const toggleTodo = (id: number) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo,
      ),
    );
  };

  return (
    <div className="app-container">
      <div className="sidebar">
        <div className="search-bar">
          <input type="text" placeholder="Search" />
        </div>
        <div className="quick-filters">
          <div className="filter-item">
            <span className="icon">📅</span>
            <span>Today</span>
            <span className="count">22</span>
          </div>
          <div className="filter-item">
            <span className="icon">🗓️</span>
            <span>Scheduled</span>
            <span className="count">37</span>
          </div>
          <div className="filter-item">
            <span className="icon">📁</span>
            <span>All</span>
            <span className="count">130</span>
          </div>
          <div className="filter-item">
            <span className="icon">🚩</span>
            <span>Flagged</span>
            <span className="count">10</span>
          </div>
        </div>
        <div className="folders">
          {folders.map((folder) => (
            <div key={folder.id} className="folder-item">
              <span className="folder-icon">{folder.icon}</span>
              <span>{folder.name}</span>
              <span className="count">{folder.todos}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="main-content">
        <h1>My Todos</h1>
        <div className="todo-input">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Add a new todo..."
          />
          <button onClick={addTodo}>Add</button>
        </div>
        <ul className="todo-list">
          {todos.map((todo) => (
            <li
              key={todo.id}
              className={`todo-item ${todo.completed ? "completed" : ""}`}
              onClick={() => toggleTodo(todo.id)}
            >
              {todo.text}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
