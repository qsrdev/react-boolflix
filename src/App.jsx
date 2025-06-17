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
      console.log(res.data.results);
      setMoovies(res.data.results);
    });
  }, []);

  return (
    <div className="row row-cols-1 row-cols-md-3 row-cols-lg-6 g-5">
      {moovies.map((moovie) => (
        <div key={moovie.id} className="card">
          <img src={`https://image.tmdb.org/t/p/w342${moovie.poster_path}`} className="card-img-top object-fit-cover " alt={`Immagine di ${moovie.title}`} />
          <div className="card-body">
            <h5 className="card-title">{moovie.title ? moovie.title : "Titolo non disponibile"}</h5>
            <small className="text-body-secondary">{`Also known as ${moovie.original_title}`}</small>
            <ul className="list-group list-group-flush">
              <li className="list-group-item">{`Lingua: ${moovie.original_language}`}</li>
            </ul>
            <div className="card-footer">{`Voto ${moovie.vote_average}`}</div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default App;
