import {useState} from "react";
import Movie from "./Movie";
import "./MovieList.css";

var moviesArray = [
  {
    title: "The King's Man",
    year: "2021"
  },
  {
    title: "The Dark Knight",
    year: "2008"
  }
];

export default function MovieList() {
  const [moviesList, setMoviesList] = useState(moviesArray);

  function handleForm(e) {
    e.preventDefault(); //make sure page doesn't reload
    //console.log(e.target.title.value);
    let newMovie = {
      title: e.target.title.value,
      year: e.target.year.value
    };
    //Since we can't modify a state variable directly, we can't do moviesList.push(), so we need to use the array spread syntax (...arrayName) to list out the existing array items in a new array ([ ]) and append newMovie to the end.
    setMoviesList(
      [
        ...moviesList,
        newMovie
      ]
    );
  }

  return(
    <section className="movies">
      <h2>Movies</h2>
      <form onSubmit={handleForm}>
        <label htmlFor="title">Title:</label>
        <input type="text" id="title" name="title" placeholder="e.g. Turning Red" />
        <label htmlFor="year">Year:</label>
        <input type="text" id="year" name="year" placeholder="e.g. 2022" />
        <button type="submit">Add movie</button>
      </form>
      {
        moviesList.map((m) => (
          <Movie
            key={m.title + m.year}
            title={m.title}
            year={m.year}
          />
        ))
      }
    </section>
  )
}