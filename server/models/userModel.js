class User {
  constructor(user) {
    this.id = user.id || 0;
    this.username = user.username;
		this.password = user.password;
    this.phone = user.phone;
    this.dob = user.dob;
    this.license = user.license;
    this.name = user.name;
  }
}

module.exports = User;
