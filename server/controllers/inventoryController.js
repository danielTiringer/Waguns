class InventoryController {
  constructor(inventoryService, getIdFromToken) {
    this.inventoryService = inventoryService;
    this.fullInventory = this.fullInventory.bind(this);
    this.available = this.available.bind(this);
    this.metrics = this.metrics.bind(this);
    this.rent = this.rent.bind(this);
    this.getIdFromToken = getIdFromToken;
    this.update = this.update.bind(this);
    this.delete = this.delete.bind(this);
    this.add = this.add.bind(this); 0
  }

  fullInventory(req, res) {
    this.inventoryService.getFullInventory()
      .then(data => res.status(200).json(data))
      .catch(() => res.status(500).json('Please try again later'));
  }

  available(req, res) {
    this.inventoryService.getAvailable()
      .then(data => res.status(200).json(data))
      .catch(() => res.status(500).json('Please try again later'));
  }

  metrics(req, res) {
    console.log(req.params.type)
    this.inventoryService.getMetrics(req.params.type)
      .then(data => res.status(200).json(data))
      .catch(() => res.status(500).json('Please try again later'));
  }

  rent(req, res) {
    const errResponse = {
      409: 'Car already rented',
      500: 'Please try again later'
    }
    this.inventoryService.rentCar(req.body.carId, this.getIdFromToken(req), req.body.returnTimeExp, req.body.rentalTime)
      .then(() => res.sendStatus(204))
      .catch((err) => res.status(err.message).json(errResponse[err.message]));
  }

  update(req, res) {
    const errResponse = {
      418: 'Not an admin',
      500: 'Please try again later'
    }
    this.inventoryService.updateCar(req.body.carId, req.body.whatToUpdate, req.body.whatToUpdateItTo, this.getIdFromToken(req))
      .then(() => res.sendStatus(204))
      .catch((err) => res.status(err.message).json(errResponse[err.message]));
  }

  delete(req, res) {
    const errResponse = {
      418: 'Not an admin',
      500: 'Please try again later'
    }
    this.inventoryService.removeCar(req.body.carId, this.getIdFromToken(req))
      .then(() => res.sendStatus(204))
      .catch((err) => res.status(err.message).json(errResponse[err.message]));
  }

  add(req, res) {
    const errResponse = {
      418: 'Not an admin',
      500: 'Please try again later'
    }
    this.inventoryService.addCar(req.body, this.getIdFromToken(req))
      .then(() => res.sendStatus(204))
      .catch((err) => res.status(err.message).json(errResponse[err.message]));
  }
}

module.exports = InventoryController;
