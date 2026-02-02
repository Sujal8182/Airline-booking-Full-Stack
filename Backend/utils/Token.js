const jws = require("jsonwebtoken")
const dotenv = require("dotenv")
dotenv.config()

exports.TokenGenerate = (id,role,res)=>{
    if (res.headersSent) {
        throw new Error("Headers already sent before setting cookie")
    }
    const token = jws.sign({id, role}, process.env.JWS_CODE,{
        expiresIn : process.env.JWS_EXPIRE
    })

    const options = ({
        expires : new Date(
            Date.now() + Number(process.env.JWS_OPT_EXPIRE) * 24 * 60 * 60 * 1000
        ),
        httpOnly : true
    })

    res.cookie("token", token , options ,
        {   sameSite: "lax",   
            secure: false
        }
    )
    return token
}