const nodeMailer = require("nodemailer");

const defaultEmailData = { from: "noreply@node-react.com" };

const dotenv = require("dotenv");
dotenv.config();

exports.sendEmail = (emailData) => {
    const transporter = nodeMailer.createTransport({
        host: process.env.HOST_EMAIL,
        port: process.env.PORT_EMAIL,
        // secure: false,
        //requireTLS: true,
        auth: {
            user: process.env.USER_MAIL,
            pass: process.env.PASSWORD_MAIL,
        },
    });
    return transporter
        .sendMail(emailData)
        .then((info) => console.log(`Message sent: ${info.response}`))
        .catch((err) => console.log(`Problem sending email: ${err}`));
};