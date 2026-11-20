const TiendaModel = require('../models/tienda.model');

const verificarAdmin = (req, res, next) => {
  const apiKey = req.header('x-admin-key');
  const expectedKey = process.env.ADMIN_SECRET_KEY;

  if (!expectedKey) {
    return res.status(500).json({
      status: '0',
      msg: 'Error de configuración del servidor: ADMIN_SECRET_KEY no definida.'
    });
  }

  if (!apiKey || apiKey !== expectedKey) {
    return res.status(401).json({
      status: '0',
      msg: 'Acceso denegado. Header x-admin-key inválido o ausente.'
    });
  }

  return next();
};

const verificarTiendaUpload = async (req, res, next) => {
  try {
    const tiendaKey = req.header('x-tienda-key');

    if (!tiendaKey) {
      return res.status(401).json({
        status: '0',
        msg: 'Acceso denegado. Header x-tienda-key ausente.'
      });
    }

    const tienda = await TiendaModel.findByUploadKey(tiendaKey);
    if (!tienda) {
      return res.status(401).json({
        status: '0',
        msg: 'Acceso denegado. Header x-tienda-key inválido.'
      });
    }

    if (!tienda.activa) {
      return res.status(403).json({
        status: '0',
        msg: 'La tienda está inactiva o pausada y no puede cargar productos.'
      });
    }

    req.tiendaAutenticada = tienda;
    return next();
  } catch (error) {
    return res.status(500).json({
      status: '0',
      msg: 'Error validando credencial de tienda.'
    });
  }
};

module.exports = { verificarAdmin, verificarTiendaUpload };