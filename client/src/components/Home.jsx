import React, { useEffect, useState } from "react";
import Upcoming from "../components/Upcoming";
import TopRated from "../components/TopRated";
import Popular from "../components/Popular";
import { Card } from "react-bootstrap";
import "./Home.css";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import {Link} from 'react-router-dom'




const Home = () => {
  const [movies, setMovies] = useState([]);

  const getMovie = async () => {
    try {
      await fetch(
        "https://api.themoviedb.org/3/discover/movie?api_key=6eb1c39abd3c39f08b2289f7e65da184"
      )
        .then((res) => res.json())
        .then((json) => setMovies(json.results));
    } catch (err) {
      console.error(err);
    }
  };
  useEffect(() => {
    getMovie();
  }, []);

  console.log(movies);

   return (
  <div>
 
  <h1>Movies List :</h1>
  <div className="slider-container">
    <Swiper
      spaceBetween={20}
      slidesPerView={4}
      navigation
      pagination={{ clickable: true }}
      breakpoints={{
        640: {
          slidesPerView: 1,
        },
        768: {
          slidesPerView: 2,
        },
        1024: {
          slidesPerView: 4,
        },
      }}
    >
      {movies.map((data) => (
        <SwiperSlide key={data.id}>
          <Card className="movie-list">
          <Link to={`/data/${data.id}`}>
            <Card.Img
              className="img"
              variant="top"
             src={`https://image.tmdb.org/t/p/w500${data.poster_path}`} alt={data.title} />
         </Link>
             <Card.Body>
              <Card.Title>{data.title}</Card.Title>
              <Card.Text>
                <span className="cdate">Release Date:</span>
                <br />
                {data.release_date} <br />
                <span className="ctitle">Rating-</span> {data.vote_average}
                
              </Card.Text>
            </Card.Body>
          </Card>
        </SwiperSlide>
      ))}
    </Swiper>
  </div>
  <TopRated />
  <Popular />
  <Upcoming />
 
  <footer className="foot">
    <hr />
    <p>
      Author: Jayachandran{" "}
      <span className="sfooter">@: Copyright reserved</span> Email:{" "}
      <a href="mailto:Jaimech2307@gmail.com">Jaimech2307@gmail.com</a>{" "}
    </p>
  </footer>
  
</div>
);
};

export default Home;