import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import './Profile.css'

const Profile = () => {
  const { user } = useAuth();
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    if (user) {
      setProfile(user);
    }
  }, [user]);

  if (!profile) return <p>Loading...</p>;

  return (
    <div className='profile-user'>
      <h1>Profile</h1>
      <p>Name: {user.name}</p>
      <p>Email: {user.email}</p>
    </div>
  );
};

export default Profile;
