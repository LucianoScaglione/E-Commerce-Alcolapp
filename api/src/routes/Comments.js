const { Router } = require("express");
const router = Router();
const { obtenerComentariosUsuario, obtenerComentario, crearComentario } = require('../controllers/Comments');

router.get('/user/:id', obtenerComentariosUsuario);
router.get('/:id', obtenerComentario);
router.post('/', crearComentario);

module.exports = router;