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
}

module.exports = UserService;