

import {useEffect,useState} from "react";
import useAuth from "../utils/Api/useAuthSpotify";
import SpotifyWebApi from "spotify-web-api-node";
import {Input} from "@nextui-org/react";
import SpotifyDashboard from "../Components/Navbar/spotify/SpotifyDashboard";


const spotifyApi = new SpotifyWebApi({
    clientId:"bdd9da03ae0b4e068945d124833236e3"
})



export default function SpotifyPlayer({code}){
    const accessToken = useAuth(code)
const [search ,setSearch]= useState("")
const [searchResults,setSearchResults]= useState([])
const [revoke ,revokeFunction] = useState()


// body.tracks.items[0].album.images
// body.tracks.items[0].album.images[2].url
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
    console.log(searchResults)
return (()=>cancel = true)
},[search,accessToken])

    return <div style={{margin:"2%"}}>
          <Input
      type="Search"
      label="Search"
      placeholder="Search for Songs/Albums"
      value = {search}
      onChange={e=>setSearch(e.target.value)}
      description="Rock with the Latest Music."
      className="max-w-xs"
    />
<div style={{
    overflowY:"auto",
    display:"flex",
    flexDirection:"column",
    flexGrow:"1"
}}>
{ searchResults.map(track=>(

    <SpotifyDashboard  tracks = { track}      key = {track.uri} />
))}
</div>



    </div>
} 
























































