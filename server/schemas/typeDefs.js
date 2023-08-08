const { gql } = require("apollo-server-express");

const typeDefs = gql`



type User{

    _id:ID
     email: String
      username: String
      password:String
     comments:[userComments]
       
   
}

type userComments{
    commentId :ID
    commentText:String
    commentAuthor:String


}
type Auth{
    token:ID
    user:User
}

input AddComments{
    commentId:ID
    commentText:String
    commentAuthor:String
}

type Query{
    user: [User]
}
type Mutation{
  addUser (username: String!, email: String!, password: String!): Auth
  login(email:String!, password:String!): Auth
  removeUser(username: String!): User
  addUserComment( input: AddComments): User
  removeUserComment(commentId: ID): User
}





`
module.exports = typeDefs