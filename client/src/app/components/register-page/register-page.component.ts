import { Component, OnInit } from '@angular/core';
import { RegisterService } from '../../services/register/register.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.scss']
})
export class RegisterComponent implements OnInit {
  email: string;
  password: string;
  confirmPsw: string;
  name: string;
  phoneNumber: string;
  dateOfBirth: string;
  licenceNumber: string;

  emailError: string;
  passwordError: string;
  confirmPswError: string;
  nameError: string;
  phoneNumberError: string;
  dateOfBirthError: string;
  licenceNumberError: string;

  emailStatus: boolean;
  passwordStatus: boolean;
  confirmPswStatus: boolean;
  nameStatus: boolean;
  phoneNumberStatus: boolean;
  dateOfBirthStatus: boolean;
  licenceNumberStatus: boolean;

  messageSuccess: string;

  constructor(private registerService: RegisterService, private router: Router) { }

  ngOnInit() {
  }

  checkEmail(email: string): boolean {
    return (email !== undefined && email.length > 0);
  }

  emailValidation(input) {
    const user = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/;
    return (input && user.test(input));
  }

  checkPassword(password: string): boolean {
    return (password !== undefined && password.length > 7);
  }
  
  checkIfPasswordNumLatinLetter(input: string): boolean {
    const passw = /^[A-Za-z0-9]\w{7,}$/;
    return (input && passw.test(input));
  }
  
  checkConfirmPassword(password: string, confirmPsw: string): boolean {
    return (password  === confirmPsw);
  }

  checkName(name: string): boolean {
    return (name !== undefined && name.length > 0);
  }
  
  nameValidation(input: string): boolean {
    const name = /^[a-zA-Z0-9_]+( [a-zA-Z0-9_]+)*$/;
    return (input && name.test(input));
  }

  checkPhoneNumber(phoneNumber: string): boolean {
    return (phoneNumber !== undefined && phoneNumber.length > 0);
  }

  phoneValidation(input: string): boolean {
    const phone = /^[0-9]{1,4}[\s\./0-9]*$/;
    return (input && phone.test(input));
  }

  checkDate(date: string): boolean {
    return (date !== undefined && date.length > 0);
  }

  dateValidation(input: string): boolean {
    const date = /^\d{4}\-(0?[1-9]|1[012])\-(0?[1-9]|[12][0-9]|3[01])$/;
    return (input && date.test(input));
  }

  checkLicence(licence: string): boolean {
    return (licence !== undefined && licence.length > 0);
  }

  licenceValidation(input: string): boolean {
    const licence = /^[0-9a-zA-Z]{7,9}$/;
    return (input && licence.test(input));
  }

  checkStatus(emailStatus: boolean, passwordStatus: boolean, confirmPasswordStatus: boolean, nameStatus: boolean, phoneNumberStatus: boolean, dateOfBirthStatus: boolean, licenceNumberStatus: boolean): boolean {
    return (emailStatus === true && passwordStatus === true && confirmPasswordStatus === true && nameStatus === true && phoneNumberStatus === true && dateOfBirthStatus === true && licenceNumberStatus === true);
  }

  registerUser() {
    if (this.checkEmail(this.email) === false || this.emailValidation(this.email) === false) {
      this.emailError = 'Please insert valid e-mail address';
      this.emailStatus = false;
    } else {
      this.emailStatus = true;
      this.emailError = '';
    }
    if (this.checkPassword(this.password) === false) {
      this.passwordError = 'Password must be at least 8 characters';
      this.passwordStatus = false;
    } else if (this.checkIfPasswordNumLatinLetter(this.password) === false) {
      this.passwordError = 'Password can not contain special characters';
      this.passwordStatus = false;
    } else {
      this.passwordError = '';
      this.passwordStatus = true;
    }
    if (this.checkConfirmPassword(this.password, this.confirmPsw) === false) {
      this.confirmPswError = 'Password confirmation does not match';
      this.confirmPswStatus = false;
    } else {
      this.confirmPswError = '';
      this.confirmPswStatus = true;
    }
    if (this.checkName(this.name) === false || !this.name) {
      this.nameError = 'Please insert space name';
      this.nameStatus = false;
    } else if (this.nameValidation(this.name) === false){
      this.nameError = 'Please insert space separated name';
      this.nameStatus = false;
    } else {
      this.nameError = '';
      this.nameStatus = true;
    }
    if (this.checkPhoneNumber(this.phoneNumber) === false || !this.phoneNumber) {
      this.phoneNumberError = 'Please insert phone number';
      this.phoneNumberStatus = false;
    } else if (this.phoneValidation(this.phoneNumber) === false) {
      this.phoneNumberError = 'Please start the number with +';
      this.phoneNumberStatus = false;
    } else {
      this.phoneNumberError = '';
      this.phoneNumberStatus = true;
    }
    if (this.checkDate(this.dateOfBirth) === false || !this.dateOfBirth) {
      this.dateOfBirthError = 'Please insert the date with yyyy.mm.dd.';
      this.dateOfBirthStatus = false;
    } else if (this.dateValidation(this.dateOfBirth) === false) {
      this.dateOfBirthError = 'Please insert the date with yyyy.mm.dd.';
      this.dateOfBirthStatus = false;
    } else {
      this.dateOfBirthError = '';
      this.dateOfBirthStatus = true;
    }
    if (this.checkLicence(this.licenceNumber) === false || !this.licenceNumber) {
      this.licenceNumberError = 'Driver number should be without separator';
      this.licenceNumberStatus = false;
    } else if (this.licenceValidation(this.licenceNumber) === false) {
      this.licenceNumberError = 'Driver number should be without separator';
      this.licenceNumberStatus = false;
    } else {
      this.licenceNumberError = '';
      this.licenceNumberStatus = true;
    }
    if (this.checkStatus(this.emailStatus, this.passwordStatus, this.confirmPswStatus, this.nameStatus, this.phoneNumberStatus, this.dateOfBirthStatus, this.licenceNumberStatus) === true) {
      this.registerService.sendRegister(this.email, this.password, this.confirmPsw, this.name, this.phoneNumber, this.dateOfBirth, this.licenceNumber).subscribe((response) => {
        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 1500);
        this.messageSuccess = 'Your account has been created.';
      }, error => {
        if (error) {
          this.emailError = 'Email already exist';
        }
      });
    }
  }

  cancelRegistration() {
    this.router.navigate(['/login']);
  }
}
