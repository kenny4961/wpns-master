const nodemailer = require('nodemailer');
const mailGun = require('nodemailer-mailgun-transport');

const auth = {
    auth: {
        api_key: '57c9d3de4ce10b80585b9eb7a1d43261-0d2e38f7-fa9e7fc7',
        domain: 'sandbox6cc8022942a34b529214ba2be6c15e84.mailgun.org'
    }
};

const transporter = nodemailer.createTransport(mailGun(auth));




const epp = (email, subject, text, cb) => {
    const Options = {
        from: email,
        to:'kenokoli100@gmail.com',
        subject,
        text
    };
    

    transporter.sendMail(Options, function (err, data) {
        if (err) {
            cb(err, null)
        } else {
            cb(null, data);
        }
    });
};
module.exports = epp;