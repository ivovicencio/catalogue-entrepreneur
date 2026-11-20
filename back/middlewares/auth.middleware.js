const verificarAdmin = (req,res,next) => {
    const apiKey = req.header('x-admin-key');
    const expectedKey = process.env.ADMIN_SECRET_KEY;

    if(!expectedKey) {
        return res.status(500).json({
            status: '0',
            msg: 'Error de configuracion del servidor: ADMIN_SECRET_KEY no definida'
        });
    }

    if(!apiKey || apiKey !== expectedKey) {
        return res.status(401).json({
            status: '0',
            msg: 'Acceso denegado: Header x-admin-key invalido o ausente.'
        });
    }

    return next();
};

module.exports = {verificarAdmin};