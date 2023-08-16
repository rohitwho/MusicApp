

import {useEffect,useState} from "react";
import useAuth from "../utils/Api/useAuthSpotify";
import SpotifyWebApi from "spotify-web-api-node";
import {Input} from "@nextui-org/react";
import SpotifyDashboard from "../Components/spotify/SpotifyDashboard";
import SpotifyInit from "../utils/Api/spotifyLogin"
import Auth from "../utils/auth"
import Player from "../Components/spotify/Player"


const spotifyApi = new SpotifyWebApi({
    clientId:"bdd9da03ae0b4e068945d124833236e3"
})



export default function SpotifyPlayer({code}){
    const accessToken = useAuth(code)
const [search ,setSearch]= useState("")
const [searchResults,setSearchResults]= useState([])
const [playingTrack,setPlayingTrack ] = useState()








function chooseTrack(track){
    setPlayingTrack(track)
    setSearch("")
}
useEffect(()=>{
    if (!accessToken)return
    spotifyApi.setAccessToken(accessToken)
},[accessToken])
useEffect(()=>{
    if (!search) return setSearchResults([])
    if(!accessToken) return
let cancel = false
    spotifyApi.searchTracks(search).then(res =>{
        console.log(res)
        if(cancel) return
    setSearchResults (res.body.tracks.items.map(track =>{
        return{
            artist : track.artists[0].name,
            title:track.name,
            uri:track.uri,
            albumUrl:track.album.images[0] .url
        }
      })
    )
    })


return (()=>cancel = true)
},[search,accessToken])

    return <div style={{margin:"2%",
    height:"80vh",
    overflowY:"scroll"}}>

{accessToken && Auth.loggedIn()?(



<Input
type="Search"
label="Search"
placeholder="Search for Songs/Albums"
value = {search}
onChange={e=>setSearch(e.target.value)}
description="Rock with the Latest Music."
className="max-w-xs"
/>
):(
    <SpotifyInit/>
  
)}


<div style={{
    overflowY:"auto",
    display:"flex",
    flexDirection:"column",
    flexGrow:"1"
}}>
{ searchResults.map(track=>(

    <SpotifyDashboard  tracks = { track}      key = {track.uri}  chooseTrack={chooseTrack} />
))}
</div>

<div><Player accessToken={accessToken} trackUri = {playingTrack?.uri} /></div>

    </div>
} 
























































