import Header from "./components/Header"
import Footer from "./components/Footer"
//import Movie from "./components/Movie"
import MovieList from "./components/MovieList"
import './App.css'

function App() {
  return (
    <>
      {/* The empty tags <></> is a React Fragment. It's useful when you need a root element of some sort but you don't want extra markup to be rendered in the HTML. */}
      <Header />
      <main id="main">
        {/* <Movie 
          title="Turning Red" 
          year="2022" 
        /> */}
        <MovieList />
      </main>
      <Footer />
    </>
  )
}

export default App
