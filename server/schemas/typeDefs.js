const { gql } = require("apollo-server-express");

const typeDefs = gql`

scalar GraphQLDateTime

type UserMessages {
    messageContent: String
    _Id: ID!
    createdAt: GraphQLDateTime
}



 type User{

    _id:ID
     email: String
      username: String
      password:String

     comments:[userComments]
     messages:[UserMessages]

       
   
}
type userComments{
    userid:ID
    commentText:String
    commentAuthor:String


}


type Auth{
    token:ID
    user:User
}
input Text{
    messageContent: String
    userId: ID!
    _id:ID
}


  type Query {
    user: [User]
}
type Mutation{
  
    signup(username: String!, email: String!, password: String!): Auth
    login(email:String!, password:String!): Auth
    removeUser(username: String!): User
    addUserComment( userid:ID,commentText:String, commentAuthor:String): User
    addMessage(input :Text): User
    removeUserComment(commentId: ID): User
  }
  



`;

module.exports = typeDefs;

// input AddComments{
//     userid:ID
//     commentText:String
//     commentAuthor:String
// }