import { useState } from "react";

export default function App() {
  const [todos, setTodos] = useState([]);
  const [text, setText] = useState("");

  function addTodo() {
    if (!text.trim()) return;
    setTodos(prev => [
      ...prev,
      {
        id: Date.now(),
        text,
        completed: false
      }
    ]);// uppdaterar state-variabeln todos
    setText("");                                           // uppdaterar state-variabeln text
  }

  function deleteTodo(id) {
    setTodos(prev => prev.filter(todo => todo.id !== id));
  }
  function toggleTodo(id) {
    setTodos(prev =>
      prev.map(todo =>
        todo.id === id
          ? { ...todo, completed: !todo.completed }
          : todo
      )
    );
  }
  function clearCompleted() {
    setTodos(prev => prev.filter(todo => !todo.completed));
  }

  function deleteTodo(id) {
    setTodos(prev => prev.filter(todo => todo.id !== id));
  }
  const activeTodos = todos.filter(todo => !todo.completed);
  const completedTodos = todos.filter(todo => todo.completed && !todo.doneFinal);
  const doneTodos = todos.filter(todo => todo.completed);

  function toggleTodo(id) {
    setTodos(prev =>
      prev.map(todo =>
        todo.id === id
          ? { ...todo, completed: !todo.completed }
          : todo
      )
    );
  }

  return (
    <div style={{
      height: "100vh",
      display: "flex",
      flexDirection: "column"
    }}>

      <h1>Leverans</h1>
      <p>Göromål är laster tills de blivit leveranser - då kan du äga dem.</p>
      <div style={{ padding: "20px" }}>
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              addTodo();
            }
          }}
          placeholder="Lägg till göromål..."
        />

        <button onClick={addTodo}>Lägg till last</button>
        <button onClick={clearCompleted}>
          Äg leverans
        </button>
      </div>

      <div style={{
        flex: 1,
        overflowY: "auto",
        padding: "20px",
        borderBottom: "1px solid #ccc"
      }}>
        <h2>⚠️Last</h2>



        <ul>

          {
            todos.filter(todo => !todo.completed).map((todo) => (
              <li
                key={todo.id}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center"
                }}
              >
                <div>
                  <input
                    type="checkbox"
                    checked={todo.completed}
                    onChange={() => toggleTodo(todo.id)}
                  />

                  <span
                    style={{
                      textDecoration: todo.completed ? "line-through" : "none",
                      marginLeft: "8px"
                    }}
                  >
                    {todo.text}
                  </span>
                </div>
                <button onClick={() => deleteTodo(todo.id)}>
                  Förstör
                </button>
              </li>
            ))}

        </ul>
      </div>

      <div style={{
        flex: 1,
        overflowY: "auto",
        padding: "20px"
      }}>
        <h2>✔️Leverans</h2>

        <ul>
          {todos.filter(todo => todo.completed).map((todo) => (
            <li
              key={todo.id}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center"
              }}
            >
              <span style={{ textDecoration: "line-through" }}>
                {todo.text}
              </span>

              <button onClick={() => deleteTodo(todo.id)}>
                Äg
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
