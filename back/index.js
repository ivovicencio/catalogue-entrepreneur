const express = require('express');
const cors = require('cors');
var app = express();

//middlewares
app.use(express.json());
app.use(cors());

//rutas
app.use('/api/catalogo', require('./routes/catalogo.route.js'));
app.use('/api/tienda', require('./routes/tienda.route.js'));
app.use('/api/producto', require('./routes/producto.route.js'));

//settings
app.set('port', process.env.PORT || 3000);

//inicio del servidor
app.listen(app.get('port'), () => {
    console.log('Servidor iniciado en el puerto', app.get('port'));
});