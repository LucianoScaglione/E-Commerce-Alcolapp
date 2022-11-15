const { Router } = require("express");
const router = Router();
const { findAllOrder, findOneOrder, findAllOrderUser, createOrder, updateOrder, deleteOrder } = require('../controllers/Orders');

router.get('/', findAllOrder);
router.get('/:id', findOneOrder);
router.get('/user/:id', findAllOrderUser);
router.post('/', createOrder);
router.put('/:id', updateOrder);
router.delete('/:id', deleteOrder);

module.exports = router;