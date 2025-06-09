import nodemailer from "nodemailer"

//create a test account transporter

const transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port:587,
    secure:false,
    auth:{
        user: 'vita.waelchi6@ethereal.email',
        pass: '2rxmBkT2K49saJVR9N'
    }

});

//callback fn
// transporter.verify((success , error) =>{

//     if(error){
//         console.log(error)
//     }else{
//         console.log('server is ready to take our messages')
//     }
// })


(async() =>{
    const info =await transporter.sendMail({
        from:'"Vita Waelchi" <vita.waelchi6@ethereal.email>',
        to:"kagurups@gmail.com",
        subject: "Hello 🫡",
        text: "Hello World",
        html:"<br>Hello World </>"
    });
    console.log("message sent " , info.messageId)
})()