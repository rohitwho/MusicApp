


import {  gql } from '@apollo/client';



export const GET_MESSAGES = gql`

subscription {
    
      messages {
        messageContent
        createdAt
      }
 
     
    
  }




`
export  const GET_USER = gql`




query User {
  user {
    username
    email
    description
    _id
    messages {
      messageContent
      createdAt
      _id
    }
    comments {
      commentAuthor
      commentText
      userid
    }
    friends {
      username
      email
      _id
      comments {
        commentText
      }
      messages {
        messageContent
      }
    }
  }
}


`






