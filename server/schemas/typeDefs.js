const { gql } = require("apollo-server-express");

const typeDefs = gql`
  scalar GraphQLDateTime

  type UserMessages {
    messageContent: String
    _id: ID!
    createdAt: GraphQLDateTime
  }

  type User {
    _id: ID!
    email: String!
    username: String!
    description: String
    friends: [User]

    comments: [userComments]
    messages: [UserMessages]
  }
  type userComments {
    userid: ID
    commentText: String
    commentAuthor: String
  }


  type Subscription {
    messageAdded (input: Text): User
  }

  type Auth {
    token: ID!
    user: User
  }
  input Text {
    messageContent: String

  }



  type Query {
    user: User !
    
  }
  type Subscription{
    messages: [UserMessages]
  }
  

  input updateProfile {
    username: String!
    email: String!
    description: String!
  }

  type Mutation {
    signup(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    removeUser(username: String!): User
    addUserComment(userid: ID, commentText: String, commentAuthor: String): User
    addMessage(input: Text): User
    removeUserComment(commentId: ID): User
    addFriend(_id:ID,friendsId : ID): User
    updateUserProfile(input: updateProfile!): User
  }
`;

module.exports = typeDefs;

// input AddComments{
//     userid:ID
//     commentText:String
//     commentAuthor:String
// }
// input descriptionInput{
//   description: String
// }