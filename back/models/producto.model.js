const crypto = require('crypto');

let productos = [
    {
        id: '101',
        tienda_id: '1',
        nombre: 'Borcego Simil Cuero Negro',
        precio: 35000,
        categoria: 'Calzado',
        imagen_url: 'https://via.placeholder.com/300',
        variantes: ['Talle 37', 'Talle 38', 'Talle 39'],
        disponible: true
    }
];

const ProductoModel = {};

ProductoModel.findAll = async () => productos;

ProductoModel.findByTienda = async (tienda_id) =>
    productos.filter(p => String(p.tienda_id).toLowerCase() === String(tienda_id).toLowerCase());

ProductoModel.findById = async (id) =>
    productos.find(p => p.id === id);

ProductoModel.create = async (data) => {
    const nuevoProducto = {
        id: crypto.randomUUID(),
        tienda_id: data.tienda_id,
        nombre: data.nombre,
        precio: Number(data.precio),
        categoria: data.categoria || 'General',
        imagen_url: data.imagen_url || '',
        variantes: data.variantes || [],
        disponible: data.disponible !== undefined ? data.disponible : true
    };
    productos.push(nuevoProducto);
    return nuevoProducto;
};

ProductoModel.update = async (id, data) => {
    const index = productos.findIndex(p => p.id === id);
    if (index === -1) return null;
    productos[index] = { ...productos[index], ...data };
    return productos[index];
};

ProductoModel.delete = async (id) => {
    productos = productos.filter(p => p.id !== id);
};

module.exports = ProductoModel;