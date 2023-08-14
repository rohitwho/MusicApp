import  {gql} from "@apollo/client"

export const LOGIN_USER = gql`
mutation Mutation($email: String!, $password: String!) {
  login(email: $email, password: $password) {
    token
    user {
      username
      email
      _id
    }
  }
}
`;

export const SIGN_UP = gql`
mutation signup($username: String!, $email: String!, $password: String!) {
  signup(username: $username, email: $email, password: $password) {
    token
    user {
      _id
      username
    }
  }
}
`



export const SEND_MESSAGE = gql`


mutation Mutation($input: Text) {
  addMessage(input: $input) {
    messages {
      messageContent
      createdAt
    }
    username
    email
  }
}


`;


export const POST_COMMENT = gql`

mutation Mutation($userid: ID, $commentText: String, $commentAuthor: String) {
  addUserComment(userid: $userid, commentText: $commentText, commentAuthor: $commentAuthor) {
    comments {
      commentAuthor
      commentText
    }
  }
}

`
