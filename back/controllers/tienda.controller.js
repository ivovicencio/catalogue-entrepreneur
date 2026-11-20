const TiendaModel = require('../models/tienda.model');
const tiendaCtrl = {};

tiendaCtrl.getTiendas = async(req, res) => {
    const tiendas = await TiendaModel.findAll();
    res.json(tiendas);
};

tiendaCtrl.createTienda = async (req, res) => {
    try {
        const tienda = await TiendaModel.create(req.body);
        res.json({
            status: '1',
            msg: 'Tienda guardada.', tienda
        });
    } catch(error) {
        res.status(400).json({
            status: '0',
            msg: 'Error procesando operacion'
        });
    }
};

tiendaCtrl.getTiendaBySlug = async (req, res) => {
    const tienda = await TiendaModel.findBySlug(req.params.slug);
    if(!tienda) return res.status(404).json({
        status: '0',
        msg: 'Tienda no encontrada.'
    });
    res.json(tienda);
};

tiendaCtrl.editTienda = async (req,res) => {
    const updated = await TiendaModel.update(req.params.id, req.body);
    if(!updated) return res.status(404).json({
        status: '0',
        msg: 'Tienda no encontrada'
    });
    res.json({
        status: '1',
        msg: 'Tienda actualizada',
        tienda: updated
    });
};

tiendaCtrl.deleteTienda = async (req, res) => {
        await TiendaModel.delete(req.params.id);
        res.json({
            status: '1',
            msg: 'Tienda eliminada'
        });
};

module.exports = tiendaCtrl;
