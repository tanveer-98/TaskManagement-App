//yarn add @sendgrid/mail
const sgMail = require('@sendgrid/mail');
const path = require('path')
require('dotenv').config({ path: path.resolve(__dirname,`../../${process.env.NODE_ENV}.env`) });
sgMail.setApiKey(process.env.SENDGRID_APIKEY);

const sendWelcomeEmail = (email,name)=>{
    sgMail.send({
        to:email,
        from :'tnvrahmed981@gmail.com',
        subject: "Thanks for joining in!",
        text : `Welcome to the app , ${name} Let me know how you get along with the app`
    })    
}


const sendCancellationEmail = (email,name)=>{
    sgMail.send({
        to:email,
        from :'tnvrahmed981@gmail.com',
        subject: "Will see you soon in the future",
        text : `Thanks for using the app , ${name} HOpe you enjoyed the experience`
    })    
}

const sendForgotPassword = (email,password) => {
    sgMail.send({
        to:email,
        from :'tnvrahmed981@gmail.com',
        subject: "Password Retreived",
        text : `Your password is ${password}`
    }) 
}
module.exports = {
    sendForgotPassword , 
    sendWelcomeEmail,
    sendCancellationEmail
}

