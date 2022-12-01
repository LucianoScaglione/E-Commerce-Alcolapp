const { Router } = require('express');
const router = Router();
const { findAllProducts, findOneProduct, updateProduct, deleteProduct, createProduct, updateStockAndSoldProductsCart } = require('../controllers/Products');

router.get('/', findAllProducts);
router.get('/:id', findOneProduct);
router.post('/', createProduct);
router.put('/:id', updateProduct);
router.put('/shoppingcart/:id', updateStockAndSoldProductsCart);
router.delete('/:id', deleteProduct);


module.exports = router;