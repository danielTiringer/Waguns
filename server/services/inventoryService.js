const Car = require('../models/carModel')

class InventoryService {
  constructor(conn) {
    this.conn = conn;
  }

  getFullInventory() {
    return new Promise((resolve, reject) => {
      const query = 'SELECT * FROM car;';

      this.conn.query(query, [], (err, rows) => {
        if (err) reject(new Error(500));
        rows.forEach(e => e = new Car(e));
        return resolve(rows);
      });
    });
  }

  getAvailable() {
    return new Promise((resolve, reject) => {
      const query = 'SELECT * FROM car WHERE availability = "yes";';

      this.conn.query(query, [], (err, rows) => {
        if (err) reject(new Error(500));
        rows.forEach(e => e = new Car(e));
        return resolve(rows);
      });
    });
  }

  getMetrics(type) {
    return new Promise((resolve, reject) => {
			// List the most popular cars
			if (type === 'popular') {
				const query = 'SELECT make, COUNT(make) FROM car GROUP BY make ORDER BY make DESC limit 10;';
				this.conn.query(query, [], (err, rows) => {
					if (err) reject(new Error(500));
					return resolve(rows);
				});
			} else if (type === 'earning') {
				// Monthly gross income
				const query = 'SELECT rental.returnTimeExp, rental.rentalTime, car.rate FROM rental LEFT JOIN car on rental.carId = car.id;';
				this.conn.query(query, [], (err, rows) => {
					if (err) reject(new Error(500));
					let datedEarnings = {};
					rows.forEach(row => {
						row.rate == 0 ? row.rate = 500 : null;
						let earning = ((row.returnTimeExp - row.rentalTime)/1000/3600/24) * row.rate
						let date = row.rentalTime.toString();
						if (!datedEarnings[date.substring(11, 15).concat('-' + date.substring(4,7))]) {
							datedEarnings[date.substring(11, 15).concat('-' + date.substring(4, 7))] = earning
						} else {
							datedEarnings[date.substring(11, 15).concat('-' + date.substring(4, 7))] += earning
						}
					});
					return resolve(datedEarnings);
				});
			}

				// Number of available cars over time
				// const query = ';';

    });
  }
}

module.exports = InventoryService;
