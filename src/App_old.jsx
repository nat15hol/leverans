import { useState, useEffect } from "react";
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
setTimeout(() => {
  setMessage(`🏆 Snyggt! Du ägde precis "${todo.text}"`);
}, 300);
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
setTimeout(() => {
  setMessage(`🚚 Bra jobbat! Du levererade precis "${todo?.text}"`);
}, 300);
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
setTimeout(() => {
  setMessage(`🎉 Grattis! Du ägde precis ${count} leveranser! Leveransometern nollställs.`);
}, 300);

  setTimeout(() => {
    setMessage("");
  }, 4000);
}

const total = todos.length;

const percent = stats.total === 0 ? 0 : (stats.completed / stats.total) * 100;
  const green = total === 0 ? 0 : completed / total;
  const red = 1 - green;




const ratio = total === 0 ? 0 : completed / total;

let r, g;

if (ratio < 0.5) {
  const t = ratio / 0.5;
  r = 255;
  g = Math.round(255 * t);
} else {
  const t = (ratio - 0.5) / 0.5;
  r = Math.round(255 * (1 - t));
  g = 255;
}

// force “clean yellow zone”
if (Math.abs(ratio - 0.5) < 0.05) {
  r = 255;
  g = 220; // lite varmare gul, inte lime
}
const hue = ratio * 1000;

const bgColor = `rgb(${r}, ${g}, 0)`;



const textColor = `hsl(${hue}, 30%, 30%)`;

const allDone = todos.length > 0 && todos.every(t => t.completed);

function clearCompleted() {
  const count = todos.filter(todo => todo.completed).length;

  setTodos(prev => prev.filter(todo => !todo.completed));

  setTimeout(() => {
    setMessage(
  `🏆 Grattis! Din last är tom och du har ${count} leveranser att äga och vara stolt över!`
);

  }, 1000);
  setTimeout(() => {
    setMessage("");
  }, 4300);
}
const [showFinishButton, setShowFinishButton] = useState(false);

useEffect(() => {
  if (allDone) {
    const timer = setTimeout(() => {
      setShowFinishButton(true);
    }, 500); // halv sekund

    return () => clearTimeout(timer);
  } else {
    setShowFinishButton(false);
  }
}, [allDone]);
return (
  <div style={{ height: "100vh", display: "flex", border: "none", outline: "none", flexDirection: "column", backgroundColor: bgColor, backgroundColor: bgColor, color: textColor}}>
{allDone && (
  <button
    onClick={clearCompleted}
    style={{
      position: "fixed",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      background: "#2860b4",
      color: "white",
      padding: "16px 30px",
      borderRadius: "10px",
      fontSize: "18px",
      zIndex: 9999
    }}
  >
    🎯 Äg leveransen nu!
  </button>
)}
{message && (
  <div style={{
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    background: "#2ecc71",
    color: "white",
    padding: "14px",
    textAlign: "center",
    zIndex: 9999,
    animation: "slideDown 0.5s ease-out"
  }}>
    {message}
  </div>
)}




    {/* HEADER */}
    <div style={{
      padding: "10px 20px",
      borderBottom: "1px solid #eee",
      border: "none",
      textAlign: "center"
    }}>
      <h1 style={{ color: textColor }}>Leveransometer</h1>
      <p style={{ fontSize: "10px" }}>Vad är din last idag och vad kan du äga? Leverera för dig själv.</p>
    </div>


  {/* LEFT SPACER */}


    {/* MAIN */}
    <div style={{ flex: 1, display: "flex", overflow: "hidden" }}>
        <div style={{
        width: "50px",
        padding: "10px",
        borderLeft: "1px solid #ccc",
        display: "flex",
        border: "none",
        flexDirection: "column"
      }}/>
      {/* VÄNSTER */}
      <div style={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        padding: "20px",
        minHeight: 0
      }}>

        {/* INPUT */}
        <div>
          <input
  value={text}
  onChange={(e) => setText(e.target.value)}
  onKeyDown={(e) => {
    if (e.key === "Enter") addTodo();
  }}
  placeholder="Vad vill du leverera idag?"
  style={{
    fontSize: "16px"
  }}
/>

          <div>
            <button onClick={addTodo}>➕Utöka last</button>
            <button onClick={clearCompleted}>🎯Äg leverans</button>
          </div>
        </div>

        {/* LEVERANS */}
        <div style={{ flex: 1, overflowY: "auto", minHeight: 0 }}>
          <h2 style={{ marginTop: "20px", color: textColor }}>
  <span style={{
    color: "#2ecc71",
    marginRight: "6px"
  }}>
    ✓
  </span>
  Leveranser
</h2>
          <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
            {todos.filter(t => t.completed).map(todo => (
              <li
  key={todo.id}
  style={{
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "6px 0"
  }}
>
                <span>{todo.text}</span>
                {/* <button onClick={() => handleAeg(todo)}>Äg det🏆</button>*/}
              </li>
            ))}
          </ul>
        </div>

        {/* LAST */}
        <div style={{ flex: 1, overflowY: "auto", minHeight: 0 }}>
      <h2 style={{color: textColor}}>    
  <span style={{ color: "#e74c3c", marginRight: "6px" }}>⚠</span>
  
  Last
</h2>
          <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
            {todos.filter(t => !t.completed).map(todo => (
              <li
  key={todo.id}
  style={{
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "6px 0"
  }}
>
  <span>{todo.text}</span>
                <button onClick={() => toggleTodo(todo.id)}>Leverera🏃</button>
              </li>
            ))}
          </ul>
        </div>

      </div>

      {/* HÖGER (METER) */}
      <div style={{
        width: "50px",
        padding: "10px",
        borderLeft: "1px solid #ccc",
        display: "flex",
        border: "none",
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
          <div style={{
  flex: 1,
  backgroundColor: total === 0 ? "#444444" : "#e74c3c"
}} />
        </div>

        <p>{completed} / {total}</p>
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
