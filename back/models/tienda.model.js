const crypto = require('crypto')

let tiendas = [
    {
        id: '1',
        slug: 'del-rey',
        nombre: 'Del Rey - Calzados',
        whatsapp: '542942525797',
        color_principal: '#1e293b',
        logo_url: '',
        activa: true
    }
];

const TiendaModel = {};

TiendaModel.findAll = async () => tiendas;

TiendaModel.findBySlug = async(slug) =>
    tiendas.find(t => t.slug === slug.toLowerCase());


TiendaModel.create = async (data) => {
    const nueva = {
        id: crypto.randomUUID(),
        slug: data.slug.toLowerCase().trim(),
        nombre: data.nombre,
        whatsapp: data.whatsapp,
        color_principal: data.color_principal || '#111827',
        logo_url: data.logo_url || '',
        activa: data.activa !== undefined ? data.activa : true
    };
    tiendas.push(nueva);
    return nueva;
};

TiendaModel.update = async(id, data) => {
    const index = tiendas.findIndex(t => t.id === id);
    if (index === -1) return null;
    tiendas[index] = { ...tiendas[index], ...data};
    return tiendas[index];
};

TiendaModel.delete = async (id) => {
    tiendas = tiendas.filter(t => t.id === id);
};

module.exports = TiendaModel;