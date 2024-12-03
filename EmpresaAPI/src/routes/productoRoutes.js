const express = require('express');
const Producto = require('../models/Productos');
const router = express.Router();
const mongoose = require('mongoose');

// Obtener todos los productos
router.get('/', async (req, res) => {
    try {
        const productos = await Producto.find();
        res.json(productos);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Crear un nuevo producto
router.post('/', async (req, res) => {
    const producto = new Producto({
        ID_Serial: req.body.ID_Serial,
        Nombre: req.body.Nombre,
        Categoría: req.body.Categoría,
        Imagen: req.body.Imagen,
        Modelo: req.body.Modelo,
        Serie: req.body.Serie,
        Marca: req.body.Marca,
        Fabricante: req.body.Fabricante
    });

    try {
        const nuevoProducto = await producto.save();
        res.status(201).json(nuevoProducto);
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

// Actualizar un producto
router.put('/:id', async (req, res) => {
    try {
        const producto = await Producto.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        if (!producto) return res.status(404).json({ message: 'Producto no encontrado' });
        res.json(producto);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Eliminar un producto
router.delete('/:id', async (req, res) => {
    try {
        const producto = await Producto.findByIdAndDelete(req.params.id);
        if (!producto) return res.status(404).json({ message: 'Producto no encontrado' });
        res.json({ message: 'Producto eliminado' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
