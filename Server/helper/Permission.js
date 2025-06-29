const userModel = require("../models/userModel")

const uploadProductPermission = async(userId) => {
    const user = await userModel.findById(userId)
    console.log("user in uploadProductPermission", user);
    

    if(user.role === 'admin'){
        return true
    }

    return false
}


module.exports = uploadProductPermission