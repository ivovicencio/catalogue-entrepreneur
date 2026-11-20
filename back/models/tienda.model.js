const crypto = require('crypto');

let tiendas = [
  {
    id: '1',
    slug: 'del-rey',
    nombre: 'Del Rey Calzados',
    whatsapp: '5492991234567',
    color_principal: '#1e293b',
    logo_url: '',
    activa: true,
    upload_key: 'key_del_rey_123456'
  }
];

const TiendaModel = {};

TiendaModel.findAll = async () => tiendas;

TiendaModel.findById = async (id) =>
  tiendas.find(t => t.id === id);

TiendaModel.findBySlug = async (slug) =>
  tiendas.find(t => t.slug === slug.toLowerCase());

TiendaModel.findByUploadKey = async (uploadKey) =>
  tiendas.find(t => t.upload_key === uploadKey);

TiendaModel.create = async (data) => {
  const nueva = {
    id: crypto.randomUUID(),
    slug: data.slug.toLowerCase().trim(),
    nombre: data.nombre,
    whatsapp: data.whatsapp,
    color_principal: data.color_principal || '#111827',
    logo_url: data.logo_url || '',
    activa: data.activa !== undefined ? data.activa : true,
    upload_key: data.upload_key || `tk_${crypto.randomBytes(16).toString('hex')}`
  };
  tiendas.push(nueva);
  return nueva;
};

TiendaModel.update = async (id, data) => {
  const index = tiendas.findIndex(t => t.id === id);
  if (index === -1) return null;
  tiendas[index] = { ...tiendas[index], ...data };
  return tiendas[index];
};

TiendaModel.delete = async (id) => {
  tiendas = tiendas.filter(t => t.id !== id);
};

module.exports = TiendaModel;