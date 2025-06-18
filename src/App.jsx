// import cardList from "./components/cardList";
import { useState } from "react";
import axios from "axios";
import "./App.css";
import StarRating from "./components/starRating";

function App() {
  //Import delle varaibili api url e key dall'env
  const apiKey = import.meta.env.VITE_APP_API_KEY;
  const apiUrl = import.meta.env.VITE_APP_API_URL;
  const placeHolder = "https://placehold.co/230x342?text=Non Disponibile";

  //gestione delle bandiere in base a quelle presenti nella cartella
  const supportedLanguages = ["en", "it", "ja"];
  const flagAvailable = (lang) => supportedLanguages.includes(lang);

  const [moovies, setMoovies] = useState([]);
  const [tvseries, setTvSeries] = useState([]);
  const [userQuery, setQuery] = useState("");

  const search = (e) => {
    e.preventDefault();
    axios.get(`${apiUrl}/search/movie?api_key=${apiKey}&query=${userQuery}`).then((res) => {
      setMoovies(res.data.results);
    });

    axios.get(`${apiUrl}/search/tv?api_key=${apiKey}&query=${userQuery}`).then((res) => {
      setTvSeries(res.data.results);
    });
  };

  return (
    <>
      <header className="">
        <nav className="navbar bg-black sticky-top" data-bs-theme="dark">
          <div className="container-fluid">
            <a className="navbar-brand">BoolFlix</a>
            <form className="d-flex" role="search">
              <input
                className="form-control me-2"
                type="search"
                placeholder="Cerca qualcosa..."
                value={userQuery}
                onChange={(e) => {
                  setQuery(e.target.value);
                }}
              />
              <button onClick={search} className="btn btn-outline-success">
                Cerca
              </button>
            </form>
          </div>
        </nav>
      </header>
      <main>
        <div className="container">
          <h1 className=" text-white ">Moovies</h1>
          <div className="row row-cols-1 row-cols-md-3 row-cols-lg-6 p-2">
            {moovies.map((moovie) => (
              <div className="col mb-4">
                <div key={moovie.id} className="position-relative card h-100">
                  <img
                    src={moovie.poster_path ? `https://image.tmdb.org/t/p/w342${moovie.poster_path}` : placeHolder}
                    className="card-img-top w-100 object-fit-cover img-fluid rounded"
                    alt={`Immagine di ${moovie.title}`}
                    style={{ height: "300px" }}
                  />
                  <div className="card-body overlay d-flex flex-column justify-content-center">
                    <h5 className="card-title ">{moovie.title ? moovie.title : "Titolo non disponibile"}</h5>
                    <small className="text-light mb-1">
                      <strong>Titolo originale:</strong> {moovie.original_title.length > 20 ? moovie.original_title.slice(0, 15) + "..." : moovie.original_title}
                    </small>
                    <small className="text-light mb-1">
                      <strong>Riassunto:</strong> {moovie.overview.slice(0, 50)}...
                    </small>
                    <ul className="list-group list-group-flush">
                      <li className="list-group-item">
                        {flagAvailable(moovie.original_language) ? (
                          <img src={`src/assets/${moovie.original_language}.svg`} alt={moovie.original_language} style={{ width: "24px", height: "16px" }} />
                        ) : (
                          `Lingua: ${moovie.original_language}`
                        )}
                      </li>
                    </ul>
                    <div className="text-bg-danger text-wrap text-light d-flex align-items-center justify-content-center p-2 my-3 rounded">
                      Voto: <StarRating voto={moovie.vote_average} />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <h1 className="text-white my-2">Series</h1>
          <div className="row row-cols-1 row-cols-md-3 row-cols-lg-6 p-2">
            {tvseries.map((tvseries) => (
              <div className="col mb-4">
                <div key={tvseries.id} className="card h-100">
                  <img
                    src={tvseries.poster_path ? `https://image.tmdb.org/t/p/w342${tvseries.poster_path}` : placeHolder}
                    className="card-img-top w-100 object-fit-cover"
                    alt={`Immagine di ${tvseries.name}`}
                    style={{ height: "300px" }}
                  />
                  <div className="card-body overlay d-flex flex-column justify-content-center">
                    <h5 className="card-title text-light text-center">{tvseries.name ? tvseries.name : "Titolo non disponibile"}</h5>
                    <small className="text-light mb-1">
                      <strong>Titolo originale:</strong> {tvseries.original_name}
                    </small>
                    <small className="text-light mb-1">
                      <strong>Riassunto</strong> {tvseries.overview.slice(0, 50)}...
                    </small>
                    <div className="text-white d-flex align-items-center gap-2">
                      {flagAvailable(tvseries.original_language) ? (
                        <>
                          <span>Lingua:</span>
                          <img src={`src/assets/${tvseries.original_language}.svg`} alt={tvseries.original_language} style={{ width: "16px", height: "16px" }} />
                        </>
                      ) : (
                        <span>Lingua: {tvseries.original_language}</span>
                      )}
                    </div>

                    <div className="text-bg-danger text-wrap text-light d-flex align-items-center justify-content-center p-2 my-3 rounded">
                      Voto: <StarRating voto={tvseries.vote_average} />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </>
  );
}

export default App;
