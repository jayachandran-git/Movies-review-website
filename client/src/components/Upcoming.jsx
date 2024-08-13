import React, { useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import {Link} from 'react-router-dom'


const Upcoming = () => {
    const [upcomingmovies, setUpcoming] = useState([]);

    const getUpcoming = async() => {
        try {
        await fetch('https://api.themoviedb.org/3/movie/upcoming?api_key=6eb1c39abd3c39f08b2289f7e65da184')
          .then(res=> res.json())
          .then(json => setUpcoming(json.results));
            
        } catch (err) {
            console.error(err)
       } 
         
    }
    useEffect(() => {
      getUpcoming();
    }, [])
     

    return (
        <div>
        
        <h1>Upcoming Movies :</h1>
        <Card className="card-image">
          {upcomingmovies.map((data3) => {
            return(
            <div className="movie-list" key={data3.id}>
            <Link to={`/data/${data3.id}`}>
               <Card.Img
                  className="img"
                  variant="top"
                  src={`https://image.tmdb.org/t/p/w500${data3.poster_path}`}/>
                </Link>
                <Card.Body>
                  <Card.Title>{data3.title}</Card.Title>
                  <Card.Text>
                    <span className="cdate">Release Date:</span>
                    <br />
                    {data3.release_date} <br />
                    <span className="ctitle">Rating-</span> {data3.vote_average}
                  </Card.Text>
                </Card.Body>
            
            </div>
           
            )
          }
        )
      };
      </Card>
        </div>
     );
   }

export default Upcoming;
