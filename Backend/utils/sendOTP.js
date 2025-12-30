const nodemailer = require("nodemailer")
const dotenv = require("dotenv")
dotenv.config()

exports.sendOTP = async (options)=>{

  const trasnsporter = nodemailer.createTransport({
      service : "gmail",
      auth: {
      user: process.env.ADMIN_MAIL,
      pass: process.env.ADMIN_PASS,
    },
  });
  
  const mail = {
    from : process.env.ADMIN_MAIL,
    to : options.email,
    subject : options.subject,
    text : options.message
  }
  await trasnsporter.sendMail(mail)
}


