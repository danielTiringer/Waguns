class InventoryController {
  constructor(inventoryService) {
    this.inventoryService = inventoryService;
    this.fullInventory = this.fullInventory.bind(this);
    this.available = this.available.bind(this);
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
}

module.exports = InventoryController;