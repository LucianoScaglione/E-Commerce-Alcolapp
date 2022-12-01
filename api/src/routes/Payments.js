const { Router } = require("express");
const router = Router();
const { orderSuccess, orderPending, orderFailure, createInformationOrderWithPayment } = require('../controllers/Payments');

router.post('/', createInformationOrderWithPayment);
router.get('/success/:id', orderSuccess);
router.get('/pending/:id', orderPending);
router.get('/failure/:id', orderFailure);

module.exports = router;