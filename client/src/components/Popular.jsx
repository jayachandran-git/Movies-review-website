import React, { useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import "./Popular.css";
import {Link} from 'react-router-dom'


const Popular = () => {
    const [popularmovies, setPopular] = useState([]);

    const getPopularmovie = async() => {
      try {
        await fetch('https://api.themoviedb.org/3/movie/now_playing?api_key=6eb1c39abd3c39f08b2289f7e65da184')
        .then(res=> res.json())
        .then(json => setPopular(json.results));
         } catch (err) {
        console.error(err)
         }      
    }
    useEffect(() => {
      getPopularmovie();
    }, [])
     
  return (
    
    <div>
    
    <h1>Popular Movies :</h1>
    <Card className="card-image">
          {popularmovies.map((data1) => {
            return(
            <div className="movie-list" key={data1.id}>
            <Link to={`/data/${data1.id}`}>
               <Card.Img
                  className="img"
                  variant="top"
                  src={"https://image.tmdb.org/t/p/w500" + "" + data1.poster_path } />
                  </Link>
                <Card.Body>
                  <Card.Title>{data1.title}</Card.Title>
                  <Card.Text>
                    <span className="cdate">Release Date:</span>
                    <br />
                    {data1.release_date} <br />
                    <span className="ctitle">Rating-</span> {data1.vote_average}
                  </Card.Text>
                </Card.Body>
            
            </div>
           
            )
          }
        )
      };
      </Card>
   
    </div>
  )
}

export default Popular;
