

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
        addComment: async (parent, { input }, context) => {
            if (context.user) {

                const comments = await User.findOneAndUpdate({
                    _id: context.user._id
                },
                    { $push: { input: comments } },
                    { new: true }


                )

                return comments
            }
        },
    }

}

module.exports = resolvers