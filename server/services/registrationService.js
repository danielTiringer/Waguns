const bcrypt = require('bcryptjs');

class RegistrationService {
  constructor(conn) {
    this.conn = conn;
		this.hashPassword = this.hashPassword.bind(this)
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
      const query = 'INSERT INTO users (username, password) VALUES (?, ?);';

      this.conn.query(query, [item.username, item.password], (err, row) => {
        err ? reject(new Error(500)) : resolve(row.insertId);
      });
    });
  }

  async createUser(item) {
    const userData = await this.containsUser(item);
    return new Promise(async (resolve, reject) => {
      if (!this.checkIfUserNameNumLatinLetters(item.username) || !this.checkIfPasswordNumLatinLetter(item.password)) {
        reject(new Error(400));
      } else if (item.password !== item.confirmPsw) {
        reject(new Error(400));
      } else if (!userData.length) {
				item = await this.hashPassword(item)
        resolve(this.insertUser(item));
      } else {
        reject(new Error(500));
      }
    });
  }
}

module.exports = RegistrationService;
