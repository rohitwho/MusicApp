import React from "react";
import { useQuery } from '@apollo/client';
import {GET_MESSAGES} from "../utils/queries"
import Input from "../Components/input"
import {Avatar} from "@nextui-org/react"



export default function Chatbox() {
    const { loading, error, data } = useQuery(GET_MESSAGES);
    const userData = data?.user[0] || {};
  
    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;
  
    return (
      <section className="Primary-Chat">
        <ul>
          <li>Hello {userData.username}</li>
        </ul>
        {userData.messages?.map(({user:messageUser ,messageContent }, index) => (
          <div
            key={index}
            style={{
              display: "flex",
              justifyContent:
                userData.username === messageUser ? "flex-start" : "flex-end",
              paddingBottom: "1em",
            }}
          >
            <div
              style={{
                background: userData.username === messageUser ? "blue" : "green",
                color: userData.username === messageUser ? "white" : "black",
                padding: "1em",
                borderRadius:"10px",
                maxWidth:"60%"
              }}
            >
              {messageContent}
              <Avatar isBordered color="secondary" src="https://i.pravatar.cc/150?u=a042581f4e29026704d" />
            </div>
          </div>
        ))}
        <Input />
      </section>
    );
  }







