const Car = require('../models/carModel');

class UserService {
  constructor(conn) {
    this.conn = conn;
  }

  checkUserRole(userId) {
    return new Promise((resolve, reject) => {
      const query = 'SELECT * FROM users WHERE id = ?;';
      this.conn.query(query, [userId], (err, rows) => {
        if (err) return reject(new Error(500));
        return resolve(rows[0].role)
      });
    });
  }

  getUserData(userId) {
    return new Promise((resolve, reject) => {
      const query = 'SELECT * FROM users WHERE id = ?;';
      this.conn.query(query, [userId], (err, rows) => {
        if (err) return reject(new Error(500));
        delete rows[0].password;
        return resolve(rows[0])
      });
    });
  }

  getRentOfUser(userId) {
    return new Promise((resolve, reject) => {
      const query = 'SELECT carId, year, make, model,rentalTime, returnTimeExp FROM rental INNER JOIN car ON rental.carId = car.id WHERE rental.userId = ? AND cancelled = 0 AND returnTimeAct IS NULL;'

      this.conn.query(query, [userId], (err, rows) => {
        if (err) return reject(new Error(500));
        return resolve(rows);
      });
    });
  }
}

module.exports = UserService;