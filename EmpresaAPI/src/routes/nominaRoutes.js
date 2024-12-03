    const express = require('express');
    const Nomina = require('../models/Nomina');
    const router = express.Router();
    const mongoose = require('mongoose');

    // Obtener todos los registros
    router.get('/', async (req, res) => {
        try {
            const empleados = await Nomina.find();
            res.json(empleados);
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    });

    // Crear un nuevo registro
    router.post('/', async (req, res) => {
        const empleado = new Nomina({
            ID: req.body.ID,
            Nombre: req.body.Nombre,
            Apellido: req.body.Apellido,
            Foto: req.body.Foto,
            Correo: req.body.Correo,
            Dirección: req.body.Dirección,
            Cargo: req.body.Cargo,
            Salario: req.body.Salario,
        });

        try {
            const nuevoEmpleado = await empleado.save();
            res.status(201).json(nuevoEmpleado);
        } catch (err) {
            res.status(400).json({ message: err.message });
        }
    });

    // Middleware para validar el formato del ObjectId
    router.use('/:id', (req, res, next) => {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).json({ message: 'ID inválido. Debe ser un ID de 24 caracteres en formato hexadecimal.' });
        }
        next();
    });

    // Actualizar un registro
    router.put('/:id', async (req, res) => {
        try {
            const empleado = await Nomina.findByIdAndUpdate(
                req.params.id, // Pasa el ID directamente
                req.body,
                { new: true } // Devuelve el documento actualizado
            );
            if (!empleado) return res.status(404).json({ message: 'Empleado no encontrado' });
            res.json(empleado);
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    });

    // Eliminar un registro
    router.delete('/:id', async (req, res) => {
        try {
            const empleado = await Nomina.findByIdAndDelete(req.params.id); // Pasa el ID directamente
            if (!empleado) return res.status(404).json({ message: 'Empleado no encontrado' });
            res.json({ message: 'Empleado eliminado' });
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    });

    module.exports = router;