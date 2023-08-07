const { gql } = require("apollo-server-express");

const typeDefs = gql`

scalar GraphQLDateTime

type UserMessages {
    messageContent: String
    messageId: ID!
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

type Query{
    user: [User]
}
type Mutation{
    
    addMessage(userId: ID!, messageContent: String): User
}





`
module.exports = typeDefs
// input userMessages{
//     messageContent:String
//     userId:ID

// }