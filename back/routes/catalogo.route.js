const catalogoCtrl = require('../controllers/catalogo.controller');
const express = require('express');
const router = express.Router();

router.get('/:slug', catalogoCtrl.getCatalogoBySlug);

module.exports = router;