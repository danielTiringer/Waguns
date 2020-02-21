const bcrypt = require('bcryptjs');

class RegistrationService {
  constructor(conn, mailService) {
    this.conn = conn;
    this.hashPassword = this.hashPassword.bind(this);
    this.mailService = mailService;
  }

  checkIfUserNameNumLatinLetters(input) { // eslint-disable-line
    const user = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/;
    if (input && user.test(input)) return true;
    return false;
  }

  checkIfPasswordNumLatinLetter(input) { // eslint-disable-line
    const passw = /^[A-Za-z0-9]\w{7,}$/;

    if (input && passw.test(input)) return true;
    return false;
  }

  containsUser(item) {
    return new Promise((resolve, reject) => {
      const query = 'SELECT * FROM users WHERE username = ?;';
      this.conn.query(query, [item.username], (err, row) => {
        err ? reject(new Error(500)) : resolve(row);
      });
    });
  }

  hashPassword(item) {
    return new Promise((resolve, reject) => {

      // Hash password
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(item.password, salt, (err, hash) => {
          if (err) { throw err; }
          item.password = hash;
          resolve(item);
        })
      })
    })
  }

  insertUser(item) {
    return new Promise((resolve, reject) => {
      const query = 'INSERT INTO users (username, password, phone, DOB, licence, name) VALUES (?, ?, ?, ?, ?, ?);';

      this.conn.query(query, [item.email, item.password, item.phoneNumber, item.dateOfBirth, item.licenceNumber, item.name], (err, row) => {
        err ? reject(new Error(500)) : resolve(row.insertId);
      });
    });
  }

  async createUser(item) {
    const userData = await this.containsUser(item);
    return new Promise(async (resolve, reject) => {
      if (!this.checkIfUserNameNumLatinLetters(item.email) || !this.checkIfPasswordNumLatinLetter(item.password)) {
        reject(new Error(400));
      } else if (item.password !== item.confirmPsw) {
        reject(new Error(400));
      } else if (!userData.length) {
        item = await this.hashPassword(item)
        this.mailService.main(item.email, `
        <body>
          <h1>Dear user,</h1>
          <p>Thank you for registering. That's so nice of you. Please
          enjoy!</p>
          <h3>With love,</h3>
          <h2>Waguns</h2>
        </body>`, 'Your registration was successful')
        resolve(this.insertUser(item));
      } else {
        reject(new Error(500));
      }
    });
  }
}

module.exports = RegistrationService;
