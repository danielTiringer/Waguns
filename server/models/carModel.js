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
    this.year = car.year || new Date().getYear();
    this.addedDate = car.addedDate || Date.now();
    this.consumption = car.consumption || 11;
  }
}

module.exports = Car;