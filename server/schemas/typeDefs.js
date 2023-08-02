const { gql } = require("apollo-server-express");

const typeDefs = gql`



type User{

    _id:ID
     email: String
      username: String
      password:String
     comments:[comments]
       
   
}
type comments{
    commentText:String
    commentAuthor:String
    commentId:ID !
   


}

type Query{
    user: [User]
}
type Mutation{
  addUser (username: String!, email: String!, password: String!): User
  removeUser(username: String!): User
}





`
module.exports = typeDefs