import "./App.css";
import { useState, useEffect } from "react";
import Axios from "axios";

function App() {
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [url, setUrl] = useState("");
  const [passwordList, setPasswordList] = useState([]);

  useEffect(()=> {
    Axios.get('http://localhost:3001/showpasswords').then((response) => {
      console.log(response.data);
      setPasswordList(response.data);
    })
  }, [])

  const addPassword = () => {
    Axios.post('http://localhost:3001/addpassword', {
      name, 
      url, 
      username, 
      password
    });
  }

  return (
    <div className="App">
      <div className="AddingPassword">
        <input
          type="text"
          placeholder="Ex. password123"
          onChange={(event) => {
            setPassword(event.target.value);
          }}
        />
        <input
          type="text"
          placeholder="Ex. facebook"
          onChange={(event) => {
            setName(event.target.value);
          }}
        />
        <input
          type="text"
          placeholder="Ex. example@gmail.com"
          onChange={(event) => {
            setUsername(event.target.value);
          }}
        />
        <input
          type="text"
          placeholder="Ex. www.facebook.com"
          onChange={(event) => {
            setUrl(event.target.value);
          }}
        />
        <button onClick={addPassword}>Add Password</button>
      </div>
      <div className="Passwords">
          {passwordList.map((val) => {
              return (
                <div className="password">
                  <h3>{val.name}</h3>
                </div>
              )
            })
          }
      </div>
    </div>
  );
}

export default App;
