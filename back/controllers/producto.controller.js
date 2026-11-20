const ProductoModel = require('../models/producto.model');
const productoCtrl = {};

productoCtrl.getProductos = async (req, res) => {
  const productos = await ProductoModel.findAll();
  res.json(productos);
};

productoCtrl.getProductosByTienda = async (req, res) => {
  const productos = await ProductoModel.findByTienda(req.params.tiendaId);
  res.json(productos);
};

productoCtrl.createProducto = async (req, res) => {
  try {
    const producto = await ProductoModel.create(req.body);
    res.json({
        status: '1',
        msg: 'Producto guardado.', 
        producto 
    });
  } catch (error) {
    res.status(400).json({ 
        status: '0', 
        msg: 'Error procesando operacion.' 
    });
  }
};

productoCtrl.getProducto = async (req, res) => {
  const producto = await ProductoModel.findById(req.params.id);
  if (!producto) return res.status(404).json({ 
    status: '0', 
    msg: 'Producto no encontrado.' 
});
  res.json(producto);
};

productoCtrl.editProducto = async (req, res) => {
  const updated = await ProductoModel.update(req.params.id, req.body);
  if (!updated) return res.status(404).json({ 
    status: '0', 
    msg: 'Producto no encontrado.' 
});
  res.json({ 
    status: '1', 
    msg: 'Producto actualizado', 
    producto: updated 
});
};

productoCtrl.deleteProducto = async (req, res) => {
  await ProductoModel.delete(req.params.id);
  res.json({ 
    status: '1', 
    msg: 'Producto eliminado' 
});
};

module.exports = productoCtrl;