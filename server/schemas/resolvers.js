

const User = require("../models/user")



const resolvers = {
    Query:
    {
        user: async () => {

            await User.find({})


        }
    }

}

module.exports = resolvers