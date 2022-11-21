import "./App.css";
import { useState } from "react";

function App() {
  const [password, setPassword] = useState("");
  const [title, setTitle] = useState("");

  return (
    <div className="App">
      <div className="AddingPassword">
        <input
          type="text"
          placeholder="Ex. password"
          onChange={(event) => {
            setPassword(event.target.value);
          }}
        />
        <input
          type="text"
          placeholder="Ex. facebook"
          onChange={(event) => {
            setTitle(event.target.value);
          }}
        />
        <button>Add Password</button>
      </div>
    </div>
  );
}

export default App;
