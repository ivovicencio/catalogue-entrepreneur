const productoCtrl = require('./../controllers/producto.controller');
const express = require('express');
const router = express.Router();

router.get('/', productoCtrl.getProductos);
router.post('/', productoCtrl.createProducto);
router.get('/tienda/:tiendaId', productoCtrl.getProductosByTienda);
router.get('/:id', productoCtrl.getProducto);
router.put('/:id', productoCtrl.editProducto);
router.delete('/:id', productoCtrl.deleteProducto);

module.exports = router;