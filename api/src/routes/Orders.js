const { Router } = require("express");
const router = Router();
const { findAllOrder, createOrder, updateOrder, deleteOrder } = require('../controllers/Orders');

router.get('/', findAllOrder);
router.post('/', createOrder);
router.put('/:id', updateOrder);
router.delete('/:id', deleteOrder);

module.exports = router;