async function userLogout(req,res){
    try{
      tokenOptions = {
        httpOnly: true,
        secure: true, 
        sameSite: 'None',
      };

        res.clearCookie("token", tokenOptions)

        res.json({
            message : "Logged out successfully",
            error : false,
            success : true,
            data : []
        })
    }catch(err){
        res.json({
            message : err.message || err  ,
            error : true,
            success : false,
        })
    }
}


module.exports = userLogout