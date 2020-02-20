export class User {
  name: string;
  email: string;
  phone: number;
  role: string;
  id: number;
  dob: number;
  license: number;
  constructor(user) {
    this.id = user.id;
    this.name = user.name;
    this.email = user.email;
    this.phone = user.phone;
    this.dob = user.dob;
    this.license = user.license;
  }
}

export interface ICurrentUser {
  accessToken: string;
  refreshToken: string;
}