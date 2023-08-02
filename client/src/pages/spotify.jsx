// import React from "react";



export  default function fetchPlaylist(){






    const token = 'BQDVa3ekg2rZ1UZkAgStlcNXwuPIkMAKFNnG4SuX0EH7BE55tIE_6Jq89q-dybuHPMjA7Y4LLJqgsLKse8T1Sz2FM5zZ5s1bUAEe7QBHWeUlXdUT_YY-6o759UkiTbqeDmUpTlQHxKe13qAoqPce8Uli8lOVIQWfXNBz8ahtoINshz1t42mZEO1CHjUdfYuTtWcMMZ9jmNJ6u9x1a_FHHOiiPqIpILWins7UgIWsZY0ej_6xSTF4bkRMuLMXD4en7YOXAw8fyNiqUErOxb9oCaMQ';
async function fetchWebApi(endpoint, method, body) {
  const res = await fetch(`https://api.spotify.com/${endpoint}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    method,
    body:JSON.stringify(body)
  });
  return await res.json();
}

const tracksUri = [
  'spotify:track:5RkmFc8hMhckt6HJ80n3Rl','spotify:track:6pIeD35oayy0j7swdSbBnE','spotify:track:6ETkKwvYMSMxgox1ZKubAs','spotify:track:26ovKPc7BLEGvOin80xGrX','spotify:track:1BzaLzFeLkorzxblbTfzS0','spotify:track:0IrukPsfES6egxbS1LgO5A','spotify:track:4ymJPdUwuzdlOSZgEIpoWq','spotify:track:1sHMeM1t7lGBS1l9KGC1Sh','spotify:track:191UibAfAOKYeA8vKv7MI9','spotify:track:0sgMlAzmBBOIX6DvnG8bwV'
];

async function createPlaylist(tracksUri){
  const { id: user_id } = await fetchWebApi('v1/me', 'GET')

  const playlist = await fetchWebApi(
    `v1/users/${user_id}/playlists`, 'POST', {
      "name": "My recommendation playlist",
      "description": "Playlist created by the tutorial on developer.spotify.com",
      "public": false
  })

  await fetchWebApi(
    `v1/playlists/${playlist.id}/tracks?uris=${tracksUri.join(',')}`,
    'POST'
  );

  return playlist;
}

const createdPlaylist =  createPlaylist(tracksUri);
const playlistId = createdPlaylist.id;

return (
  <iframe
    title="Spotify Embed: Recommendation Playlist"
    src={`https://open.spotify.com/embed/playlist/${playlistId}?utm_source=generator&theme=0`}
    width="100%"
    height="100%"
    style={{ minHeight: '360px' }}
    frameBorder="0"
    allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
    loading="lazy"
  />
);
}