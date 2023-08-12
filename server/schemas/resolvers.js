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

        signup: async (parent, args) => {
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



    
        addUserComment: async (parent, { userid,commentText,commentAuthor}, context) => {
            try {
                      const comments = await User.findOneAndUpdate(
                { _id: userid },
            { $push: {comments:{commentText,commentAuthor} }},
            { new: true }
            )
         
            return comments
        }catch(err){
            console.error(err);
         }
     }
  }
    }
    

       






module.exports = resolvers
