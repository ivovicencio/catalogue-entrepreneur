require('dotenv').config();
const express = require('express');
const cors = require('cors');
var app = express();

const allowedOrigins = process.env.ALLOWED_ORIGINS ? process.env.ALLOWED_ORIGINS.split(',').map(origin => origin.trim()) : [];

const corsOptions = {
    origin: (origin, callback) => {
        //permite ver peticiones sin origin como postman, curl, cliente y net desktop

        if(!origin) return callback(null, true);
        if(allowedOrigins.length === 0 || allowedOrigins.includes(origin)) {
            return callback(null, true);
        }
        return callback(new Error('Origen no permitido de CORS'));
    }
};

//middlewares
app.use(express.json());
app.use(cors(corsOptions));

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