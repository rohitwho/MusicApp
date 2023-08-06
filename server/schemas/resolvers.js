

const { User } = require("../models")



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
        addUserComment: async (parent, {input },context) => {
    try{
        if(context.user){

            const comments = await User.findOneAndUpdate(
                { _id: userid },
            { $push: {comments:input }},
            { new: true }
            )
         
            return comments
        }
    }catch(err){
        console.error(err);
    }
}
    }
    
}

module.exports = resolvers
