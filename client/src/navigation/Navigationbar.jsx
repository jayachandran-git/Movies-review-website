import React, {useState}from "react";
import './Navigationbar.css';
import {Link, useNavigate} from 'react-router-dom'
import{ Nav,Navbar,NavDropdown} from 'react-bootstrap'
import { useAuth } from '../context/AuthContext';


function Navigationbar() {

  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?query=${searchQuery}`);
      setSearchQuery(''); 
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };


  return (
   <>
  <div className="update">
         
      <Navbar expand="lg" className="navbar" data-bs-theme="dark">
       <Navbar.Brand className="nav-brand"  as={Link} to="/"><span>J</span>Movies</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link className="link" as={Link} to="/">Home</Nav.Link>
            <NavDropdown title="Movies" id="basic-nav-dropdown">
              <NavDropdown.Item  as={Link} to="/popular">Popular</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/upcoming"> Upcoming</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/toprated">TopRated</NavDropdown.Item>
            </NavDropdown>
              <form onSubmit={handleSearch}>
              <input  className="search-box" type="text" placeholder="Search movies..."
              value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}/>
              <button className="search-btn" type="submit">Search</button>
              </form>
              {!user ? (
                <>
              <Nav.Link className="link" as={Link} to="/login">Login</Nav.Link>
              <Nav.Link className="link" as={Link} to="/register">Register</Nav.Link>
              </>
              ) : (
              <>
              <NavDropdown title="Profile" id="basic-nav-dropdown">
              <NavDropdown.Item as={Link} to="/profile">Profile</NavDropdown.Item>
              <NavDropdown.Item onClick={handleLogout}>Logout</NavDropdown.Item>
            </NavDropdown>
            </>
        )}
          </Nav>
          
        </Navbar.Collapse>
    </Navbar>
          <div className="info">
           <p>"All Movie is an online database with information about films,<br/>
            television programs, television series, and screen actors. This website,<br/>
             contains popular, Trending, Top rated, high ratings and review movies."</p>
          </div>
      </div>
   </>
        
  )
};

export default Navigationbar;





