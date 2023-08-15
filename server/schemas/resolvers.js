const { AuthenticationError } = require('apollo-server-express');
const { User } = require('../models');
const { signToken } = require('../utls/auth');




const resolvers = {
    Query: {
        user: async (parent, args, context) => {
          try {
            if (context.user) {
                console.log(context.user)
              const userData = await User.findById(context.user._id)
              return userData;
            } else {
              throw new AuthenticationError('Not logged in');
            }
          } catch (err) {
            console.log(err);
            throw new Error('An error occurred while fetching user data');
          }
        },
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


        addMessage: async (parent, { input },context) => {
            try {
                const addMessage = await User.findByIdAndUpdate(
                  {_id:  context.user._id},
                    { $push: { messages: input } },
                    { new: true }
                );
                return addMessage;
            } catch (err) {
                console.error(err);
            }
        },
        addFriend:async(parent,{_id,friendsId})=>{



            try{
                const addFriends =  await User.findByIdAndUpdate(
                    _id,
                    { $push: { friends: friendsId } },
 
                  );
                  return addFriends;




            }catch(err){
                console.log(err)
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
     },

        addDescription: async (parent, {  userdescription },context) => {

            try {
                // console.log(description)
                // console.log(ID)
                const newDescription = await User.findByIdAndUpdate(
                    { _id:context.user._id},
           
                    { $set: {description : userdescription } },
                    { new: true }
                )

                return newDescription
            } catch(err) {
                console.log(err)
            }
        }
  }
    }

    

       






module.exports = resolvers
