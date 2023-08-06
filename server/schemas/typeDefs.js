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
    userid:ID
    commentText:String
    commentAuthor:String


}

input AddComments{
    userid:ID
    commentText:String
    commentAuthor:String
}

type Query{
    user: [User]
}
type Mutation{
  addUser (username: String!, email: String!, password: String!): User
  removeUser(username: String!): User
  addUserComment(input:AddComments): User

}





`
module.exports = typeDefs