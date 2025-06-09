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

const mailOptions ={
    from: process.env.EMAIL_SENDER,
    to:  email ,
    subject: subject,
    text: `${message}\n`,
    html: `<html>
    <head> </head>
    <body>
    
    </body>
    </html>`
}
        
    } catch (error) {
        
    }
}