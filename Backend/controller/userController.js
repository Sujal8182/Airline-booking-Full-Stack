
const AirUser = require("../model/userModel")
const bcrypt = require("bcrypt")
const { TokenGenerate } = require("../utils/Token")
const OTP = require("../model/otpmodel")
const { sendOTP } = require("../utils/sendOTP")


exports.AddAirUser = async (req, res) => {
    try {
        const { name, email, password } = req.body

        if (!name || !email || !password) {
            return res.status(400).json({ message: "All fields required" })
        }

        const extAirUser= await AirUser.findOne({email}).select("+password")
        if (extAirUser) {
        return res.status(401).json({ message: "AirUser Already Exist !" })
        }

        const hashPass = await bcrypt.hash(password, 10)
        const user = await AirUser.create(
            { name,
              email,
              password : hashPass 
            })

        TokenGenerate(user._id, res)

        return res.status(201).json({
            success: true,
            message: "Registraion Successfull!",
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role
                  }
        })

    } catch (error) {
        if (res.headersSent) return
        return res.status(500).json({ error: error.message })
    }
}
exports.getall = async (req,res)=>{
     const Airuser = await AirUser.find();
    res.status(200).json({ success: true, Airuser });

}

exports.Login = async (req,res)=>{
    const {email, password } = req.body

    if (!email || !password) {
        return res.status(400).json({ message: "All fields required" })
    }

    const Airuser= await AirUser.findOne({email}).select("+password")

     if (!Airuser) {
        return res.status(404).json({ message: "User not found !" });
    }

    const isMatch = await bcrypt.compare(password, Airuser.password)
    if (!isMatch) {
        return res.status(401).json({ message: "Invalid credentials" })
    }  

    TokenGenerate(Airuser._id, res)

    res.status(200).json({
        success: true,
        message: "Login successful",
        user: {
        id: Airuser._id,
        name: Airuser.name,
        email: Airuser.email,
        role: Airuser.role
      }
    });
}
exports.getMe = async (req, res) => {
  res.status(200).json({
    user: req.user
  })
}

exports.logout = async (req,res)=>{
    res
        .status(200)
        .cookie("token","",{
            httpOnly : true,
            expireAt : new Date(0),
            samesite : "lax",
            secure : false
        })
        .json("Log out Successfully")
}

exports.singleUser = async (req, res) => {
  const id = req.params.id;
  const user = await User.findById(id);
  if (!user) {
    return res.status(400).json({ message: "User not found" });
  }
  res.status(201).json({ success: true, user });
};


exports.UpdateAirUser= async (req,res)=>{
    const Id = req.params.id
    const Airuser= await AirUser.findByIdAndUpdate(Id, {email},{
        new : true,
        runValidators : true  
    })
     if (!Airuser) {
        return res.status(404).json({ message: "AirUser not found !" });
    }

    res.status(200).json({ message: "AirUser Updated Successfully.", Airuser});
}   

exports.deleteAirUser= async (req, res) => {
    const id = req.params.id
    const AirUser= await AirUser.findByIdAndDelete(id);

    if (!AirUser) {
        return res.status(404).json({ message: "AirUsernot found !" });
    }
    res.status(200).json({success: true, message: "User Deleted Successfully."});
}

exports.adminLogin = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: "Email and Password are required" });
  }

  const user = await AirUser.findOne({ email, role: "ADMIN" }).select("+password");

  if (!user) {
    
    return res.status(400).json({ message: "Admin not found" });
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(400).json({ message: "Email and Password not matched" });
  }
  const token = generateToken(user._id, res);
  res.status(201).json({ success: true, token, user });
};

exports.forgotpassword = async (req,res)=>{
    const {email } = req.body

    if(!email ){
        return res.status(400).json({message : "all fields are required"})
    }

    const user = await AirUser.findOne({email})

    if(!user){
        return res.status(404).json({message : "User not found"})
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    await OTP.findByIdAndUpdate(
        { email },
        { email, otp, expireAt : Date.now() + 10 * 60 * 1000},
        { upsert : true}
    );

    await sendOTP({
        email,
        subject : "OTP for password reset",
        text : `OTP ${otp}`,
    })

    res.status(201).json({ message : "OTP send Successfully"})
}

exports.verifyOTPandUpdatePassword = async (req,res)=>{

    const {email, otp , password,confirmpassword} = req.body
    
    if (!email || !otp || !password || !confirmPassword) {
    return res.status(401).json({ message: "All filds required" });
    }

    const checkOTP = await OTP.findOne({email})
    if (!checkOTP) {
    return res.status(401).json({ message: "OTP not found" });
    }

    if(!checkOTP.otp !== otp){
        return res.status(401).json({ message: "OTP invalid" });
    }

    if(checkOTP.expireAt < Date.now()){
        return res.status(401).json({ message: "OTP is expired" });
    }

    const user = await AirUser.findOne({email})
    if (!user) {
    return res.status(401).json({ message: "User not found" });
    }

    if (password !== confirmPassword) {
    return res.status(401).json({ message: "Password dose not match" });
    }

    const hassPass = await bcrypt.hash(password, 10);

    user.password = hassPass;
    await user.save()
    await OTP.deleteOne({email})

    res.status(201).json({ message : "Password reset successfully"})

}
