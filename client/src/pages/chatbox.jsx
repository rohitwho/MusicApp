import React, { useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { GET_MESSAGES } from "../utils/queries";
import { SEND_MESSAGE } from "../utils/mutation";
import { Input } from "@nextui-org/react";
import { Button } from "@nextui-org/react";
import { Avatar } from "@nextui-org/react";
import SpotifyInit from "../utils/Api/spotifyLogin"
// import SpotifyPlayer from "./spotify"



export default function Chatbox() {
  const [inputValue, setInputValue] = useState("");
  const { loading, error, data } = useQuery(GET_MESSAGES);
  const [sentMessage] = useMutation(SEND_MESSAGE);

  const userData = data?.user[0] || {};

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;


  const handleText = async () => {



    const saveMessage ={
      userId:userData._id,
      messageContent:inputValue
    }
    try {
      const { data } = await sentMessage({
        variables: { input: { ...saveMessage } },
      });

      // console.log(data);
 
    } catch (err) {
      console.error(err);
    }
  };

  const handlechange = (e) => {
    setInputValue(e.target.value);
  };

  return (
 <main style = {{
  display:"flex",

 }}>
   <div style={{
    width:"50%",

   }}>
     <SpotifyInit style={{
      justifyContent:"center",
      display:"flex",
      alignItems:"center"
     }} />
   </div>
      <section style={{
        display:"flex",
        justifyContent:"center",
       width:"100%",
        margin:"2%",
        border:"2px solid black",
   
        // backgroundColor:"whitesmoke"
      }}>
        <div>
        </div>
          {/* <div style={{
            borderRight:"inset",
            width:"30%"
          }}><SpotifyPlaylist/></div> */}
      <div style={
        {
          borderRight:"2px solid black",
          width:"2 0%"
        }
      }>
      <h2 style={{
        display:"flex",
        margin:"1rem",
        color:"white"
      }}>Friends</h2>
   
   
      <ul>
      <li style = {{display:"flex",
      gap:"10px",
      alignItems:"flex-start",
      textTransform:"capitalize",
      borderBottom:"inset",
      width:"100%",
      color:"white",
    }}><Avatar/> {userData.username}</li>
    </ul></div>
        <div
          className="Primary-Chat"
          style={{
   
            display: "",
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
                    padding: "1em",
                    borderRadius: "10px 20px",
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
                  src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
                />
              </div>
            )
          )}
          <main className=" flex  justify-center ">
            <div
              style={{
                marginInline: "1rem",
                width: "100%",
                alignItems: "center",
                color:"whitesmoke"
              }}
            >
              <Input
                isClearable
                type="email"
                label="Message"
                variant="bordered"
                value={inputValue}
                onChange={handlechange}
                onClear={() => console.log("input cleared")}
              />
            </div>
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
          </main>
        </div>
      </section>
 </main>
  );
}
