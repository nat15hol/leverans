import { useState } from "react";
import "./App.css";
export default function App() {
  const [todos, setTodos] = useState([]);
  const [stats, setStats] = useState({
    total: 0,
    completed: 0
  });
  const [done, setDone] = useState([]);     // historik (Äg)
  const [message, setMessage] = useState("");
  const [text, setText] = useState("");
  const completed = todos.filter(t => t.completed).length;
  const handleAeg = (todo) => {
    setTodos(prev => prev.filter(t => t.id !== todo.id));
    setDone(prev => [...prev, todo]);

    setMessage(`🏆 Snyggt! Du ägde precis "${todo.text}"`);

    setTimeout(() => {
      setMessage("");
    }, 1000);
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

    const todo = todos.find(t => t.id === id);

    setMessage(`🚚 Bra jobbat! Du levererade precis "${todo?.text}"`);

    setTimeout(() => {
      setMessage("");
    }, 1000);
  }


  function deleteTodo(id) {
    setTodos(prev => prev.filter(todo => todo.id !== id));
  }




  const activeTodos = todos.filter(todo => !todo.completed);
  const completedTodos = todos.filter(todo => todo.completed && !todo.doneFinal);
  const doneTodos = todos.filter(todo => todo.completed);




  function clearCompleted() {
    const count = todos.filter(todo => todo.completed).length;

    setTodos(prev => prev.filter(todo => !todo.completed));

    setMessage(`🎉 Grattis! Du ägde precis ${count} leveranser!`);

    setTimeout(() => {
      setMessage("");
    }, 4000);
  }

  const total = todos.length;

  const percent = stats.total === 0 ? 0 : (stats.completed / stats.total) * 100;

return (
  <div style={{ height: "100vh", display: "flex", flexDirection: "column" }}>

    {/* HEADER */}
        <div className="layout">
<div style={{
  padding: "10px 20px",
  borderBottom: "1px solid #eee",
  border: "none",
  textAlign: "center"
}}>
      <h1>Leveransometer</h1>
      <p style={{ fontSize: "10px" }}>Vad är din last idag och vad kan du äga? Leverera för dig själv.</p>
    </div>

    {/* LAYOUT (main + meter) */}


      {/* MAIN */}
      <div className="main">

        {/* INPUT */}
        <div>
          <input
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && addTodo()}
            placeholder="Vad vill du leverera idag?"
            style={{ fontSize: "16px" }}
          />

          <div>
            <button onClick={addTodo}>➕Utöka last</button>
            <button onClick={clearCompleted}>🎯Äg leverans</button>
          </div>
        </div>

        {/* LEVERANS */}
        <div style={{ flex: 1, overflowY: "auto", minHeight: 0 }}>
          <h2 style={{ marginTop: "20px" }}>
            <span style={{ color: "#2ecc71", marginRight: "6px" }}>✓</span>
            Leveranser
          </h2>
          <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
            {todos.filter(t => t.completed).map(todo => (
              <li key={todo.id} style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "6px 0"
              }}>
                <span>{todo.text}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* LAST */}
        <div style={{ flex: 1, overflowY: "auto", minHeight: 0 }}>
          <h2>
            <span style={{ color: "#e74c3c", marginRight: "6px" }}>⚠</span>
            Last
          </h2>
          <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
            {todos.filter(t => !t.completed).map(todo => (
              <li key={todo.id} style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "6px 0"
              }}>
                <span>{todo.text}</span>
                <button onClick={() => toggleTodo(todo.id)}>Leverera🏃</button>
              </li>
            ))}
          </ul>
        </div>

      </div>

      {/* METER */}
      <div className="meter" style={{ background: "yellow", border: "2px solid black" }}>
  <div style={{
    width: "50px",
    padding: "10px",
    display: "flex",
    flexDirection: "column"
  }}>
    <div style={{
      flex: 1,
      borderRadius: "10px",
      overflow: "hidden",
      display: "flex",
      flexDirection: "column"
    }}>
      <div style={{
        height: `${total === 0 ? 0 : (completed / total) * 100}%`,
        backgroundColor: "#2ecc71",
        width: "100%"
      }} />
      <div style={{ flex: 1, backgroundColor: "#e74c3c" }} />
    </div>

    <p>{completed} / {total}</p>
  </div>
</div>


    </div>

    {/* FOOTER */}
    <div style={{
      padding: "10px 20px",
      borderTop: "1px solid #eee",
      fontSize: "12px",
      opacity: 0.6,
      border: "none",
      textAlign: "center"
    }}>
      Byggd av Henrik Oldehed ✦ Leveransometer
    </div>

  </div>
);
}
