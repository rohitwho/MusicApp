


import {  gql } from '@apollo/client';



export const GET_MESSAGES = gql`

query Query {
    user {
      username
      messages {
        messageContent
        createdAt
      }
      email
      comments {
        commentText
        commentAuthor
      }
      _id
    }
  }




`
export  const GET_USER = gql`
query User {
  user {
    username
    email
    _id
    comments {
      userid
      commentText
      commentAuthor
    }
    friends {
      username
      messages {
        messageContent
        createdAt
        _id
      }
    
      email
      comments {
        userid
        commentText
        commentAuthor
      }
      _id
    }
    messages {
      messageContent
      createdAt
      _id
    }
  }
}
`

