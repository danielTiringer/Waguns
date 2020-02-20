export class Car {
  id: number;
  plate: string;
  make: string;
  model: string;
  color: string;
  picture: string;
  fuel: string;
  category: string;
  rate: number;
  transmission: string;
  km: number;
  availability: string;
  year: number;
  consumption: number;
  addedDate: number;

  constructor(car) {
    this.id = car.id;
    this.plate = car.plate;
    this.make = car.make;
    this.model = car.model;
    this.color = car.color;
    this.picture = car.picture;
    this.fuel = car.fuel;
    this.category = car.caregory;
    this.rate = car.rate;
    this.transmission = car.transmission;
    this.km = car.km;
    this.availability = car.availability;
    this.year = car.year;
    this.consumption = car.consumption;
    this.addedDate = car.addedDate;
  }
}