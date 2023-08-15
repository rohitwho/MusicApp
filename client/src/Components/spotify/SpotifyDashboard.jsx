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
 console.log(joinInitials)
  const allComments = data?.user.comments || {};
  console.log(allComments);
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

      <Modal
        backdrop="opaque"
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        size="5xl"
        classNames={{
          backdrop:
            'bg-gradient-to-t from-zinc-900 to-zinc-900/10 backdrop-opacity-20',
        }}
      

      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                {tracks.title}
              </ModalHeader>
              <ModalBody>
          
                {allComments?.map((comment, index) => (
                  <div className=" inline-flex mx-3"  key={index}>
                 <Avatar name={joinInitials}/>   <Input
      isReadOnly
      type="text"
      label="Comments"
      variant="bordered"
      value= {comment.commentText}
      className="max-w-xs"
    /> 
                  </div>
                ))}
              </ModalBody>
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  padding: '1rem',
                }}
              >
       <Avatar name={joinInitials}/> 
                <Input
                  type="text"
                  name="commentText"
                  label="Comment"
                  placeholder="Say Something!"
                  value={comentsData.commentText}
                  onChange={commentToSet}
                />
                <Button
                  onClick={HandleComment} 
                  style={{ marginInline: '1%' }}
                  color="primary"
                  variant="ghost"
                >
                  Send
                </Button>
              </div>
              <ModalFooter>
                <Button color="primary" onClick={onClose}>
                  Action
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  </main>
);
}
