const bcrypt = require('bcryptjs');

class LoginService {
  constructor(conn, registrationService, generateAccessToken, generateRefreshToken) {
    this.conn = conn;
    this.registrationService = registrationService;
    this.generateAccessToken = generateAccessToken;
    this.generateRefreshToken = generateRefreshToken;
  }

  async authorizeUser(input) {
    const userInfo = await this.registrationService.containsUser(input);
    return new Promise(async (resolve, reject) => {
			if (userInfo.length === 0) return reject(new Error(400));
      if (userInfo[0].username == input.username) {
        // Compare password
        await bcrypt.compare(input.password, userInfo[0].password)
          .then(isMatch => {
            if (isMatch) {
              // Correct password, sending json token
              return resolve({
                accessToken: this.generateAccessToken({ userId: userInfo[0].id, role: userInfo[0].role }),
                refreshToken: this.generateRefreshToken({ userId: userInfo[0].id, role: userInfo[0].role }),
              });
            }
          })
          .catch(err => reject(new Error(400)));
      }
      return reject(new Error(400));
    })
  }
}

module.exports = LoginService;
