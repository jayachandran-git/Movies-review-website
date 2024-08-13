import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './components/Home';
import { Route, Routes } from 'react-router-dom'
import Login from './components/Login';
import Register from './components/Register';
import Profile from './components/Profile';
import Popular from './components/Popular';
import Upcoming from './components/Upcoming';
import TopRated from './components/TopRated';
import SearchResults from './components/SearchResults';
import Navigationbar from './navigation/Navigationbar';
import MovieDetail from './components/MovieDetail';
import ProtectedRoute from './components/ProtectedRoute'



const App =()=> {
  return (
    <div>
    
    <Navigationbar/>
     <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/popular" element={<Popular />} />
      <Route path="/upcoming" element={<Upcoming />} />
      <Route path="/toprated" element={<TopRated />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/profile" element={
        <ProtectedRoute>
        <Profile />
        </ProtectedRoute>
        } />
      <Route path="/search" element={<SearchResults />} />
      <Route path="/data/:id" element={<MovieDetail />} />
    </Routes>
  
  </div>
  )
}

export default App;


