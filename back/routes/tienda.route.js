const tiendaCtrl = require('./../controllers/tienda.controller');
const express = require('express');
const router = express.Router();

router.get('/', tiendaCtrl.getTiendas);
router.post('/', tiendaCtrl.createTienda);
router.get('/:slug', tiendaCtrl.getTiendaBySlug);
router.put('/:id', tiendaCtrl.editTienda);
router.delete('/:id', tiendaCtrl.deleteTienda);

module.exports = router;