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
type comments{
    commentText:String
    commentAuthor:String
    commentId:ID !
   


}
input Text{
    messageContent: String
    userId: ID!
    _id:ID
}

type Query{
    user: [User]
}
type Mutation{
    addUser(  email: String,
        username: String,
        password:String): User
    addMessage(input :Text): User
    
    
}





`
module.exports = typeDefs
// input userMessages{
//     messageContent:String
//     userId:ID

// }