import  { useState } from "react";
import SpotifyPlayer from "react-spotify-web-playback";
import PlayButton from "../Navbar/formIcons/playButton"
import PopOver from "../Popover/popover";


import { POST_COMMENT } from "../../utils/mutation";
import Auth from "../../utils/auth";
import { GET_USER } from "../../utils/queries";

import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Input,
  User,
  Avatar,
  
} from "@nextui-org/react";
import { useMutation, useQuery } from "@apollo/client";

export default function SpotifyDashboard({ tracks, chooseTrack }) {



  const log = Auth.getProfile();
  const userName = log.data?.username;
  const userId = log.data?._id;

  const [commentInfo, { error }] = useMutation(POST_COMMENT);
  const { data, loading } = useQuery(GET_USER);
  const userInitials = data?.user.username || {}
 const firstInitial = userInitials[0];
 const lastInitial = userInitials[userInitials.length -1]
 const joinInitials = firstInitial+"" +lastInitial

  const allComments = data?.user.comments || {};

  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const [comentsData, setCommentsData] = useState({
    commentText: "",
    commentAuthor: userName,
    userid: userId,
  });

  const commentToSet = async (event) => {
    const { name, value } = event.target;
    setCommentsData((prevData) => ({ ...prevData, [name]: value }));

  };
  const HandleComment = async () => {
    try {
      const { data } = await commentInfo({
        variables: { ...comentsData },
      });
    } catch (err) {
      console.log(err);
    }
    setCommentsData({
      commentText: "",
      commentAuthor: "",
      userid: "",
    });
  };


  function playHandler(){
  

    chooseTrack(tracks)
 
  }

  return (
    <main>




    <div
      style={{
        marginInline: '2%',
        overflowY: 'auto',
        padding:"1rem",
        backgroundColor: '#593028',
        border: '1px solid white',
        borderRadius:"14px",
        width:"100%"
      }}
    >
      <div
        onClick={playHandler}
        style={{
          color: 'white',
          display: 'flex',
          justifyContent:"space-between",
          gap: '10px',
          cursor: 'pointer',
        }}
      >
        <User
            avatarProps={{radius: "lg",size:"lg", src: tracks.albumUrl}}
            description=  {tracks.artist} 
            name=     {tracks.title}
            onClick={onOpen}
          >
        
          </User>
         
          <PlayButton/>

     </div>
     </div>
  </main>
);
}
