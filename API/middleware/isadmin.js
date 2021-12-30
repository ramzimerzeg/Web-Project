module.exports = async(req,res,next)=>{
    if (req.user.isadmin) {
        return next();
    } else {
        return res.status(401).send("not admin");
    }
};