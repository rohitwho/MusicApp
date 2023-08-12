import  {gql} from "@apollo/client"

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
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


`