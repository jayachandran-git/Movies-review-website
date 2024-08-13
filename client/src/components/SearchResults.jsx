import React, { useEffect, useState } from 'react';
import { useLocation, Link} from 'react-router-dom';
import axios from 'axios';
import "./SearchResults.css";


const SearchResults = () => {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState('');
  const query = new URLSearchParams(useLocation().search).get('query');
  const API_KEY = '6eb1c39abd3c39f08b2289f7e65da184';

  useEffect(() => {
    const fetchSearchResults = async () => {
      try {
        const response = await axios.get(`https://api.themoviedb.org/3/search/movie`, {
          params: {
            api_key: API_KEY,
            query: query,
          },
        });
        setMovies(response.data.results);
      } catch (err) {
        setError('Failed to fetch search results');
      }
    };

    if (query) {
      fetchSearchResults();
    }
  }, [query, API_KEY]);

  return (
    
    <div>
      <h1>Search Results</h1>
      {error && <p>{error}</p>}
      {movies.length > 0 ? (
        <div className="movie-grid">
          {movies.map((movie) => (
            <div key={movie.id} className="movie-card">
            <Link to={`/data/${movie.id}`}>
              <img src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} alt={movie.title} />
              </Link>
              <h3>{movie.title}</h3>
              <p className='cdate'>Release:{movie.release_date}</p>
              <p className='ctitle'>Rating-{movie.vote_average}</p>
            </div>
          ))}
        </div>
      ) : (
        <p className='found'>No movies found</p>
      )}
    </div>
  );
};

export default SearchResults;
