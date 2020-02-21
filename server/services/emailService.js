const nodemailer = require('nodemailer');

class EmailService {
  constructor() {
    this.main = this.main.bind(this);
  }

  async main(email, html, subject) {
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

    await transporter.sendMail({
      from: '"Waguns" <poopsapp@gmail.com>',
      to: email,
      subject: subject,
      text: '',
      html: html
    })
  }
}

module.exports = EmailService;