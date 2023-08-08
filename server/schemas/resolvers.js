const { AuthenticationError } = require('apollo-server-express');
const { User } = require('../models');
const { signToken } = require('../utls/auth');



const resolvers = {
    Query:
    {
        user: async () => {

            return await User.find({})


        }
    },
    Mutation: {
        addUser: async (parent, args) => {
            const user = await User.create(args)
            const token = signToken(user)
            return { token, user }
        },
        login: async (parent, { email, password }) => {
            const user = await User.findOne({ email });

            if (!user) {
                throw new AuthenticationError('Incorrect credentials');
            }

            const correctPw = await user.isCorrectPassword(password);

            if (!correctPw) {
                throw new AuthenticationError('Incorrect credentials');
            }

            const token = signToken(user);
            return { token, user };
        },
        removeUser: async (parent, args) => {
            return await User.findOneAndDelete(args)
        },
        addUserComment: async (parent, { input }, context) => {
            try {
                if (context.user) {

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
