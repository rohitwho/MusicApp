import React, { useEffect, useState } from "react";
import { useMutation } from "@apollo/client";
import { SEND_MESSAGE } from "../utils/mutation";
import { Input } from "@nextui-org/react";
import { Button } from "@nextui-org/react";
import { Avatar, Link } from "@nextui-org/react";

import Auth from "../utils/auth";

export default function Chatbox({ socket }) {
  const [inputValue, setInputValue] = useState("");
  const [message, setMessage] = useState([]);
  const [sentMessage] = useMutation(SEND_MESSAGE);
  const id = Auth.getProfile()
  const kk = id.data._id
  console.log(kk)

  // Text handler
  const handlechange = (e) => {
    setInputValue(e.target.value);
  };
  const handleText = async () => {
    const saveMessage = {

      messageContent: inputValue,
    };

    try {
      const response = await sentMessage({
        variables: { input: { ...saveMessage } },
      });
      await socket.emit("send_message", saveMessage);

      setInputValue("");
    } catch (err) {
      console.error(err);
    }
  };


  useEffect(() => {
    socket.on("message_Recieved", (data) => {
      setMessage((prevMessages) => [...prevMessages, data]);
      console.log(data);
    });
  }, [socket]);



  return (
    <main
      style={{
        display: "flex",
        width: "60%",
      }}
    >
      <section
        style={{
          display: "flex",
          justifyContent: "center",
          width: "100%",
          margin: "2%",
          height: "80vh",
          border: "2px solid white",
          borderRadius: "14px",
        }}
      >
 

        <div
          style={{
            borderRight: "2px solid white",
            width: "30%",
          }}
        >
          <h2
            style={{
              display: "flex",
              margin: "1rem",
              color: "white",

              borderBottom: "inset",
            }}
          >
            Friends
          </h2>

          <ul
            style={{
              display: "flex",
              justifyContent: "flex-start",
            }}
          >
            <li
              style={{
                display: "flex",
                gap: "10px",
                justifyContent: "flex-start",
                alignItems: "center",
                paddingBottom: "0.4rem",
                textTransform: "capitalize",
                textDecoration: "underline",
                textUnderlineOffset: "4px",
                borderBottom: "inset",
                width: "100%",
                color: "white",
                margin: "1rem",
              }}
            >
              <Avatar isBordered radius="lg" name="RN" /> <Link></Link>
            </li>
          </ul>
        </div>

        <div
          className="Primary-Chat"
          style={{
            display: "flex",
            maxHeight: "80vh",
            flexDirection: "column",
            padding: "2%",
            alignItems: "flex-end",
            width: "70%",
            overflowY: "scroll",
          }}
        >
          {message?.map((messages, index) => (
            <div
              key={index}
              style={{
                position: "sticky",
                display: "flex",

                justifyContent: "flex-start",
                // userData.username === messageUser ? "flex-start" : "flex-end",
                paddingBottom: "1em",
              }}
            >
                 {messages.messageContent}
              <div
                style={{
                  // background:
                  //   userData.username === messageUser ? "green" : "#027aff",
                  // color: userData.username === messageUser ? "black" : "white",
                  padding: "0.9em",
                  borderRadius: "10px 10px 0px 24px",
                  maxWidth: "60%",
                }}
              >
                
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
          ))}
          {Auth.loggedIn() ? (
            <div
              style={{
                display: "inline-flex",

                marginInline: "1rem",
                width: "100%",
                alignItems: "center",
                color: "whitesmoke",
                padding: "2%",
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
          ) : (
            <h1
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                border: "1px solid white",
                fontSize: "1.4rem",
              }}
            >
              Please Login with your Credentials!
            </h1>
          )}
        </div>
      </section>
    </main>
  );
}
