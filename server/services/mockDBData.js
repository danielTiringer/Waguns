require('dotenv').config();
const faker = require('faker');

const db = require('./connectToDB');

db.conn.connect(err => {
	err ? console.log('Error connecting to the database.') : console.log(`Database connection status: ${db.conn.state}.`);
});

let createCarTableQuery = `CREATE TABLE IF NOT EXISTS car (
	id INTEGER PRIMARY KEY AUTO_INCREMENT,
	plate VARCHAR(100) NOT NULL,
	make VARCHAR(255) NOT NULL,
	model VARCHAR(255) NOT NULL,
	color VARCHAR(100) NOT NULL,
	picture VARCHAR(255),
	fuel VARCHAR(100),
	category VARCHAR(100) NOT NULL,
	rate INTEGER(100) NOT NULL,
	transmission VARCHAR(100) NOT NULL,
	km INTEGER NOT NULL,
	availability VARCHAR(100) NOT NULL,
	year INTEGER(4) NOT NULL,
	addedDate VARCHAR(255),
	consumption INTEGER
);`;

class Car {
  constructor(car) {
    this.id = car.id || 0;
    this.plate = car.plate || 'aaa-111';
    this.make = car.make || 'default';
    this.model = car.model || 'default';
    this.color = car.color || 'default';
    this.picture = car.picture || null;
    this.fuel = car.fuel || null;
    this.category = car.category || 'A';
    this.rate = car.rate || 0;
    this.transmission = car.transmission || 'manual';
    this.km = car.km || 0;
    this.availability = car.availability || 'nope';
    this.year = car.year || 0;
    this.addedDate = car.addedDate || Date.now();
    this.consumption = car.consumption || 11;
  }
}
module.exports = { Car };


// db.conn.query(createCarTableQuery, (err, res) => {
// 	err ? console.error(err) : console.log(res);
// });


let cars = Array(100).fill(1).map(el => {
	return new Car({
		plate: faker.random.alphaNumeric(6),
		make: faker.address.city(),
		model: faker.commerce.productName(),
		color: faker.commerce.color(),
		picture: faker.image.imageUrl(),
		fuel: faker.random.boolean() == true ? 'diesel' : 'gas',
		category: 'A',
		rate: faker.commerce.price(),
		transmission: faker.random.boolean() == true ? 'manual' : 'automatic',
		km: faker.random.number(99999),
		availability: 'yes',
		year: (faker.random.number(19) + 2000),
		addedDate: Date.now(),
		consumption: faker.random.number(20)
	})
});

cars.forEach(car => {
	let carQuery = `INSERT INTO car (plate, make, model, color, picture, fuel, category, rate, transmission, km, availability, year, addedDate, consumption) VALUES ("${car.plate}", "${car.make}", "${car.model}", "${car.color}", "${car.picture}", "${car.fuel}", "${car.category}", ${car.rate}, "${car.transmission}", ${car.km}, "${car.availability}", ${car.year}, ${car.addedDate}, ${car.consumption});`;
	db.conn.query(carQuery, (err, res) => {
		err ? console.error(err) : console.log(res);
	});
})

let readQuery = "SELECT * FROM car;";

db.conn.query(readQuery, (err, res) => {
	err ? console.error(err) : console.log(res);
});
