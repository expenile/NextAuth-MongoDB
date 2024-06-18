import User from '@/models/userModel';
import nodemailer from 'nodemailer';
import bcrypt from 'bcryptjs'

export const sendEmail = async({email, emailType, userId}:any) =>{

    try {
      const hashedToken = await bcrypt.hash(userId.toString(),10)
        //configure mail for usage
        if (emailType === "VERIFY") {
          await User.findByIdAndUpdate(userId,
            {verifyToken:hashedToken, verifyTokenExpire:Date.now()+3600000}
          )
        }
        else if (emailType === "RESET"){
          await User.findByIdAndUpdate(userId,
            {forgotPasswordToken:hashedToken, forgotPasswordTokenExpire:Date.now()+3600000}
          )
        }

        var transport = nodemailer.createTransport({
          host: "sandbox.smtp.mailtrap.io",
          port: 2525,
          auth: {
            user: "4e6fbe042dc780",  
            pass: "91e0080ecd67e4"
          }
        });

          const mailOptions = {
            from: 'sendermail@,ai', // sender address
            to: email, // list of receivers
            subject: emailType === 'VERIFY' ? "Verify your email": "Reset you password", // Subject line
            html: `<p>Click <a href="${process.env.DOMAIN}/verifyemail?token=${hashedToken}">here</a> to ${emailType === "VERIFY" ? "verify your email" : "Reset your password"} or copy and paste the link below in your browser.<br> ${process.env.DOMAIN}/verifyemail?token=${hashedToken} </p>`, // html body
          };

          const mailResponse = await transport.sendMail(mailOptions);
    } catch (error:any) {
        throw new Error(error.message);
        
    }
}