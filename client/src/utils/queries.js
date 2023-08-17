


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

query Query {
  user {
    _id
    description
    email
    username
  }
}


`






