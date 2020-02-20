class Car {
  constructor(car) {
    this.id = car.id || 0;
    this.plate = car.plate || 'aaa-111';
    this.make = car.make || 'default';
    this.model = car.model || 'default';
    this.color = car.color || 'default';
    this.picture = car.picture || 'just jk';
    this.fuel = car.fuel || 'no fuel';
    this.category = car.category || 'A';
    this.rate = car.rate || 42;
    this.transmission = car.transmission || 'manual';
    this.km = car.km || 69;
    this.availability = car.availability || 'nope';
    this.year = car.year || new Date().getYear();
    this.addedDate = car.addedDate || Date.now();
    this.consumption = car.consumption || 42;
  }
}

module.exports = Car;
