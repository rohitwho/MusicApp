

const { User } = require("../models")

const { ObjectId } = require('mongoose').Types;

const resolvers = {
    Query:
    {
        user: async () => {

            return await User.find({})


        }
    },
    Mutation: {
        addUser: async (parent, args) => {
            return await User.create(args)
        },
        removeUser: async (parent, args) => {
            return await User.findOneAndDelete(args)
        },
        addUserComment: async (parent, { userid,commentText,commentAuthor}) => {
         
console.log(userid)
console.log(commentText)
console.log(commentAuthor)

    
                const comments = await User.findOneAndUpdate({
                    id: userid
                },
                { $set: {userComments:{userid,commentText,commentAuthor}} },
                { new: true }
                
                
                )
             
                return comments
            }
        }
    
}

module.exports = resolvers
