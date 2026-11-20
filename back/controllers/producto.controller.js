const ProductoService = require('../services/producto.service');
const productoCtrl = {};

productoCtrl.getProductos = async (req, res) => {
  try {
    const productos = await ProductoService.listarProductos();
    res.json(productos);
  } catch (error) {
    res.status(error.statusCode || 500).json({ status: '0', msg: error.message });
  }
};

productoCtrl.getProductosByTienda = async (req, res) => {
  try {
    const productos = await ProductoService.listarPorTienda(req.params.tiendaId);
    res.json(productos);
  } catch (error) {
    res.status(error.statusCode || 500).json({ status: '0', msg: error.message });
  }
};

productoCtrl.createProducto = async (req, res) => {
  try {
    const producto = await ProductoService.crearProducto(req.body);
    res.status(201).json({ status: '1', msg: 'Producto guardado.', producto });
  } catch (error) {
    res.status(error.statusCode || 400).json({ status: '0', msg: error.message });
  }
};

productoCtrl.getProducto = async (req, res) => {
  try {
    const producto = await ProductoService.obtenerPorId(req.params.id);
    res.json(producto);
  } catch (error) {
    res.status(error.statusCode || 500).json({ status: '0', msg: error.message });
  }
};

productoCtrl.editProducto = async (req, res) => {
  try {
    const updated = await ProductoService.actualizarProducto(req.params.id, req.body);
    res.json({ status: '1', msg: 'Producto updated', producto: updated });
  } catch (error) {
    res.status(error.statusCode || 400).json({ status: '0', msg: error.message });
  }
};

productoCtrl.deleteProducto = async (req, res) => {
  try {
    await ProductoService.eliminarProducto(req.params.id);
    res.json({ status: '1', msg: 'Producto removed' });
  } catch (error) {
    res.status(error.statusCode || 400).json({ status: '0', msg: error.message });
  }
};

module.exports = productoCtrl;