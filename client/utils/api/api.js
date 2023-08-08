




// Authorization token that must have been created previously. See : https://developer.spotify.com/documentation/web-api/concepts/authorization
// export const token = 'BQCMfE7HDlUNxI_f3-1hzn7j4tcuqEcmdl7uSJeDMiuBREQRvEr1nbo-bhkgZ-PNlR4lNJKadw23smw4xVxxx4VumrBfvnflU9aCkpFbbQbWSVlyMPteCtczXqHONyUcm0rlqJeGDg995pCZQvnk67-TKkceinAX7tPMQGSH27GNXqwP0OYF1-dFBTRTsWQ07nj2FElqcf3Lil1pk12zcAocAjFtQmJ2TKOg3fWjckmGZDvd5SpmpqV5eu56hYMHGOCLz6tMeQOmo5yNZ66AEvfE';
// async function fetchWebApi(endpoint, method, body) {
//   const res = await fetch(`https://api.spotify.com/${endpoint}`, {
//     headers: {
//       Authorization: `Bearer ${token}`,
//     },
//     method,
//     body:JSON.stringify(body)
//   });
//   return await res.json();
// }

// async function getTopTracks(){
//   // Endpoint reference : https://developer.spotify.com/documentation/web-api/reference/get-users-top-artists-and-tracks
//   return (await fetchWebApi(
//     'v1/me/top/tracks?time_range=short_term&limit=5', 'GET'
//   )).items;
// }

// export  const topTracks = await getTopTracks();
// console.log(
//   topTracks?.map(
//     ({name, artists}) =>
//       `${name} by ${artists.map(artist => artist.name).join(', ')}`
//   )
// );


// Authorization token that must have been created previously. See : https://developer.spotify.com/documentation/web-api/concepts/authorization
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

const createdPlaylist = await createPlaylist(tracksUri);
console.log(createdPlaylist.name, createdPlaylist.id);

// // Authorization token that must have been created previously. See : https://developer.spotify.com/documentation/web-api/concepts/authorization
// const token = 'BQCMfE7HDlUNxI_f3-1hzn7j4tcuqEcmdl7uSJeDMiuBREQRvEr1nbo-bhkgZ-PNlR4lNJKadw23smw4xVxxx4VumrBfvnflU9aCkpFbbQbWSVlyMPteCtczXqHONyUcm0rlqJeGDg995pCZQvnk67-TKkceinAX7tPMQGSH27GNXqwP0OYF1-dFBTRTsWQ07nj2FElqcf3Lil1pk12zcAocAjFtQmJ2TKOg3fWjckmGZDvd5SpmpqV5eu56hYMHGOCLz6tMeQOmo5yNZ66AEvfE';
// async function fetchWebApi(endpoint, method, body) {
//   const res = await fetch(`https://api.spotify.com/${endpoint}`, {
//     headers: {
//       Authorization: `Bearer ${token}`,
//     },
//     method,
//     body:JSON.stringify(body)
//   });
//   return await res.json();
// }

// const topTracksIds = [
//   '5RkmFc8hMhckt6HJ80n3Rl','6ETkKwvYMSMxgox1ZKubAs','1BzaLzFeLkorzxblbTfzS0','4ymJPdUwuzdlOSZgEIpoWq','191UibAfAOKYeA8vKv7MI9'
// ];

// async function getRecommendations(){
//   // Endpoint reference : https://developer.spotify.com/documentation/web-api/reference/get-recommendations
//   return (await fetchWebApi(
//     `v1/recommendations?limit=5&seed_tracks=${topTracksIds.join(',')}`, 'GET'
//   )).tracks;
// }

// const recommendedTracks = await getRecommendations();
// console.log(
//   recommendedTracks.map(
//     ({name, artists}) =>
//       `${name} by ${artists.map(artist => artist.name).join(', ')}`
//   )
// );


// const playlistId = '3B7zIkXLDVaa680EbgkDgl';

// <iframe
//   title="Spotify Embed: Recommendation Playlist "
//   src={`https://open.spotify.com/embed/playlist/3B7zIkXLDVaa680EbgkDgl?utm_source=generator&theme=0`}
//   width="100%"
//   height="100%"
//   style={{ minHeight: '360px' }}
//   frameBorder="0"
//   allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
//   loading="lazy"
// />