class LoginController {
  constructor(loginService) {
    this.loginService = loginService;
    this.login = this.login.bind(this);
  }

  login(req, res) {
    if (req.body.username && req.body.password) {
      const possibleErrorResponses = {
        500: 'Please try again later',
        400: 'Incorrect Username and/or Password!'
      };
      this.loginService.authorizeUser({
        username: req.body.username,
        password: req.body.password,
      }).then(data => res.status(200).json(data))
        .catch(err => res.status(err.message).json(possibleErrorResponses[err.message]));
    }
  }
}

module.exports = LoginController;
