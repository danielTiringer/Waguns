const express = require('express');
const router = express.Router();
const { conn } = require('../services/connectToDB');

const RegistrationController = require('../controllers/registrationController');
const RegistrationService = require('../services/registrationService');

let useddb = conn;

const registrationService = new RegistrationService(useddb);
const registrationController = new RegistrationController(registrationService);

router.post('/register', registrationController.register);

module.exports = router;
