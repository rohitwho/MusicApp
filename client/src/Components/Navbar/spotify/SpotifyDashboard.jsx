
import React from "react"


export default function SpotifyDashboard({ tracks }){
// const title = [0].albumUrl.url

// console.log(title)

return<div style={{
    marginInline:"2%",
    overflowY:"auto"
}}>
   
<div style={{
    color:"white",
    display:"inline-flex",
    gap:"10px"
    // flexDirection:"column"
}}> <img  style={{ 
    aspectRatio:"1",
    width:"4rem"
}}src={tracks.albumUrl}alt="" />{tracks.title}<span
style={
    {
        color:"grey",
    }
}>{tracks.artist}</span></div>







</div>




}