import "./App.css";
import { useState, useEffect } from "react";
import Axios from "axios";

function App() {
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [url, setUrl] = useState("");
  const [passwordList, setPasswordList] = useState([]);

  useEffect(() => {
    Axios.get("http://localhost:3001/showpasswords").then((response) => {
      // console.log(response.data);
      setPasswordList(response.data);
    });
  }, []);

  const addPassword = () => {
    Axios.post("http://localhost:3001/addpassword", {
      name,
      url,
      username,
      password,
    });
  };

  const decryptPassword = (encryption) => {
    Axios.post("http://localhost:3001/decryptpassword", {
      password: encryption.password,
      iv: encryption.iv,
      // id: encryption.id
    }).then((response) => {
      setPasswordList(
        passwordList.map((val) => {
          // console.log(val);
          console.log(encryption);
          return val.id === encryption.id
            ? {
                id: val.id,
                password: val.password,
                name: response.data,
                url: val.url,
                username: val.username,
                iv: val.iv,
              }
            : val;
        })
      );
      // console.log(response.data);
    });
  };

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
        {passwordList.map((val, key) => {
          return (
            <div
              className="password"
              onClick={() => {
                decryptPassword({
                  password: val.password,
                  iv: val.iv,
                  id: val.id,
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
}

export default App;
