class RegistrationController {
  constructor(registrationService) {
    this.registrationService = registrationService;
    this.register = this.register.bind(this);
  }

  register(req, res) {
    this.registrationService.createUser(req.body)
      .then(data => res.status(200).json(data))
      .catch(err => res.status(err.message).json(`You made a ${err.message} error`));
  }
}

module.exports = RegistrationController;
