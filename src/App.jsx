import { useState } from "react";

export default function App() {
const [todos, setTodos] = useState([]);
const [stats, setStats] = useState({
  total: 0,
  completed: 0
});
  const [done, setDone] = useState([]);     // historik (Äg)
  const [text, setText] = useState("");
const handleAeg = (todo) => {

  setTodos(prev => prev.filter(t => t.id !== todo.id));

  setDone(prev => [...prev, todo]);
  setStats(prev => ({
  ...prev,
  completed: prev.completed + (todo.completed ? -1 : 1)
}));

};

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
    setStats(prev => ({
  ...prev,
  total: prev.total + 1
}));
    setText("");                                           // uppdaterar state-variabeln text
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
  setStats(prev => ({
    ...prev,
    completed: prev.completed + 1
  }));
  }

const total = todos.length;
const completed = todos.filter(t => t.completed).length;
const percent = stats.total === 0 ? 0 : (stats.completed / stats.total) * 100;

return (
  <div style={{ display: "flex", height: "100vh" }}>

    {/* VÄNSTER */}
    <div style={{
      width: "100px",
      padding: "20px",
      borderRight: "1px solid #ccc"
    }}>


      <div style={{
        width: "100%",
        height: "300px",
        backgroundColor: "#e74c3c",
        borderRadius: "10px",
        overflow: "hidden",
        marginTop: "20px",
        display: "flex",
        alignItems: "flex-end"
      }}>
        <div
          style={{
            width: "100%",
            height: `${percent}%`,
            backgroundColor: "#2ecc71"
          }}
        />
      </div>

      <p>{completed} / {total}</p>
    </div>

    {/* HÖGER */}
    <div style={{
      flex: 1,
      display: "flex",
      flexDirection: "column",
      height: "100vh"
    }}>

      <h1>Leveransometer</h1>
      <p>Ett göromål är last tills det blir leverans – äg det.</p>

      {/* INPUT */}
      <div style={{ padding: "20px" }}>
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") addTodo();
          }}
          placeholder="Lägg till göromål..."
        />

        <div>
          <button onClick={addTodo}>Lägg till last</button>
          <button onClick={clearCompleted}>Äg leverans</button>
        </div>
      </div>

      {/* LEVERANS */}
      <div style={{ flex: 1, padding: "20px", overflowY: "auto" }}>
        <h2>✔️Leverans</h2>
<ul style={{
  listStyle: "none",
  padding: 0,
  margin: 0
}}>
  {todos.filter(t => t.completed).map(todo => (
    <li
  key={todo.id}
  style={{
    listStyle: "none",
    display: "flex",
    justifyContent: "space-between",
    padding: "6px 0"
  }}
>
      <span>{todo.text}</span>
      <button onClick={() => handleAeg(todo)}>
  Äg
</button>
    </li>
  ))}
</ul>
      </div>

      {/* LAST */}
      <div style={{ flex: 1, padding: "20px", overflowY: "auto" }}>
        <h2>⚠️Last</h2>
<ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
  {todos.filter(t => !t.completed).map(todo => (
    <li
      key={todo.id}
      style={{
        listStyle: "none",
        display: "flex",
        justifyContent: "space-between",
        padding: "6px 0"
      }}
    >
      <span>{todo.text}</span>
      <button onClick={() => toggleTodo(todo.id)}>
        Leverera
      </button>
    </li>
  ))}
</ul>
      </div>

    </div>
  </div>
);
}
