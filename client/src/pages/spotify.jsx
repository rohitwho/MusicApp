// // fetchPlaylist.js

// import React, { useEffect } from 'react';
// import { useSpotify } from './spotifyContext';

// async function fetchWebApi(endpoint, method, body, token) {
//   console.log(token);
// const options = method === 'POST' ? {
//   headers: {
//     Authorization: `Bearer ${token}`,
//   },
//   method,
//   body: JSON.stringify(body),
// } : {
//   headers: {
//     Authorization: `Bearer ${token}`,
//   },
//   method
// }

//   const res = await fetch(`https://api.spotify.com/${endpoint}`, options);
//   return await res.json();
// }

// async function createPlaylist(tracksUri, token) {
//   const { id: user_id } = await fetchWebApi('v1/me', 'GET', null, token);

//   const playlist = await fetchWebApi(`v1/users/${user_id}/playlists`, 'POST', {
//     name: 'My recommendation playlist',
//     description: 'Playlist created by the tutorial on developer.spotify.com',
//     public: false,
//   }, token);

//   await fetchWebApi(`v1/playlists/${playlist.id}/tracks?uris=${tracksUri.join(',')}`, 'POST', null, token);

//   return playlist;
// }

// export default function FetchPlaylist(createdPlaylist) {
//   const { token, setCreatedPlaylist } = useSpotify();
//   const tracksUri = [
//     'spotify:track:5RkmFc8hMhckt6HJ80n3Rl', // Add your track URIs here
//     // Add more track URIs as needed
//   ];

//   useEffect(() => {
//     const createPlaylistAndSetState = async () => {
//       const playlist = await createPlaylist(tracksUri, token);
//       setCreatedPlaylist(playlist);
//     };
//     createPlaylistAndSetState();
//   }, [token, setCreatedPlaylist]);

//   if (!createdPlaylist) {
//     return <div>Loading...</div>;
//   }

//   const playlistId = createdPlaylist.id;

//   return (
//     <iframe
//       title="Spotify Embed: Recommendation Playlist"
//       src={`https://open.spotify.com/embed/playlist/${playlistId}?utm_source=generator&theme=0`}
//       width="100%"
//       height="100%"
//       style={{ minHeight: '360px' }}
//       // frameBorder="0"
//       allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
//       loading="lazy"
//     />
//   );
// }
