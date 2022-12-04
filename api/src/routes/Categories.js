const { Router } = require("express");
const router = Router();
const { deleteCategory } = require('../controllers/Categories');

router.delete('/:id', deleteCategory);

module.exports = router;