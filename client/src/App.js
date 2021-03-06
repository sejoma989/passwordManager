import './App.css';
import {useState, useEffect } from "react";
import Axios from 'axios';

function App() {
  const [name, setName] = useState('');
  const [url, setUrl] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [passwordList, setPasswordList] = useState([])

  useEffect(()=> {
    Axios.get('http://localhost:3001/showpasswords').then((response) => {
      setPasswordList(response.data);
    });
  }, []);//[]Siginica que se llama una vez  se carga la pagina 

  const addPassword = () => {
    Axios.post('http://localhost:3001/addpassword', {
      name: name, 
      url: url, 
      username: username, 
      password: password
    });    
  };

  const decryptPassword = (encryption) => {
    Axios.post("http://localhost:3001/decryptpassword", {
      password: encryption.password, 
      iv: encryption.iv
    }).then((response) => {
      setPasswordList(
        passwordList.map((val)=> {
          return val.id == encryption.id 
            ? {
                id: val.id, 
                password: val.password, 
                name: response.data,
                iv: val.iv,
              }
            : val;
        })
      );
    });
  };

  return (
    <div className="App">
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
        <button onClick={addPassword}>Add password</button>
      </div> 
      
      <div className="Passwords">
        {passwordList.map((val, key) => {
          return (
            <div className="password" 
            onClick={()=> {
              decryptPassword({ 
                password: val.password, 
                iv: val.iv,
                id: val.id 
              });
            }}
            key={key}
            >
              <h3>{val.name}</h3> 
            </div>
          );
        })}
      </div>
    </div>
  ); 
};


export default App;
