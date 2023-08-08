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

     comments:[comments]
     messages:[UserMessages]

       
   
}
type userComments{
    userid:ID
    commentText:String
    commentAuthor:String


}
input Text{
    messageContent: String
    userId: ID!
    _id:ID
}

input AddComments{
    userid:ID
    commentText:String
    commentAuthor:String
}


  type Query {
    user: [User]
}
type Mutation{
    addUser (username: String!, email: String!, password: String!): User
    removeUser(username: String!): User
    addComment(input: addComment): userComments
    removeComment(commentId: ID!): comments
    updateComment(commentId: ID!): comments


}



`;


module.exports = typeDefs;


