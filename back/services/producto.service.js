const ProductoModel = require('../models/producto.model');
const TiendaModel = require('../models/tienda.model');

const ProductoService = {};

const crearErrorNegocio = (mensaje, statusCode) => {
  const error = new Error(mensaje);
  error.statusCode = statusCode;
  return error;
};

ProductoService.listarProductos = async () => {
  return await ProductoModel.findAll();
};

ProductoService.listarPorTienda = async (tiendaId) => {
  const tienda = await TiendaModel.findById(tiendaId);
  if (!tienda) {
    throw crearErrorNegocio('La tienda especificada no existe.', 404);
  }
  return await ProductoModel.findByTienda(tiendaId);
};

ProductoService.obtenerPorId = async (id) => {
  const producto = await ProductoModel.findById(id);
  if (!producto) {
    throw crearErrorNegocio('Producto no encontrado.', 404);
  }
  return producto;
};

ProductoService.crearProducto = async (data) => {
  if (!data.tienda_id || !data.nombre || data.precio === undefined) {
    throw crearErrorNegocio('Los campos tienda_id, nombre y precio son obligatorios.', 400);
  }

  if (Number(data.precio) < 0) {
    throw crearErrorNegocio('El precio del producto no puede ser negativo.', 400);
  }

  const tienda = await TiendaModel.findById(data.tienda_id);
  if (!tienda) {
    throw crearErrorNegocio('No se puede crear el producto: la tienda_id no existe.', 404);
  }

  return await ProductoModel.create(data);
};

ProductoService.actualizarProducto = async (id, data) => {
  const productoActual = await ProductoModel.findById(id);
  if (!productoActual) {
    throw crearErrorNegocio('Producto no encontrado.', 404);
  }

  if (data.precio !== undefined && Number(data.precio) < 0) {
    throw crearErrorNegocio('El precio del producto no puede ser negativo.', 400);
  }

  return await ProductoModel.update(id, data);
};

ProductoService.eliminarProducto = async (id) => {
  const productoActual = await ProductoModel.findById(id);
  if (!productoActual) {
    throw crearErrorNegocio('Producto no encontrado.', 404);
  }
  await ProductoModel.delete(id);
};

module.exports = ProductoService;