const express = require('express');
const router = express.Router();

const warehouseController = require('../app/controllers/warehouseController');

router.get('/stored/hotpots', warehouseController.storedHotpots);
router.get('/trash/hotpots', warehouseController.trashHotpots);

module.exports = router;
