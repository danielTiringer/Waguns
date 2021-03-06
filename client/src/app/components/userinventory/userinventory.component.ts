import { Observable, Subscription } from 'rxjs';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserinventoryService } from 'src/app/services/userinventory/userinventory.service';
import { Car } from 'src/app/models/car';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-userinventory',
  templateUrl: './userinventory.component.html',
  styleUrls: ['./userinventory.component.css']
})
export class UserInventoryComponent implements OnInit {

  cars: Car[];
  selectedVehicle: number;
  inputStartDate: string;
  startDate: Date;
  endDate: Date;
  bookingResponse: string;


  constructor(private inv: UserinventoryService) {
    this.cars = [];
    this.selectedVehicle = 0;
  }

  ngOnInit(): void {
    this.getVehicles();
  }

  getVehicles() {
    this.inv.getInventory().subscribe(res => {
      this.cars = res;
    }, error => {
      console.log(error);
    });
  }

  selectVehicle(id: number) {
    this.selectedVehicle = id;
  }
  bookVehicle(id: number, startDate: Date, endDate: Date) {
    if (startDate && endDate && id) {
      this.inv.sendBooking(id, startDate, endDate).subscribe(res => {
        this.getVehicles();
        Swal.fire({
          icon: 'success',
          title: 'Vehicle successfully reserved.',
          showConfirmButton: false,
          timer: 3500
        });
      }, error => {
        console.log(error);
      });
    } else {
			Swal.fire({
				icon: 'error',
				title: 'The rental dates are missing.',
				showConfirmButton: false,
				timer: 3500
			})
    }
  }
}
