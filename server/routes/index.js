const express = require('express');
const router = express.Router();
const { conn } = require('../services/connectToDB');

const RegistrationController = require('../controllers/registrationController');
const RegistrationService = require('../services/registrationService');
const Authentication = require('../services/authenticationService');
const LoginController = require('../controllers/loginController');
const LoginService = require('../services/loginService');
const InventoryController = require('../controllers/inventoryController');
const InventoryService = require('../services/inventoryService');

let useddb = conn;
let accTokSec = process.env.ACCESS_TOKEN_SECRET;
let refTokSec = process.env.REFRESH_TOKEN_SECRET;

const registrationService = new RegistrationService(useddb);
const registrationController = new RegistrationController(registrationService);
const auth = new Authentication(accTokSec, refTokSec);
const loginService = new LoginService(useddb, registrationService, auth.generateAccessToken, auth.generateRefreshToken);
const loginController = new LoginController(loginService);
const inventoryService = new InventoryService(useddb);
const inventoryController = new InventoryController(inventoryService);

router.post('/register', registrationController.register);

router.post('/login', loginController.login);

router.post('/getToken', auth.RefreshedToken);

router.post('/register', registrationController.register);

router.get('/api/inventory', auth.authenticateToken, inventoryController.fullInventory);

router.get('/api/available', auth.authenticateToken, inventoryController.available);

router.get('/api/metrics/:type', inventoryController.metrics);

module.exports = router;
