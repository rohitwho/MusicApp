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
    Mutation:{
  addUser:async(parent,args)=>{
      return await User.create(args)
  },
  removeUser:async(parent,args)=>{
      return await User.findOneAndDelete(args)
  }
      }

}





module.exports = resolvers
