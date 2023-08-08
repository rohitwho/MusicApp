// SpotifyContext.js

import { createContext, useState, useContext } from 'react';

const SpotifyContext = createContext();

export const SpotifyProvider = ({ children }) => {
  const [token, setToken] = useState('');
  const [createdPlaylist, setCreatedPlaylist] = useState(null);

  return (
    <SpotifyContext.Provider value={{ token, setToken, createdPlaylist, setCreatedPlaylist }}>
      {children}
    </SpotifyContext.Provider>
  );
};

export const useSpotify = () => {
  return useContext(SpotifyContext);
};
