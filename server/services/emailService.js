const nodemailer = require('nodemailer');

class EmailService {
  constructor() {
    this.main = this.main.bind(this);
  }

  async main(email) {
    let transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PW,
        client: process.env.EMAIL_CLIENT
      }
    });

    let info = await transporter.sendMail({
      from: '"us" <poopsapp@gmail.com>',
      to: email,
      subject: 'Your registration was successful',
      text: '',
      html: `
      <body>
        <h1>Dear user</h1>
        <p>Thank you for registering to our fabulous site. That's so nice of you. You're probably our first user. Please
        enjoy!</p>
        <h3>With love,</h3>
       <h2>Waguns</h2>
      </body>`
    })
    console.log('message sent', info.messageId)
  }
}

module.exports = EmailService;