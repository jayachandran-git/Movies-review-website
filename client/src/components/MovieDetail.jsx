import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import "./MovieDetail.css";
import { useAuth } from '../context/AuthContext';

const MovieDetail = () => {
  const { id } = useParams(); 
  const [movie, setMovie] = useState(null);
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState('');
  const [reviews, setReviews] = useState([]);
  const [error, setError] = useState('');
  const { user } = useAuth();

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const response = await fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=6eb1c39abd3c39f08b2289f7e65da184`);
        const data = await response.json();
        setMovie(data);
      } catch (error) {
        console.error('Error fetching movie details:', error);
      }
    };

    const fetchReviews = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/api/reviews/${id}`);
      setReviews(response.data);
     } catch {
        alert('Failed to fetch reviews');
      }
    };

    if (id) {
      fetchMovieDetails(); 
      fetchReviews(); 
    }  
  }, [id]);

  const submitReview = async () => {
    if (!user) {
      alert('You must be logged in to submit a review.');
      return;
    }
    try {
      const response = await axios.post(`http://localhost:4000/api/reviews/${id}`, {
        rating,
        review,
      },{
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      setReviews([...reviews, response.data]);  
      setRating(0);
      setReview('');
    } catch (error) {
      setError('Failed to submit review');
    }
  };

  if (error) {
    return <p>{error}</p>;
  }

  if (!movie) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h1>{movie.title}</h1>
      <img className='movie-img' src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} alt={movie.title} />
      <div className='movie-detail'>
      <p>Tagline:{movie.tagline}</p>
      <p>Release Date: {movie.release_date}</p>
      <p>Rating: {movie.vote_average}</p>
      <p>Language:{movie.original_language}</p>
      <p>Runtime:{movie.runtime}</p>
      <p>Country:{movie.origin_country}</p>
      <p>Status:{movie.status}</p>
      <p>Overviw:{movie.overview}</p> 
      </div>

      <div className='submit-review'>  
      <h2>Submit Your Review</h2>
      <label>Rating:</label>
        <input className='submit-input'
          type="number"
          value={rating}
          onChange={(e) => setRating(e.target.value)}
          min="1"
          max="10"
        />
        <br />
        <label>Review:</label><br/>
        <textarea 
          value={review}
          onChange={(e) => setReview(e.target.value)}
        ></textarea>
        <br />
        <button className='submit-button' onClick={submitReview}>Submit Review</button>
      </div>

      <div className='reviews-data'>
      <h2>Reviews</h2>
      {reviews.length > 0 ? (
        reviews.map((r, index) => (
          <div key={index}>
            <p>Rating: {r.rating}</p>
            <p>Review: {r.review}</p>
          </div>
        ))
      ) : (
        <p>No reviews yet.</p>
      )}
      </div>
    </div>
  );
};

export default MovieDetail;
