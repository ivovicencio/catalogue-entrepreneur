const TiendaModel = require('../models/tienda.model');

const TiendaService = {};

const crearErrorNegocio = (mensaje, statusCode) => {
  const error = new Error(mensaje);
  error.statusCode = statusCode;
  return error;
};

TiendaService.listarTiendas = async () => {
  return await TiendaModel.findAll();
};

TiendaService.obtenerPorSlug = async (slug) => {
  const tienda = await TiendaModel.findBySlug(slug);
  if (!tienda) {
    throw crearErrorNegocio('Tienda no encontrada.', 404);
  }
  return tienda;
};

TiendaService.crearTienda = async (data) => {
  if (!data.slug || !data.nombre || !data.whatsapp) {
    throw crearErrorNegocio('Los campos slug, nombre y whatsapp son obligatorios.', 400);
  }

  const slugNormalizado = data.slug.toLowerCase().trim();
  const existente = await TiendaModel.findBySlug(slugNormalizado);
  if (existente) {
    throw crearErrorNegocio(`El slug '${slugNormalizado}' ya está en uso por otra tienda.`, 409);
  }

  return await TiendaModel.create({
    ...data,
    slug: slugNormalizado
  });
};

TiendaService.actualizarTienda = async (id, data) => {
  const tiendaActual = await TiendaModel.findById(id);
  if (!tiendaActual) {
    throw crearErrorNegocio('Tienda no encontrada.', 404);
  }

  if (data.slug) {
    const slugNormalizado = data.slug.toLowerCase().trim();
    const existente = await TiendaModel.findBySlug(slugNormalizado);
    if (existente && existente.id !== id) {
      throw crearErrorNegocio(`El slug '${slugNormalizado}' ya pertenece a otra tienda.`, 409);
    }
    data.slug = slugNormalizado;
  }

  return await TiendaModel.update(id, data);
};

TiendaService.eliminarTienda = async (id) => {
  const tiendaActual = await TiendaModel.findById(id);
  if (!tiendaActual) {
    throw crearErrorNegocio('Tienda no encontrada.', 404);
  }
  await TiendaModel.delete(id);
};

module.exports = TiendaService;