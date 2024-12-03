const mongoose = require('mongoose');

const NominaSchema = new mongoose.Schema({
    ID: { type: Number, required: true, unique: true },
    Nombre: { type: String, required: true },
    Apellido: { type: String, required: true },
    Foto: { type: String },
    Correo: { type: String, required: true, unique: true },
    Dirección: { type: String, required: true },
    Cargo: { type: String, required: true },
    Salario: { type: Number, required: true }
});

module.exports = mongoose.model('Nomina', NominaSchema);
