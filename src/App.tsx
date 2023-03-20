import { useState } from "react";
import "./App.css";
import Logo from "./assets/logo.png";
import LogoButton from "./assets/logo-button.png";

import axios from "axios";

interface MovieType {
  id: number;
  poster_path: string;
  title: string;
  overview: string;
}

function App() {
  const [movie, setMovie] = useState<MovieType>({} as MovieType);
  const [loading, setLoading] = useState(true);

  const getMovie = async () => {
    let index = Math.floor(Math.random() * 20);
    setLoading(true);
    await axios
      .get("https://api.themoviedb.org/3/movie/now_playing", {
        params: {
          api_key: "eb885dfc7301ff6be60fe4c46a83525c",
          language: "pt-BR",
          page: 1,
        },
      })
      .then((response) => {
        setMovie(response.data.results[index]);
      })
      .catch((error) => console.log(error));
    setLoading(false);
  };

  return (
    <div className="App">
      <img className="logo" src={Logo} alt="logo" />
      <h1 className="title">Não sabe o que assistir?</h1>
      {loading ? (
        <div></div>
      ) : (
        <div className="movie">
          <img
            src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
          />
          <div className="info">
            <h3>{movie.title}</h3>
            <span>{movie.overview}</span>
          </div>
        </div>
      )}

      <button className="button" onClick={getMovie}>
        <img src={LogoButton} alt="logo" /> Encontrar filme
      </button>
      <p className="description">
        Clique em "Encontrar filme" que traremos informações <br /> de algum
        filme para você assistir hoje.
      </p>
    </div>
  );
}

export default App;
