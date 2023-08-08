


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

