const Car = require('../models/carModel')

class InventoryService {
  constructor(conn, userService) {
    this.conn = conn;
    this.validateDate = this.validateDate.bind(this);
    this.createDate = this.createDate.bind(this);
    this.userService = userService;
  }

  validateDate(input) {
    const date = /^\d{4}\-\d{2}\-\d{2}$/;

    if (input && date.test(input)) return true;
    return false;
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
            let earning = ((row.returnTimeExp - row.rentalTime) / 1000 / 3600 / 24) * row.rate
            let date = row.rentalTime.toString();
            if (!datedEarnings[date.substring(11, 15).concat('-' + date.substring(4, 7))]) {
              datedEarnings[date.substring(11, 15).concat('-' + date.substring(4, 7))] = earning
            } else {
              datedEarnings[date.substring(11, 15).concat('-' + date.substring(4, 7))] += earning
            }
          });
          return resolve(datedEarnings);
        });
      }
    });
  }
  // Number of available cars over time
  // const query = ';';

  async addCar(car, userId) {
    let role = await this.userService.checkUserRole(userId);

    car = new Car(car);
    return new Promise((resolve, reject) => {
      if (role !== 'admin') return reject(new Error(418));

      const query = 'INSERT INTO car (plate, make, model, color, picture, fuel, category, rate, transmission, km, availability, year, addedDate, consumption) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?);';

      this.conn.query(query, [car.plate, car.make, car.model, car.color, car.picture, car.fuel, car.category, car.rate, car.transmission, car.km, car.availability, car.year, car.addedDate, car.consumption], (err, rows) => {
        if (err) return reject(new Error(500));
        return resolve(rows);
      });
    });
  }

  removeCar(carId, userId) {
    return this.updateCar(carId, 'availability', 'sold', userId)
      .catch((err) => Promise.reject(err));
  }

  async updateCar(carId, whatToUpdate, whatToUpdateItTo, userId) {
    let role = await this.userService.checkUserRole(userId);

    return new Promise((resolve, reject) => {
      if (role !== 'admin') return reject(new Error(418));
      const query = `UPDATE car SET ${whatToUpdate} = ? WHERE id = ?;`;

      this.conn.query(query, [whatToUpdateItTo, carId], (err) => {
        if (err) return reject(new Error(500));
        return resolve('ok');
      });
    });
  }

  checkIfCarAvailable(carId) {
    return new Promise((resolve, reject) => {
      const query = 'SELECT * FROM rental WHERE carId = ? AND returnTimeAct IS NULL;';

      this.conn.query(query, [carId], (err, rows) => {
        if (err) return reject(new Error(500));
        return resolve(rows.length);
      });
    });
  }

  createDate(date = new Date()) {
    let dd = date.getDay();
    dd = dd < 10 ? '0' + dd : dd;
    let mm = date.getMonth();
    mm = mm < 10 ? '0' + mm : mm;
    let yyyy = date.getFullYear();

    return yyyy + '-' + mm + '-' + dd
  }

  async rentCar(carId, userId, returnTimeExp, rentalTime = 0) {
    let availability = await this.checkIfCarAvailable(carId);
    if (!this.validateDate(rentalTime)) rentalTime = this.createDate();
    await this.updateCar(carId, 'availability', 'rented', 1)
    return new Promise((resolve, reject) => {
      if (availability > 0) return reject(new Error(409));
      if (!this.validateDate(returnTimeExp)) return reject(new Error(400))
      const query = 'INSERT INTO rental(carId, userId, rentalTime, returnTimeExp) VALUES(?,?,?,?);';

      this.conn.query(query, [carId, userId, rentalTime, returnTimeExp], (err, rows) => {
        if (err) return reject(new Error(500));
        return resolve('ok');
      });
    })
  }
}

module.exports = InventoryService;
