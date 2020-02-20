class LoginService {
  constructor(conn, registrationService, generateAccessToken, generateRefreshToken) {
    this.conn = conn;
    this.registrationService = registrationService;
    this.generateAccessToken = generateAccessToken;
    this.generateRefreshToken = generateRefreshToken;
  }

  async authorizeUser(input) {
    const userInfo = await this.registrationService.containsUser(input);

    return new Promise((resolve, reject) => {
      if (userInfo.length === 0) return reject(new Error(400));
      if (userInfo[0].username !== input.username || userInfo[0].password !== input.password) return reject(new Error(400));
      return resolve({
        accessToken: this.generateAccessToken({ userId: userInfo[0].id }),
        refreshToken: this.generateRefreshToken({ userId: userInfo[0].id }),
      });
    });
  }
}

module.exports = LoginService;
