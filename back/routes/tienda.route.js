const tiendaCtrl = require('./../controllers/tienda.controller');
const { verificarAdmin } = require('../middlewares/auth.middleware');
const express = require('express');
const router = express.Router();

router.get('/', verificarAdmin, tiendaCtrl.getTiendas);
router.post('/', verificarAdmin, tiendaCtrl.createTienda);
router.get('/:slug', tiendaCtrl.getTiendaBySlug);
router.put('/:id', verificarAdmin, tiendaCtrl.editTienda);
router.delete('/:id', verificarAdmin, tiendaCtrl.deleteTienda);

module.exports = router;