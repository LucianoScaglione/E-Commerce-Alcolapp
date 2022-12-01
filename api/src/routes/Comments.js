const { Router } = require("express");
const router = Router();
const { obtenerComentario, crearComentario } = require('../controllers/Comments');

router.get('/:id', obtenerComentario);
router.post('/', crearComentario);

module.exports = router;