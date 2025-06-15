import nodemailer from "nodemailer"
import dotenv from "dotenv"
import { error, info } from "console";
import { text } from "stream/consumers";

dotenv.config()

//create transporter

const transporter = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    secure: true,
    auth:{
        user: process.env.EMAIL_SENDER,
        pass: process.env.EMAIL_PASSWORD 
    }

});

// transporter.sendMail({
//     from: `my NodeMailer ${process.env.EMAIL_SENDER}`,
//     to:'kagurups@gmail.com',
//     subject:"Test Email",
//     text:"Hello from your SMTP MAILER"
// }, (err , info) =>{
//     if(err) return console.error(err);
//     console.log('Email Sent:', info.response)
// })

export const sendNotificationEmail =async (email:string , subject:string , message:string) =>{
    try {
       const transporter = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    secure: true,
    auth:{
        user: process.env.EMAIL_SENDER,
        pass: process.env.EMAIL_PASSWORD 
    }

});

const mailOptions = {
    from: process.env.EMAIL_SENDER,
    to: email,
    subject: subject,
    text: `${message}\n`,
    html: `
    <html>
    <head>
      <style>
        .email-container {
          font-family: 'Segoe UI', Arial, sans-serif;
          background: #f9f9f9;
          padding: 32px;
          border-radius: 10px;
          max-width: 480px;
          margin: 40px auto;
          box-shadow: 0 2px 8px rgba(0,0,0,0.08);
        }
        .email-header {
          color: #2d7ff9;
          margin-bottom: 16px;
        }
        .email-message {
          color: #333;
          font-size: 1.1em;
          margin-bottom: 24px;
        }
        .email-footer {
          color: #888;
          font-size: 0.95em;
          margin-top: 32px;
          border-top: 1px solid #eee;
          padding-top: 12px;
        }
      </style>
    </head>
    <body style="background: #f0f4f8;">
      <div class="email-container">
        <h2 class="email-header">${subject}</h2>
        <p class="email-message">${message}</p>
        <p>Enjoy Our Services!</p>
        <div class="email-footer">
          &copy; ${new Date().getFullYear()} Thee Restaurant. All rights reserved.
        </div>
      </div>
    </body>
    </html>
    `,
}
    const mailResponse =await transporter.sendMail(mailOptions);

    if(mailResponse.accepted.length > 0){
        return "notification email sent successfully"
    }else if(mailResponse.rejected.length>0){
        return"notification email not sent , please try again"
    }else{
        return "Email server error"
    }
        
    } catch (error) {
        return "Email Server Error"
    }
}