

const{ User }= require("../models")



const resolvers = {
    Query:
    {
        user: async () => {

            return await User.find({})


        }
    },
    Mutation: {
        addMessage: async (parent, { userId, messageContent }) => {
            try {
                const addMessage = await User.findByIdAndUpdate(
               userId,
                    { $push: { messages: { messageContent } } },
                    { new: true }
                );
                return addMessage;
            } catch (err) {
                console.error(err);
            }
        },
    },


}

module.exports = resolvers