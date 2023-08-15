

import SpotifyPlayer from "react-spotify-web-playback";


import Auth from "../../utils/auth"

export default function Player ({accessToken,trackUri}){


if (!accessToken)return null
    return(

<div>
  {Auth.loggedIn()?(
  
  
    <SpotifyPlayer
    token={accessToken}
    showSaveIcon
    uris={ trackUri?[trackUri]:[]}
    />
  
  ):(
    <h1 style ={{
      color:"White"
    }}>User Need to Login first</h1>
  
  )}
</div>


    )
}