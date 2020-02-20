const jwt = require('jsonwebtoken');

const accTokExp = '10m';
const refTokExp = '1d';

class AuthenticationService {
  constructor(accTokSec, refTokSec) {
    this.accTokSec = accTokSec;
    this.refTokSec = refTokSec;
    this.authenticateToken = this.authenticateToken.bind(this);
    this.RefreshedToken = this.RefreshedToken.bind(this);
    this.generateAccessToken = this.generateAccessToken.bind(this);
    this.generateRefreshToken = this.generateRefreshToken.bind(this);
  }

  authenticateToken(req, res, next) {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1];
    if (token == null) {
      return res.sendStatus(401);
    }
    return jwt.verify(token, this.accTokSec, (err) => {
      if (err) return res.status(403).json({ message: 'Token expired!' });
      return next();
    });
  }

  RefreshedToken(req, res) {
    const incomingRefreshToken = req.headers.token;
    if (incomingRefreshToken == null) {
      return res.sendStatus(401);
    }
    return jwt.verify(incomingRefreshToken, this.refTokSec, (err, user) => {
      if (err) {
        return res.status(403).json({ message: 'Token expired!' });
      }
      const accessToken = jwt.sign({ userId: user.userId, role: user.role }, this.accTokSec, { expiresIn: `${accTokExp}` });
      const refreshToken = jwt.sign({ userId: user.userId, role: user.role }, this.refTokSec, { expiresIn: `${refTokExp}` });
      console.log(accessToken)
      return res.json({ accessToken, refreshToken });
    });
  }

  generateAccessToken(user) {
    return jwt.sign(user, this.accTokSec, { expiresIn: `${accTokExp}` });
  }

  generateRefreshToken(user) {
    return jwt.sign(user, this.refTokSec, { expiresIn: `${refTokExp}` });
  }

  static getIdFromToken(req) {
    const authHeader = req.headers.authorization;
    const token = authHeader.split(' ')[1];
    return jwt.decode(token).userId;
  }

  static getRoleFromToken(req) {
    const authHeader = req.headers.authorization;
    const token = authHeader.split(' ')[1];
    return jwt.decode(token).role;
  }
}

module.exports = AuthenticationService;
