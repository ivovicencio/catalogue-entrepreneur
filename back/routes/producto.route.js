const productoCtrl = require('./../controllers/producto.controller');
const { verificarAdmin, verificarTiendaUpload } = require('../middlewares/auth.middleware');
const express = require('express');
const router = express.Router();

router.get('/', verificarAdmin, productoCtrl.getProductos);
router.post('/', verificarTiendaUpload, productoCtrl.createProducto);
router.get('/tienda/:tiendaId', verificarAdmin, productoCtrl.getProductosByTienda);
router.get('/:id', verificarAdmin, productoCtrl.getProducto);
router.put('/:id', verificarAdmin, productoCtrl.editProducto);
router.delete('/:id', verificarAdmin, productoCtrl.deleteProducto);

module.exports = router;