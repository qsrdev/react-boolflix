import { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

function App() {
  //Import delle varaibili api url e key dall'env
  const apiKey = import.meta.env.VITE_APP_API_KEY;
  const apiUrl = import.meta.env.VITE_APP_API_URL;
  const fakeQuery = "whiplash";

  const [moovies, setMoovies] = useState([]);

  useEffect(() => {
    axios.get(`${apiUrl}?api_key=${apiKey}&query=${fakeQuery}`).then((res) => {
      console.log(res.data);
    });
  }, []);

  return (
    <>
      <h1>Questa è una prova per foolflix</h1>
    </>
  );
}

export default App;
