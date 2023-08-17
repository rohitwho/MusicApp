import { gql } from "@apollo/client";

export const GET_MESSAGES = gql`
  query Query {
    newMessages {
      messageId
      messageContent
      createdAt
    }
  }
`;
export const GET_USER = gql`
  query Query {
    user {
      _id
      description
      email
      username
    }
  }
`;
