import React, { useState } from "react";
import { useSubscription,useQuery, useMutation } from "@apollo/client";
import { GET_USER,GET_MESSAGES} from "../utils/queries";
import { SEND_MESSAGE } from "../utils/mutation";
import { Input } from "@nextui-org/react";
import { Button } from "@nextui-org/react";
import { Avatar,Link } from "@nextui-org/react";
import SpotifyInit from "../utils/Api/spotifyLogin"
import Auth from "../utils/auth"
// import SpotifyPlayer from "./spotify"



export default function Chatbox() {
  const [inputValue, setInputValue] = useState("");
  const { loading: userLoading, error: userError, data: userPersonalData } = useQuery(GET_USER);
  const { loading: messagesLoading, error: messagesError, data: messagesData } = useQuery(GET_MESSAGES);

  const [sentMessage] = useMutation(SEND_MESSAGE);

  const userData = messagesData ?.user|| {}

  // const friendUsernames = userPersonalData?.user || {}






  const handleText = async () => {



    const saveMessage ={
      // userId:userData._id,
      messageContent:inputValue
    }
    try {
      const response = await sentMessage({
        variables: { input: { ...saveMessage } },
      });

  
      setInputValue("")
 
    } catch (err) {
      console.error(err);
    }
  };

  const handlechange = (e) => {
    setInputValue(e.target.value);
  };
// if(userLoading){
//   <h1>Loading....</h1>
// }
  return (
 <main style = {{
  display:"flex",
  width:"60%"

 }}>
 
      <section style={{
        display:"flex",
        justifyContent:"center",
       width:"100%",
        margin:"2%",
        height:"80vh",
        border:"2px solid white",
        borderRadius:"14px"
   
     
      }}>
        <div>
        </div>
    
      <div style={
        {
          borderRight:"2px solid white",
          width:"30%"
        }
      }>
      <h2 style={{
        display:"flex",
        margin:"1rem",
        color:"white",
  
        borderBottom:"inset",
      }}>Friends</h2>
 

      <ul style = {{
        display:"flex",
        justifyContent:"flex-start",
   
      }}>
      <li style = {{display:"flex",
      gap:"10px",
      justifyContent:"flex-start",
      alignItems:"center",
      paddingBottom:"0.4rem",
      textTransform:"capitalize",
      textDecoration:"underline",
      textUnderlineOffset:"4px",
      borderBottom:"inset",
      width:"100%",
      color:"white",
      margin :"1rem"
    }}><Avatar  isBordered radius="lg" name="RN" /> <Link > 
    </Link></li>
    </ul></div>

        <div
          className="Primary-Chat"
          style={{
            display:"flex",
            maxHeight:"80vh",
            flexDirection:"column",
padding:"2%",
            alignItems:"flex-end",
            width:"70%",
            overflowY:"scroll"
       
          }}>


   
          {userData.messages?.map(
            ({ user: messageUser, messageContent }, index) => (
              <div
                key={index}
                style={{
                  position:"sticky",
                  display: "flex",

                  justifyContent:
                    userData.username === messageUser ? "flex-start" : "flex-end",
                  paddingBottom: "1em",
                }}
              >
                <div
                  style={{
          
                    background:
                      userData.username === messageUser ? "green" : "#027aff",
                    color: userData.username === messageUser ? "black" : "white",
                    padding: "0.9em",
                    borderRadius: "10px 10px 0px 24px",
                    maxWidth: "60%",
                  }}
                >
                  {messageContent}
                </div>
                <Avatar
                  style={{
                    marginInline: "0.6rem",
                  }}
                  isBordered
                  color="secondary"
                  src="https://i.pravatar.cc/150?u=a04258114e29026702e"
                />
              </div>
            )
          )}
{Auth.loggedIn()?(
  <div
  style={{
    display:"inline-flex",

    marginInline: "1rem",
    width: "100%",
    alignItems: "center",
    color:"whitesmoke",
    padding:"2%"
  }}
>
  <Input
    isClearable
    type="text"
    label="Message"
    variant="bordered"
    value={inputValue}
    onChange={handlechange}
    onClear={() => console.log("input cleared")}
  />
<Button
  onClick={handleText}
  style={{
    marginInline: "1rem",
    alignItems: "center",
    display: "flex",
    justifyContent: "center",
  }}
  color="primary"
  variant="ghost"
>
  Send
</Button>
</div>




):(
  <h1 style = {{
    display:"flex",
    justifyContent:"center",
    alignItems:"center",
    border:"1px solid white",
    fontSize:"1.4rem"

  }}>Please Login with your Credentials!</h1>
)}
         </div>
      </section>
 </main>
  );
}
