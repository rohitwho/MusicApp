
import React, { useState } from "react"
import SpotifyPlayer from 'react-spotify-web-playback';
import PopOver from '../Popover /popover'
import { POST_COMMENT } from "../../utils/mutation";
import Auth from "../../utils/auth";
import { GET_USER } from "../../utils/queries";

import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Input, User } from "@nextui-org/react";
import { useMutation,useQuery } from "@apollo/client";



export default function SpotifyDashboard({ tracks, accessToken }) {
    const log = Auth.getProfile()
    const userName = log.data?.username
    const userId = log.data?._id


    


    const [commentInfo, { error }] = useMutation(POST_COMMENT)
    const {data,loading}= useQuery(GET_USER)
const allComments = data?.user.comments
console.log(allComments)
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    // const [comment, setComment] = useState("")
    const [comentsData, setCommentsData] = useState({ commentText: "", commentAuthor: userName ,userid:userId})





    const commentToSet = async (event) => {
      
            const {name,value}= event.target;
            setCommentsData(prevData => ({ ...prevData,[name]: value }));
            console.log(setCommentsData)



        }
const HandleComment= async ()=>{



        try {


            const { data } = await commentInfo({
                variables: { ...comentsData }
            })


        } catch (err) {
            console.log(err)
        }
        setCommentsData({
            commentText: "",
            commentAuthor: "",
            userid:""


        })



    }






    return (
        <main>
            <div style={{
                marginInline: "2%",
                overflowY: "auto",
                backgroundColor: "#593028",
                border: '1px solid white',
            }}>

                <div onClick={onOpen} style={{
                    color: "white",
                    display: "inline-flex",
                    gap: "10px",
                    cursor: "pointer"

                }}> <img style={{
                    aspectRatio: "1",
                    width: "4rem"
                }} src={tracks.albumUrl} alt="" />{tracks.title}<span
                    style={
                        {
                            color: "grey",
                        }
                    }>{tracks.artist}</span></div>


                <Modal
                    backdrop="opaque"
                    isOpen={isOpen}
                    onOpenChange={onOpenChange}
                    size="5xl"
                    classNames={{
                        backdrop: "bg-gradient-to-t from-zinc-900 to-zinc-900/10 backdrop-opacity-20"
                    }}
                >
                    <ModalContent>
                        {(onClose) => (
                            <>
                                <ModalHeader className="flex flex-col gap-1">{tracks.title}</ModalHeader>
                                <ModalBody>
                                    <SpotifyPlayer
                                        token={accessToken}
                                        showSaveIcon
                                        uris={["spotify:track:6DCZcSspjsKoFjzjrWoCdn"]}
                                    />;
                                    <PopOver />
                                    <li>this i s acomment</li>
                                    {/* {allComments?.map(comment=>{
                                        comment.commentText
                                    })}
                                    <ul>
                                        <li>THis is </li>
                                        <li>{commenttext}</li>
                                    </ul> */}
                                </ModalBody>
                                <div style={{
                                    display: "inline-flex",
                                    alignItems: "center",
                                    padding: "1rem"
                                }}>
                                    <User />
                                    <Input type="text" name="commentText" label="Comment" placeholder="Say Something!" value = {comentsData.commentText}  onChange= { commentToSet} />
                                    <Button onPress={HandleComment} style={{ marginInline: "1%" }} color="primary" variant="ghost">Send</Button>
                                </div>
                                <ModalFooter>

                                    <Button color="primary" onPress={onClose}>
                                        Action
                                    </Button>
                                </ModalFooter>
                            </>
                        )}
                    </ModalContent>
                </Modal>



            </div>
        </main>


    )

}