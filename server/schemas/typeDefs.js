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
    _id:ID
    commentText:String
    commentAuthor:String


}



type Query{
    user: [User]
}
type Mutation{
  addUser (username: String!, email: String!, password: String!): User
  removeUser(username: String!): User
  addUserComment(userid:ID, commentText:String, commentAuthor:String): User

}





`
module.exports = typeDefs