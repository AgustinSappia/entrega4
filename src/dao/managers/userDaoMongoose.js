const { userModel } = require("../models/user.model");

class UserDaoMongo {

    getUsers = async()=>{
        try {
            return await userModel.find({})
        } catch (error) {
            return error
        }
    }

    getUserById = async(id)=>{
        try {
            return await userModel.find({_id:id})
        } catch (error) {
            return error
        }
    }




}

module.exports = UserDaoMongo