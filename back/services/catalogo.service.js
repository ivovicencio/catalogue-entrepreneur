const TiendaModel = require('../models/tienda.model');
const ProductoModel = require('../models/producto.model');

const CatalogoService = {};

const crearErrorNegocio = (mensaje, statusCode) => {
  const error = new Error(mensaje);
  error.statusCode = statusCode;
  return error;
};

CatalogoService.obtenerCatalogoPublico = async (slug) => {
  const tienda = await TiendaModel.findBySlug(slug);

  if (!tienda) {
    throw crearErrorNegocio('El catálogo solicitado no existe.', 404);
  }

  if (!tienda.activa) {
    throw crearErrorNegocio('Este catálogo se encuentra temporalmente pausado.', 403);
  }

  const productosTienda = await ProductoModel.findByTienda(tienda.id);
  const productosDisponibles = productosTienda.filter(p => p.disponible === true);

  return {
    tienda: {
      nombre: tienda.nombre,
      slug: tienda.slug,
      whatsapp: tienda.whatsapp,
      color_principal: tienda.color_principal,
      logo_url: tienda.logo_url
    },
    productos: productosDisponibles
  };
};

module.exports = CatalogoService;