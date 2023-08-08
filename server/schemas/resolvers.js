

const{ User }= require("../models")



const resolvers = {
    Query:
    {
        user: async () => {

            return await User.find({})


        }
    },
    Mutation: {
        addUser: async(parent,args)=>{
            const newUser = await User.create(args)
            return newUser
        },
        addMessage: async (parent, { input }) => {
            try {
                const addMessage = await User.findByIdAndUpdate(
                  {_id:  input.userId},
                    { $push: { messages: input } },
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