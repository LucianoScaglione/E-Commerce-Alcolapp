const { Router } = require("express");
const router = Router();
const { createPayment } = require('../controllers/Payments');

router.post('/', createPayment);

module.exports = router;