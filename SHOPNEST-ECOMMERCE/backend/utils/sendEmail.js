const nodemailer = require("nodemailer");

const sendEmail = async ({email, subject, message}) => {
    try{
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth:{
                user:process.env.GMAIL_USER,
                pass:process.env.GMAIL_PASS // App Password mapping
            },
        });

        const mailOptions = {
            from: `"ShopNest Support" <${process.env.GMAIL_USER}>`,
            to: email,
            subject: subject,
            html: message,
        };

        await transporter.sendMail(mailOptions);
        console.log(`Email successfull sent to ${email}`);
    }catch(err) {
        console.log(`Failed to send email to ${email}: ${err.message}`);
    }
}

module.exports = sendEmail;