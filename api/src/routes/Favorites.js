const { Router } = require("express");
const router = Router();
const { findFavorite, createFavorite, deleteFavorite } = require('../controllers/Favorites');

router.get('/:id', findFavorite);
router.post('/', createFavorite);
router.delete('/:id', deleteFavorite);

module.exports = router;