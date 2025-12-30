exports.authorizeRoles = (...allowedRoutes) => {
    return (req,res,next)=>{
        if(!req.user){
            return res.status(400).json({ message : "Not authenticated"})
        }

        if(!allowedRoutes.includes(req.user.role)){
            return res.status(404).json({
                message : "You are authorised to access this resource"
            })
        }
        next()
    }
}