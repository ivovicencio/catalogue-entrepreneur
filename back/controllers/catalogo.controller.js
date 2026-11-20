const CatalogoService = require('../services/catalogo.service');
const catalogoCtrl = {};

catalogoCtrl.getCatalogoBySlug = async (req, res) => {
  try {
    const data = await CatalogoService.obtenerCatalogoPublico(req.params.slug);
    res.json({
      status: '1',
      ...data
    });
  } catch (error) {
    res.status(error.statusCode || 500).json({
      status: '0',
      msg: error.message
    });
  }
};

module.exports = catalogoCtrl;