import './App.css';
import {useState} from 'react';

function App() {

  const [name, setName] = useState('')
  const [url, setUrl] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  return <div className="App">
    <div className="AddingPassword">
      <h1>My password Manager</h1>
      <input 
        type="text" 
        placeholder="Ej. Facebook" 
        onChange={(event) => {
          setName(event.target.value);
        }} 
      />
      <input 
        type="text" 
        placeholder="Ej. www.facebook.com" 
        onChange={(event) => {
          setUrl(event.target.value);
        }}
      />
      <input 
        type="text" 
        placeholder="Ej. pepito@yimail.com" 
        onChange={(event) => {
          setUsername(event.target.value);
        }}
      />
      <input 
        type="text" 
        placeholder="Ej. password123" 
        onChange={(event) => {
          setPassword(event.target.value);
        }}
      />
      <button>Add password</button>
    </div>
  </div>
}

export default App;
