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
    commentText:String
    commentAuthor:String
    commentId:ID !
   


}
input addComment{
    commentText:String
    commentAuthor:String

   


}


type Query{
    user: [User]
}
type Mutation{
  addUser (username: String!, email: String!, password: String!): User
  removeUser(username: String!): User
  addComment(comments: addComment): userComments
removeComment(commentId: ID!): comments
updateComment(commentId: ID!): comments
}





`
module.exports = typeDefs