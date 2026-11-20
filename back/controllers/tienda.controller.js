const TiendaService = require('../services/tienda.service');
const tiendaCtrl = {};

tiendaCtrl.getTiendas = async (req, res) => {
  try {
    const tiendas = await TiendaService.listarTiendas();
    res.json(tiendas);
  } catch (error) {
    res.status(error.statusCode || 500).json({ status: '0', msg: error.message });
  }
};

tiendaCtrl.createTienda = async (req, res) => {
  try {
    const tienda = await TiendaService.crearTienda(req.body);
    res.status(201).json({ status: '1', msg: 'Tienda guardada.', tienda });
  } catch (error) {
    res.status(error.statusCode || 400).json({ status: '0', msg: error.message });
  }
};

tiendaCtrl.getTiendaBySlug = async (req, res) => {
  try {
    const tienda = await TiendaService.obtenerPorSlug(req.params.slug);
    res.json(tienda);
  } catch (error) {
    res.status(error.statusCode || 500).json({ status: '0', msg: error.message });
  }
};

tiendaCtrl.editTienda = async (req, res) => {
  try {
    const updated = await TiendaService.actualizarTienda(req.params.id, req.body);
    res.json({ status: '1', msg: 'Tienda updated', tienda: updated });
  } catch (error) {
    res.status(error.statusCode || 400).json({ status: '0', msg: error.message });
  }
};

tiendaCtrl.deleteTienda = async (req, res) => {
  try {
    await TiendaService.eliminarTienda(req.params.id);
    res.json({ status: '1', msg: 'Tienda removed' });
  } catch (error) {
    res.status(error.statusCode || 400).json({ status: '0', msg: error.message });
  }
};

module.exports = tiendaCtrl;