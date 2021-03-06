class UserController {
  constructor(userService, getIdFromToken) {
    this.userService = userService;
    this.getIdFromToken = getIdFromToken;
    this.userData = this.userData.bind(this);
    this.getRental = this.getRental.bind(this);
  }

  userData(req, res) {
    this.userService.getUserData(this.getIdFromToken(req))
      .then(data => res.status(200).json(data))
      .catch(() => res.status(500).json('Please try again later'));
  }

  getRental(req, res) {
    this.userService.getRentOfUser(this.getIdFromToken(req))
      .then(data => res.status(200).json(data))
      .catch(() => res.status(500).json('Please try again later'));
  }
}

module.exports = UserController;