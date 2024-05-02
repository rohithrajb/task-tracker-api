const nodemailer = require('nodemailer');

// const mailOptions = {
//     from: 'prohibitedroti@gmail.com',
//     to: 'rohithrajb@gmail.com',
//     subject: 'Task Tracker Reminder',
//     text: 'Hellew how are you',
//     html: '<h1>Waddu heck</h1>'
// }

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'prohibitedroti@gmail.com',
        pass: 'hwgt rqln msoc jjuq'
    },
    tls: {
        rejectUnauthorized: false
    }
})

// transporter.sendMail(mailOptions, (err, info) => {
//     if (err) console.log(err);
//     else console.log('Sent mail: ' + info.response);
// })

module.exports = transporter;