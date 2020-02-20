const Car = require('../models/carModel')

class InventoryService {
  constructor(conn) {
    this.conn = conn;
  }

  getFullInventory() {
    return new Promise((resolve, reject) => {
      const query = 'SELECT * FROM car;';

      this.conn.query(query, [], (err, rows) => {
        if (err) reject(new Error(500))
        rows.forEach(e => e = new Car(e))
        return resolve(rows)
      });
    });
  }
}

module.exports = InventoryService;