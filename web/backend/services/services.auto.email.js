const nodemailer = require('nodemailer');

const transporter = nodemailter.createTransporter({
    service:"ordermail",
    auth:{
        user:process.env.USER_GMAIL,
        pass:process.env.PASS_GMAIL,
    }
})

const options = (name_user_to_mail) =>{
    from:"user",
    to:`{$user}`,
    subject:"Sending your order, you downloaded"
    text:'Email',
}

transporter.sendMail(options, function(err,info){
    if(err){
        console.log(err)
    }else{
        console.log(info.response)
    }
})

