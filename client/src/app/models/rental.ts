export class Rental {
  carId: number; 
  userId: number;
  rentalTime: number;
  returnTimeExpected: number;
  returnTimeActual: number;

  constructor(rental) {
    this.carId = rental.carId;
    this.rentalTime = rental.rentalTime;
    this.returnTimeExpected = rental.returnTimeExpected;
    this.returnTimeActual = rental.returnTimeActual;
  }
}