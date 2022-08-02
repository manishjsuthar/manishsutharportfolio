export default function (req, res) {
    require('dotenv').config()

    let nodemailer = require('nodemailer')
    const transporter = nodemailer.createTransport({
      port: 587,     
      host: "smtp.gmail.com",
         auth: {
              user: process.env.EMAIL,
              pass: process.env.PASS,
           },
    //   secure: true,
    });
    
    const mailData = {
        from: `${req.body.email}`,
        to: process.env.EMAIL,
        subject: `Message From ${req.body.name}`,
        text: req.body.message + " | Sent from Email: " + req.body.email + ", Phone No.: "+ req.body.phone, 
        html: `<div>${req.body.message}</div><p>Sent from Email: ${req.body.email}, Phone No.: ${req.body.phone}</p>`
    }
  
    transporter.sendMail(mailData, function (err, info) {
        if(err)
          console.log(err)
        else
          console.log(info);
    })
  
    console.log(req.body)
    res.send('success')
  }