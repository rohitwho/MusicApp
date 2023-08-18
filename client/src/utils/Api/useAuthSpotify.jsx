import { useState,useEffect  } from "react"
import axios from "axios"


export default function useAuth(code){




    const  [accessToken,setAccessToken]= useState();
    const [ refreshToken , setRefreshToken] = useState();
    const  [expiresIn,setExpiresIn] = useState();


useEffect(()=>{

axios.post("https://musicio-d325003c7109.herokuapp.com/login",{
    code
})
.then(res => {
    setAccessToken(res.data.accessToken)
    setRefreshToken(res.data.refreshToken)
    setExpiresIn(res.data.expiresIn)
    window.history.pushState({},null,"/")
    console.log(res.data)

}).catch(err =>{
    // window.location = "/"
    console.error(err)
})



},[code])

useEffect(()=>{
    if(!refreshToken || !expiresIn) return
    const interval = setInterval(()=>{


         
        axios.post("https://musicio-d325003c7109.herokuapp.com/refresh",{
            refreshToken
        })
        .then(res => {
            setAccessToken(res.data.accessToken)
        
            setExpiresIn(res.data.expiresIn)
           
        
        }).catch(err =>{
            // window.location = "/"
            console.error(err)
        })
    },(expiresIn- 60) * 1000)
    return()=> clearInterval(interval)


},[refreshToken,expiresIn])
return accessToken

}