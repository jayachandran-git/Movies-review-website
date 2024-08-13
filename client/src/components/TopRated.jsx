import React, { useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import {Link} from 'react-router-dom'

const TopRated = () => {
    const [toprate, setToprate] = useState([]);

    const getToprated =async () => {
        try {
            await fetch('https://api.themoviedb.org/3/movie/top_rated?api_key=6eb1c39abd3c39f08b2289f7e65da184' )
            .then(res=> res.json())
            .then(json=> setToprate(json.results));

        } catch (err) {
            console.error(err)
        }  
    }
    useEffect(() => {
      getToprated();
    }, []);
     

    return (
        <div>
        
        <h1>TopRated Movies :</h1>
        <Card className="card-image">
          {toprate.map((data2) => {
            return(
            <div className="movie-list" key={data2.id}>
            <Link to={`/data/${data2.id}`}>
               <Card.Img
                  className="img"
                  variant="top"
                  src={`https://image.tmdb.org/t/p/w500${data2.poster_path}`}/>
               </Link>
                <Card.Body>
                  <Card.Title>{data2.title}</Card.Title>
                  <Card.Text>
                    <span className="cdate">Release Date:</span>
                    <br />
                    {data2.release_date} <br />
                    <span className="ctitle">Rating-</span> {data2.vote_average}
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

export default TopRated;
