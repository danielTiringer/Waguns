class InventoryController {
  constructor(inventoryService) {
    this.inventoryService = inventoryService;
    this.fullInventory = this.fullInventory.bind(this);
    this.available = this.available.bind(this);
    this.metrics = this.metrics.bind(this);
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
}

module.exports = InventoryController;
