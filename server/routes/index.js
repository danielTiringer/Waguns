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
const UserService = require('../services/userService');
const UserController = require('../controllers/userController');
const MailService = require('../services/emailService');

let useddb = conn;
let accTokSec = process.env.ACCESS_TOKEN_SECRET;
let refTokSec = process.env.REFRESH_TOKEN_SECRET;

const mailService = new MailService();
const registrationService = new RegistrationService(useddb, mailService);
const registrationController = new RegistrationController(registrationService);
const auth = new Authentication(accTokSec, refTokSec);
const loginService = new LoginService(useddb, registrationService, auth.generateAccessToken, auth.generateRefreshToken);
const loginController = new LoginController(loginService);
const userService = new UserService(useddb);
const userController = new UserController(userService, Authentication.getIdFromToken);
const inventoryService = new InventoryService(useddb, userService, mailService);
const inventoryController = new InventoryController(inventoryService, Authentication.getIdFromToken);

router.post('/register', registrationController.register);

router.post('/login', loginController.login);

router.post('/getToken', auth.RefreshedToken);

router.post('/register', registrationController.register);

router.get('/api/inventory', auth.authenticateToken, inventoryController.fullInventory);

router.get('/api/available', auth.authenticateToken, inventoryController.available);

router.get('/api/metrics/:type', auth.authenticateToken, inventoryController.metrics);

router.post('/api/rent', auth.authenticateToken, inventoryController.rent);

router.put('/api/update', auth.authenticateToken, inventoryController.update);

router.put('/api/delete', auth.authenticateToken, inventoryController.delete); // just sets availibility to sold

router.post('/api/add', auth.authenticateToken, inventoryController.add);

router.get('/api/user', auth.authenticateToken, userController.userData);

router.put('/api/return', auth.authenticateToken, inventoryController.return);

router.put('/api/cancel', auth.authenticateToken, inventoryController.cancel);

router.get('/api/usersrentals', auth.authenticateToken, userController.getRental);

module.exports = router;
