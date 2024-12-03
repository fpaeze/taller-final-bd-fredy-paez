const mongoose = require('mongoose');

const ProductoSchema = new mongoose.Schema({
    ID_Serial: { type: String, required: true, unique: true },
    Nombre: { type: String, required: true },
    Categoría: { type: String, required: true },
    Imagen: { type: String },
    Modelo: { type: String },
    Serie: { type: String },
    Marca: { type: String },
    Fabricante: { type: String, required: true }
});

module.exports = mongoose.model('Producto', ProductoSchema);
