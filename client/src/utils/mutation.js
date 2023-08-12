import  {gql} from "@apollo/client"





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
export const SIGN_UP = gql`




`